"use client";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import TextInput from "../../atoms/TextInput/TextInput";
import MainButton from "../../atoms/MainButton/MainButton";
import CustomLink from "../../atoms/CustomLink/CustomLink";
import PasswordInput from "../../atoms/PasswordInput/PasswordInput";
import { ChangeEvent, useEffect, useState } from "react";
import { ICompanyRegister } from "@/UI/interfaces/Forms";
import { CircularLoader } from "../../atoms";
import { useLanguage } from "@/global-states/language-mode";
import { useDarkMode } from "@/global-states/dark-mode";
import CustomIconButton from "../../atoms/IconButton/IconButton";
import { inputAlert } from "../Alert/Alert";
import { saveLocalStorage } from "@/utilities/LocalStorage";
import { signIn, useSession } from "next-auth/react";
import useNavigate from "@/utilities/NavigateTo";
import { authRegisterService } from "@/services";
import { registerProviderService } from "@/services/authService";
import { useAuthUser } from "@/global-states/authUser";
import { emailService } from "@/services/emailService";
import {
  generateTextEmailCorrect,
  generateTextEmailIncorrect,
} from "@/utilities/EmailText";
import verifyData from "@/utilities/verifyData";
import SelectOptions from "../../atoms/Select/Select";
import { ISector } from "@/UI/interfaces/ISectorInterface";
import { obtainIdSectors } from "@/utilities/obtainIdData";
import { getUserServiceByEmail } from "@/services/userService";
import { getSectorService } from "@/services/sectorService";
import { error } from "console";

