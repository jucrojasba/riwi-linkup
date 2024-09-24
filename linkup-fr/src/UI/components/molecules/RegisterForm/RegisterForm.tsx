"use client"; // Indicates that this component should be rendered on the client side

import { Box, SelectChangeEvent, Typography } from "@mui/material"; // Import MUI components
import TextInput from "../../atoms/TextInput/TextInput"; // Import custom TextInput component
import MainButton from "../../atoms/MainButton/MainButton"; // Import custom MainButton component
import CustomLink from "../../atoms/CustomLink/CustomLink"; // Import custom link component
import PasswordInput from "../../atoms/PasswordInput/PasswordInput"; // Import custom PasswordInput component
import { ChangeEvent, useEffect, useState } from "react"; // Import React hooks
import { ICompanyRegister } from "@/UI/interfaces/Forms"; // Import company registration interface
import { CircularLoader } from "../../atoms"; // Import loading spinner component
import { useLanguage } from "@/global-states/language-mode"; // Custom hook for language state
import { useDarkMode } from "@/global-states/dark-mode"; // Custom hook for dark mode state
import CustomIconButton from "../../atoms/IconButton/IconButton"; // Import custom icon button
import { inputAlert } from "../Alert/Alert"; // Function to show alerts
import { saveLocalStorage } from "@/utilities/LocalStorage"; // Utility to manage local storage
import { signIn, useSession } from "next-auth/react"; // Import sign-in and session management functions
import useNavigate from "@/utilities/NavigateTo"; // Custom hook for navigation
import { authRegisterService } from "@/services"; // Import registration service
import { registerProviderService } from "@/services/authService"; // Import provider registration service
import { useAuthUser } from "@/global-states/authUser"; // Hook for auth user state
import { emailService } from "@/services/emailService"; // Service for sending emails
import {
  generateTextEmailCorrect,
  generateTextEmailIncorrect,
} from "@/utilities/EmailText"; // Functions to generate email texts
import verifyData from "@/utilities/verifyData"; // Utility to verify form data
import SelectOptions from "../../atoms/Select/Select"; // Import custom Select component
import { ISector } from "@/UI/interfaces/ISectorInterface"; // Interface for sector data
import { obtainIdSectors } from "@/utilities/obtainIdData"; // Utility to obtain sector IDs
import { getUserServiceByEmail } from "@/services/userService"; // Service to get user by email
import { getSectorService } from "@/services/sectorService"; // Service to get sector data

