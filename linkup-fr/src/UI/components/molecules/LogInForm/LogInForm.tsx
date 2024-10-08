"use client";
import { Box, Typography } from "@mui/material";
import TextInput from "../../atoms/TextInput/TextInput";
import MainButton from "../../atoms/MainButton/MainButton";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import { useEffect, useState } from "react";
import { ICompanyLogin } from "@/UI/interfaces/Forms";
import { useDarkMode } from "@/global-states/dark-mode";
import { authLoginService, loginProviderService } from "@/services/authService";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircularLoader } from "../../atoms";
import { inputAlert } from "../Alert/Alert";
import { useAuthUser } from "@/global-states/authUser";
import useNavigate from "@/utilities/NavigateTo";
import "./loginFormStyles.css";
import { saveLocalStorage } from "@/utilities/LocalStorage";
import { useLanguage } from "@/global-states/language-mode";
import CustomIconButton from "../../atoms/IconButton/IconButton";
import {
  generateTextEmailCorrect,
  generateTextEmailIncorrect,
} from "@/utilities/EmailText";
import { emailService } from "@/services/emailService";

function LogInForm(): React.ReactNode {
  const [passwordInputError, setPasswordInputError] = useState(false); // This statte change if do bad request the server
  const Language = useLanguage((state) => state.language); //true español
  const DarkMode = useDarkMode((state) => state.DarkMode);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setAuthUser } = useAuthUser();
  const navigate = useNavigate();
  const load = localStorage.getItem("load");
  
  const CompanyInitialState = {
    email: "",
    password: "",
  };
  
  const [companyRegister, setCompanyRegister] = useState<ICompanyLogin>(CompanyInitialState); // States
  // Management change on the inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyRegister((prevState: ICompanyLogin) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    // Logic for login with LinkUp
    setLoading(true);
    if(!companyRegister.email || !companyRegister.password){
      setLoading(false);
      inputAlert("Is required all params", "error");
      return;
    }
    const data = await authLoginService(companyRegister);
    if (!data || data && "message" in data) {
      setLoading(false);
      inputAlert(
        "Authentication error: The credentials provided are incorrect.",
        "error"
      );
      return;
    }
    const { name, email, token, roleId } = data.user;
    setAuthUser({ name, email, token, role: roleId }); // Save user on global state
    saveLocalStorage("token", token); //Save token on local storage
    setLoading(false);
    inputAlert("Login successful", "success");
    navigate("/dashboard");
  };

  useEffect(() => {
    if (status === "authenticated" && !load) {
      //Login with the Provider
      const loginUserProvider = async () => {
        const { user } = session;
        if (!user) return { message: "Error with tthe session" };
        const name = user.name!;
        const email = user.email!;
        const image = user.image!;
        const data = await loginProviderService(name, email, image);
        console.log(data);
        if (data === "Errro with the loginProvider" || typeof data === "string" || !data) {
          setLoading(false);
          inputAlert("Error to login. User not exists", "error");
          return;
        };
        const token = data.token!;
        const roleId = data.roleId!;
        const password = data.password!;
        const provider: string = localStorage.getItem("provider")!;
        saveLocalStorage("token", token);
        saveLocalStorage("roleId", roleId);
        setAuthUser({ name, email, token, role: roleId, provider });
        const textEmailGenerate = generateTextEmailCorrect(
          "Successful Login to RiwiLinkUp",
          name,
          email,
          password
        );
        const mail = await emailService({
          email,
          emailLinkUp: "riwilinkup@gmail.com",
          subject: "Welcome to RiwiLinkUp",
          text: textEmailGenerate,
        });
        inputAlert("login successful. Check your email", "success");
        navigate("/dashboard");
      };
      loginUserProvider();
    }
  }, [status]);

  const sigInProvider = (nameProvider: string, valueProvider: string) => {
    localStorage.removeItem("load"); // Deleted load
    saveLocalStorage("provider", valueProvider);
    signIn(nameProvider);
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-big)",
        alignItems: "center",
        width: "fit-content",
      }}
    >
      {loading ? <CircularLoader flag={loading} /> : null}
      <Typography
        variant="h2"
        sx={{
          color: "var(--main-color)",
          fontFamily: "var(--main-font)",
          fontSize: "2rem",
          fontWeight: "500",
        }}
      >
        {Language ? "Bienvenido" : "Welcome back"}
      </Typography>
      <TextInput
        name="email"
        type="email"
        label={Language ? "Correo Electrónico" : "Email"}
        required
        onChange={handleChange}
      />
      <PasswordInput
        name="password"
        label={Language ? "Contraseña" : "Password"}
        type="password"
        required
        onChange={handleChange}
      />
      {Language ? (
        <CustomLink text="Olvidaste tu contraseña?" href="/forgot-password" />
      ) : (
        <CustomLink text="Forgot Password?" href="/forgot-password" />
      )}

      <MainButton
        text={Language ? "Iniciar Sesión" : "Log In"}
        onClick={handleSubmit}
        className="button-login"
      />
      <h4 className={DarkMode ? "login-separator-dark" : "login-separator"}>
        <span>{Language ? "Inicia Sesión con:" : "Login with:"}</span>
      </h4>
      {DarkMode ? (
        <Box sx={{ display: "flex", gap: "var(--padding-big)" }}>
          <CustomIconButton
            icon="google"
            iconColor="#db4437"
            backgroundColor="var(--white-color)"
            onClick={() => sigInProvider("google", "google")}
          />
          <CustomIconButton
            icon="github"
            iconColor="black"
            backgroundColor="var(--white-color)"
            onClick={() => sigInProvider("github", "github")}
          />
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: "var(--padding-big)" }}>
          <CustomIconButton
            icon="google"
            iconColor="#db4437"
            backgroundColor="var(--gray-color)"
            onClick={() => sigInProvider("google", "google")}
          />
          <CustomIconButton
            icon="github"
            iconColor="black"
            backgroundColor="var(--gray-color)"
            onClick={() => sigInProvider("github", "github")}
          />
        </Box>
      )}

      <Box component={"span"}>
        {DarkMode ? (
          <Typography
            variant="body1"
            sx={{ color: "var(--white-color)", fontFamily: "var(--main-font)" }}
          >
            {Language ? "No tienes una cuenta? " : "Do not have an account? "}
            {Language ? (
              <CustomLink text="Registrate" href="/register" />
            ) : (
              <CustomLink text="Sign up" href="/register" />
            )}
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: "var(--secondary-color)",
              fontFamily: "var(--main-font)",
            }}
          >
            {Language ? "No tienes una cuenta? " : "Do not have an account? "}
            {Language ? (
              <CustomLink text="Registrate" href="/register" />
            ) : (
              <CustomLink text="Sign up" href="/register" />
            )}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default LogInForm;