const RegisterForm: React.FC = () => {
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const Language = useLanguage((state) => state.language); //true español
  const DarkMode = useDarkMode((state) => state.DarkMode);
  const { data: session, status } = useSession();
  const navigate = useNavigate();
  const { setAuthUser } = useAuthUser();
  const [sectors, setSectors] = useState<ISector[]>([]);

  const CompanyInitialState: ICompanyRegister = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: 0,
    sector: "",
  };
  const [companyRegister, setCompanyRegister] =
    useState<ICompanyRegister>(CompanyInitialState);

  const hangleChangeFormData = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setCompanyRegister({
      ...companyRegister,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Register a new company credentials normal
    setLoading(true);
    const { name, email, password, phone, sector } = companyRegister;
    const dataVerify = verifyData(name, email, password, phone, sector);
    if (!dataVerify) {
      setLoading(false);
      inputAlert("Is required all params", "error");
      return;
    }
    const obtainIdData = obtainIdSectors(sectors, sector);
    if (!obtainIdData) {
      setLoading(false);
      inputAlert("Invalid sector selection", "error");
      return;
    }
    const responseGetUser = await getUserServiceByEmail(email);
    if (!responseGetUser && "message" in responseGetUser) {
      setLoading(false);
      inputAlert("Email already exists", "error");
      await emailService({
        email,
        emailLinkUp: "josesiprozmaster@gmail.com",
        subject: "Email is already",
        text: generateTextEmailIncorrect(
          name,
          "josesiprozmaster@gmail.com",
          "For security reasons, the password is not sent..."
        ),
      });
      return;
    }
    const userRegister = await authRegisterService({
      name,
      email,
      password,
      phone: phone.toString(),
      sector: obtainIdData,
    });
    if (!userRegister || "message" in userRegister) {
      setLoading(false);
      inputAlert("Error to register. Users exists", "error");
      return;
    }
    inputAlert("Registration successful. Check your email", "success");
    const responseEmail = await emailService({
      email,
      emailLinkUp: "josesiprozmaster@gmail.com",
      subject: "Registration confirmation",
      text: generateTextEmailCorrect(name, email, ""),
    });
    if(responseEmail ===  "Error with the fetchApi"){
        setLoading(false);
        inputAlert("The email is not registered in Gmail. Error to send email", "error");
        return;
    }
  };

  const sigInProvider = (nameProvider: string, valueProvider: string) => {
    saveLocalStorage("provider", valueProvider);
    signIn(nameProvider);
  };

  useEffect(() => {
    const getSectors = async () => {
      const response = await getSectorService();
      if (!response || "message" in response) return;
      const sectors = response.data;
      setSectors(sectors);
    };
    getSectors();
  }, []);

  useEffect(() => {
    if (companyRegister.password !== companyRegister.confirmPassword) {
      setPasswordInputError(true);
    } else {
      setPasswordInputError(false);
    }
  }, [companyRegister]);

  useEffect(() => {
    if (status === "authenticated") {
      // Register user by provider
      const registerUserProvider = async () => {
        const { user } = session;
        if (!user) return { message: "Errow with the session" };
        const name = user.name!;
        const email = user.email!;
        const image = user.image!;
        const data = await registerProviderService({ name, email, image });
        if (data && "message" in data) {
          inputAlert("Error to register. User Exists", "error");
          const textEmailGenerate = generateTextEmailIncorrect(
            "Access problem - RiwiLinkUp",
            name,
            email
          );
          const mail = await emailService({
            email,
            emailLinkUp: "riwilinkup@gmail.com",
            subject: "Access problem - RiwiLinkUp",
            text: textEmailGenerate,
          });
          console.log(mail);
          return;
        }
        const token = data.token!;
        const roleId = data.roleId!;
        const password = data.password!;

        const provider: string = localStorage.getItem("provider")!;
        saveLocalStorage("token", token);
        saveLocalStorage("roleId", roleId);

        const textEmailGenerate = generateTextEmailCorrect(
          "Successful register to RiwiLinkUp",
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
        if (!mail) {
          inputAlert("Error to send email", "error");
          return;
        }
        setAuthUser({ name, email, token, role: roleId, provider });
        inputAlert("Registration successful. Check your email", "success");
        navigate("/dashboard");
      };
      registerUserProvider();
    }
  }, [status]);
  return (
    <Box
      component="form"
      onSubmit={() => {
        console.log("ok");
      }}
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
        {Language ? "Registrate" : "Get Started"}
      </Typography>
      <TextInput
        name="name"
        label={Language ? "Nombre de la compañía" : "Company Name"}
        required
        onChange={hangleChangeFormData}
      />
      <TextInput
        name="email"
        type="email"
        label={Language ? "Correo Electrónico" : "Email"}
        required
        onChange={hangleChangeFormData}
      />
      {passwordInputError ? (
        <PasswordInput
          name="password"
          label={Language ? "Contraseña" : "Password"}
          type="password"
          required
          error
          helperText={
            Language
              ? "Las contraseñas no coinciden"
              : "Passwords doesn't match"
          }
          onChange={hangleChangeFormData}
        ></PasswordInput>
      ) : (
        <PasswordInput
          name="password"
          label={Language ? "Contraseña" : "Password"}
          type="password"
          required
          onChange={hangleChangeFormData}
        ></PasswordInput>
      )}
      {passwordInputError ? (
        <PasswordInput
          name="confirmPassword"
          label={Language ? "Confirmar contraseña" : "Confirm password"}
          type="password"
          required
          error
          helperText={
            Language
              ? "Las contraseñas no coinciden"
              : "Passwords doesn't match"
          }
          onChange={hangleChangeFormData}
        ></PasswordInput>
      ) : (
        <PasswordInput
          name="confirmPassword"
          label={Language ? "Confirmar contraseña" : "Confirm password"}
          type="password"
          required
          onChange={hangleChangeFormData}
        ></PasswordInput>
      )}
      <TextInput
        name="phone"
        label={Language ? "Número de teléfono" : "Phone Number"}
        onChange={hangleChangeFormData}
      />
      <SelectOptions
        label={Language ? "Sectores" : "Sectors"}
        values={
          sectors.length > 0
            ? sectors.map(
                (sector) => sector.name // Aquí accedes al nombre
              )
            : ["There are no sectors..."]
        }
        onChange={(e: SelectChangeEvent) => hangleChangeFormData(e)}
        value={companyRegister.sector}
        name={"sector"}
      ></SelectOptions>
      <MainButton
        text={Language ? "Registrarme" : "Register"}
        onClick={handleSubmit}
      />
      <Box component={"span"}>
        <Typography
          variant="body1"
          sx={{
            color: "var(--secondary-color)",
            fontFamily: "var(--main-font)",
          }}
        >
          {Language ? "Ya tienes una cuenta?" : "Already have an account?"}{" "}
          <CustomLink
            text={Language ? "Iniciar Sesión" : "Log In"}
            href="/login"
          ></CustomLink>
        </Typography>
      </Box>
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
    </Box>
  );
};

export default RegisterForm;
