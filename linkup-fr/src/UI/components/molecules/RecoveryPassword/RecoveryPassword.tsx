import { ChangeEvent, useState, useEffect, Suspense } from "react"; // Import necessary hooks and components from React
import { TextInput } from "../../atoms"; // Import custom TextInput component
import { IFormRecovery } from "@/UI/interfaces/IFormRecovery"; // Import interface for recovery form
import { MainButton } from "../../atoms"; // Import custom MainButton component
import { useSearchParams } from "next/navigation"; // Import hook to access search parameters in URL
import { inputAlert } from "../Alert/Alert"; // Import function to show alerts
import { decryptEmailService } from "@/services/encryptEmailService"; // Import service to decrypt email
import { IPassword } from "@/UI/interfaces/IPasswordInterface"; // Import interface for password form
import { patchResetPasswordUser } from "@/services/userService"; // Import service to reset user password
import useNavigate from "@/utilities/NavigateTo"; // Import custom navigation utility

function RecoveryPasswordFormContent() {
  // Get search parameters from the URL
  const searchParams = useSearchParams();
  const key = searchParams.get("key"); // Retrieve the recovery key
  const encryptedEmail = searchParams.get("encryptedEmail"); // Retrieve the encrypted email
  const iv = searchParams.get("iv"); // Retrieve the initialization vector

  // State hooks to manage component state
  const [showInputs, setShowInputs] = useState<boolean>(false); // Toggle for showing password input
  const [emailGet, setEmailGet] = useState<string>(""); // State to store decrypted email
  const [formRecoveryCode, setFormRecoveryCode] = useState<IFormRecovery>({ code: "" }); // State for recovery form code
  const [formPasswordCode, setFormPasswordCode] = useState<IPassword>({ password: "" }); // State for password form
  const navigate = useNavigate(); // Custom hook for navigation

  // Effect to check if all necessary parameters are present
  useEffect(() => {
    if (!key || !encryptedEmail || !iv) return; // If parameters are missing, do nothing
  }, [key, encryptedEmail, iv]);

  // Handle changes in the recovery code input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure input name and value
    setFormRecoveryCode({
      ...formRecoveryCode,
      [name]: value, // Update state with the new value
    });
  };

  // Handle changes in the password input
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure input name and value
    setFormPasswordCode({
      ...formPasswordCode,
      [name]: value, // Update state with the new value
    });
  };

  // Handle the click event to verify the recovery code
  const handleClick = async () => {
    const { code } = formRecoveryCode; // Extract code from state
    if (code !== key) {
      inputAlert("Code Incorrect", "error"); // Show error alert for incorrect code
      return; // Exit the function
    }
    inputAlert("Code correct", "success"); // Show success alert for correct code
    setShowInputs(true); // Show password inputs

    // Decrypt the email using the service
    const emailServiceDecrypt = await decryptEmailService(encryptedEmail!, iv!);
    if (emailServiceDecrypt && "message" in emailServiceDecrypt) return; // Exit if decryption fails
    setEmailGet(emailServiceDecrypt.email); // Store the decrypted email
  };

  // Handle the click event to change the password
  const handleClickChangePassword = async () => {
    const userUpdated = await patchResetPasswordUser(
      emailGet, // Pass the decrypted email
      formPasswordCode.password, // New password
      formPasswordCode.password // Confirm new password
    );
    if (userUpdated.message === "Password successfully updated.") {
      inputAlert("Password updated", "success"); // Show success alert
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <form>
      {showInputs ? ( // Conditional rendering based on showInputs state
        <div className="input-code">
          <TextInput
            label="Enter new password" // Label for password input
            name="password" // Name for input identification
            onChange={handleChangePassword} // Handler for input changes
            required // Mark input as required
            type="password" // Input type for password
          />
          <MainButton text="confirm" onClick={handleClickChangePassword} /> // Button to confirm password change
        </div>
      ) : ( // If showInputs is false
        <>
          <TextInput label="Code" name="code" onChange={handleChange} required type="text" /> // Input for recovery code
          <MainButton text="confirm" onClick={handleClick} /> // Button to confirm recovery code
        </>
      )}
    </form>
  );
}

// Export the main component wrapped in Suspense for lazy loading
export default function RecoveryPasswordForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}> // Fallback content while loading
      <RecoveryPasswordFormContent /> // Main content of the form
    </Suspense>
  );
}