const RegisterForm: React.FC = () => {
  // Component state management
  const [passwordInputError, setPasswordInputError] = useState(false); // Error state for password match
  const [loading, setLoading] = useState<boolean>(false); // Loading state for async operations
  const Language = useLanguage((state) => state.language); // Get current language state
  const DarkMode = useDarkMode((state) => state.DarkMode); // Get current dark mode state
  const { data: session, status } = useSession(); // Manage user session
  const navigate = useNavigate(); // Custom navigation hook
  const { setAuthUser } = useAuthUser(); // Set authenticated user state
  const [sectors, setSectors] = useState<ISector[]>([]); // State for available sectors
  const [openSiginProvider, setOpneSiginProvider] = useState<boolean>(false); // State for sign-in provider

  // Initial state for company registration
  const CompanyInitialState: ICompanyRegister = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: 0,
    sector: "",
  };

  const [companyRegister, setCompanyRegister] = useState<ICompanyRegister>(CompanyInitialState); // State for company registration data

  // Handle changes in form inputs
  const hangleChangeFormData = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target; // Destructure input name and value
    setCompanyRegister({
      ...companyRegister,
      [name]: value, // Update state with the new value
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true); // Set loading state
    const { name, email, password, phone, sector } = companyRegister; // Destructure form data
    const dataVerify = verifyData(name, email, password, phone, sector); // Verify the input data

    // Check if all fields are filled
    if (!dataVerify) {
      setLoading(false);
      inputAlert("Is required all params", "error"); // Alert if required fields are missing
      return;
    }

    const obtainIdData = obtainIdSectors(sectors, sector); // Get sector ID based on the selected sector
    if (!obtainIdData) {
      setLoading(false);
      inputAlert("Invalid sector selection", "error"); // Alert for invalid sector
      return;
    }

    const responseGetUser = await getUserServiceByEmail(email); // Check if the email is already registered
    if (!responseGetUser && "message" in responseGetUser) {
      setLoading(false);
      inputAlert("Email already exists", "error"); // Alert if email already exists
      await emailService({
        email,
        emailLinkUp: "josesiprozmaster@gmail.com",
        subject: "Email is already",
        text: generateTextEmailIncorrect(
          name,
          "josesiprozmaster@gmail.com",
          "For security reasons, the password is not sent..."
        ),
      }); // Send email notification
      return;
    }

    const userRegister = await authRegisterService({
      name,
      email,
      password,
      phone: phone.toString(),
      sector: obtainIdData,
    }); // Register the user

    // Handle registration errors
    if (!userRegister || "message" in userRegister) {
      setLoading(false);
      inputAlert("Error to register. Users exists", "error"); // Alert for registration error
      return;
    }

    inputAlert("Registration successful. Check your email", "success"); // Alert for successful registration
    const responseEmail = await emailService({
      email,
      emailLinkUp: "josesiprozmaster@gmail.com",
      subject: "Registration confirmation",
      text: generateTextEmailCorrect(name, email, ""),
    }); // Send confirmation email

    // Handle email sending errors
    if (responseEmail === "Error with the fetchApi") {
      setLoading(false);
      inputAlert("The email is not registered in Gmail. Error to send email", "error");
      return;
    } else {
      setLoading(false);
      inputAlert("The email was send correctly", "success");
      navigate("/login"); // Redirect to login page
    }
  };

  // Handle provider sign-in
  const sigInProvider = (nameProvider: string, valueProvider: string) => {
    saveLocalStorage("provider", valueProvider); // Save provider type in local storage
    signIn(nameProvider); // Trigger sign-in with provider
    setOpneSiginProvider(true); // Set flag to indicate provider sign-in
  };

  // Fetch available sectors on component mount
  useEffect(() => {
    const getSectors = async () => {
      const response = await getSectorService(); // Fetch sectors from the service
      if (!response || "message" in response) return; // Handle errors
      const sectors = response.data; // Get sector data
      setSectors(sectors); // Update sectors state
    };
    getSectors(); // Call the function
  }, []);

  // Check for password matching
  useEffect(() => {
    if (companyRegister.password !== companyRegister.confirmPassword) {
      setPasswordInputError(true); // Set error if passwords do not match
    } else {
      setPasswordInputError(false); // Clear error if they match
    }
  }, [companyRegister]);

  // Handle user registration via provider
  useEffect(() => {
    if (status === "authenticated" && openSiginProvider) { // Check if user is authenticated and provider sign-in is open
      const registerUserProvider = async () => {
        const { user } = session; // Get user data from session
        if (!user) return { message: "Errow with the session" }; // Check for valid user data
        const name = user.name!; // Extract user name
        const email = user.email!; // Extract user email
        const image = user.image!; // Extract user image
        const userGet = await getUserServiceByEmail(email); // Check if user already exists

        // Handle user existence during registration
        if ("message" in userGet) {
          const data = await registerProviderService(name, email, image); // Register user with provider details
          if ("message" in data) {
            setLoading(false);
            inputAlert(data.message!, "error"); // Alert for registration error
            return;
          }
          const token = data.token!; // Extract token
          const roleId = data.roleId!; // Extract role ID
          const password = data.password!; // Extract password
          const provider: string = localStorage.getItem("provider")!; // Get provider from local storage

          // Generate and send welcome email
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

          // Handle email sending errors
          if (mail === "Error to send message email") {
            inputAlert(mail, "error");
            return;
          }

          // Update auth user state and navigate
          setAuthUser({ name, email, token, role: roleId, provider });
          inputAlert("Registration successful. Check your email", "success");
          saveLocalStorage("load", "true"); // Indicate that loading is complete
          navigate("/login"); // Redirect to login page
        } else {
          inputAlert("Error to register. User Exists", "error"); // Alert if user already exists
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
          }); // Send notification email for access problem
        }
      };
      registerUserProvider(); // Call the registration function
      setOpneSiginProvider(false); // Reset provider sign-in state
    }
  }, [status, openSiginProvider]);

  // Render the registration form
  return (
    <Box
      component="form"
      onSubmit={() => {
        console.log("ok"); // Placeholder for form submission logic
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--padding-big)",
        alignItems: "center",
        width: "fit-content",
      }}
    >
      {loading ? <CircularLoader flag={loading} /> : null} {/* Show loading spinner */}
      <Typography
        variant="h2"
        sx={{
          color: "var(--main-color)",
          fontFamily: "var(--main-font)",
          fontSize: "2rem",
          fontWeight: "500",
        }}
      >
        {Language ? "Registrate" : "Get Started"} {/* Display title based on language */}
      </Typography>

      {/* Company Name Input */}
      <TextInput
        name="name"
        label={Language ? "Nombre de la compañía" : "Company Name"}
        required
        onChange={hangleChangeFormData} // Handle changes in the input
      />
      
      {/* Email Input */}
      <TextInput
        name="email"
        type="email"
        label={Language ? "Correo Electrónico" : "Email"}
        required
        onChange={hangleChangeFormData} // Handle changes in the input
      />
      
      {/* Password Input */}
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
        />
      ) : (
        <PasswordInput
          name="password"
          label={Language ? "Contraseña" : "Password"}
          type="password"
          required
          onChange={hangleChangeFormData}
        />
      )}

      {/* Confirm Password Input */}
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
        />
      ) : (
        <PasswordInput
          name="confirmPassword"
          label={Language ? "Confirmar contraseña" : "Confirm password"}
          type="password"
          required
          onChange={hangleChangeFormData}
        />
      )}

      {/* Phone Number Input */}
      <TextInput
        name="phone"
        label={Language ? "Número de teléfono" : "Phone Number"}
        onChange={hangleChangeFormData} // Handle changes in the input
      />

      {/* Sector Selection */}
      <SelectOptions
        label={Language ? "Sectores" : "Sectors"}
        values={
          sectors.length > 0
            ? sectors.map(sector => sector.name) // Access sector names
            : ["There are no sectors..."] // Fallback if no sectors available
        }
        onChange={(e: SelectChangeEvent) => hangleChangeFormData(e)} // Handle sector selection changes
        value={companyRegister.sector} // Current selected sector
        name={"sector"} // Name for identification
      />

      {/* Registration Button */}
      <MainButton
        text={Language ? "Registrarme" : "Register"}
        onClick={handleSubmit} // Handle form submission
      />

      {/* Link to Login Page */}
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
            href="/login" // Link to the login page
          />
        </Typography>
      </Box>

      {/* Social Media Sign-In Buttons */}
      <Box sx={{ display: "flex", gap: "var(--padding-big)" }}>
        <CustomIconButton
          icon="google"
          iconColor="#db4437"
          backgroundColor="var(--gray-color)"
          onClick={() => sigInProvider("google", "google")} // Handle Google sign-in
        />
        <CustomIconButton
          icon="github"
          iconColor="black"
          backgroundColor="var(--gray-color)"
          onClick={() => sigInProvider("github", "github")} // Handle GitHub sign-in
        />
      </Box>
    </Box>
  );
};

export default RegisterForm; // Export the component
