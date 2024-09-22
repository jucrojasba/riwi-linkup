import { ChangeEvent, useState, useEffect, Suspense } from "react";
import { TextInput } from "../../atoms";
import { IFormRecovery } from "@/UI/interfaces/IFormRecovery";
import { MainButton } from "../../atoms";
import { useSearchParams } from "next/navigation";
import { inputAlert } from "../Alert/Alert";
import { decryptEmailService } from "@/services/encryptEmailService";
import { IPassword } from "@/UI/interfaces/IPasswordInterface";
import { patchResetPasswordUser } from "@/services/userService";
import useNavigate from "@/utilities/NavigateTo";

function RecoveryPasswordFormContent() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const encryptedEmail = searchParams.get("encryptedEmail");
  const iv = searchParams.get("iv");

  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [emailGet, setEmailGet] = useState<string>("");
  const [formRecoveryCode, setFormRecoveryCode] = useState<IFormRecovery>({ code: "" });
  const [formPasswordCode, setFormPasswordCode] = useState<IPassword>({ password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!key || !encryptedEmail || !iv) return;
  }, [key, encryptedEmail, iv]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormRecoveryCode({
      ...formRecoveryCode,
      [name]: value,
    });
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormPasswordCode({
      ...formPasswordCode,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const { code } = formRecoveryCode;
    if (code !== key) {
      inputAlert("Code Incorrect", "error");
      return;
    }
    inputAlert("Code correct", "success");
    setShowInputs(true);

    const emailServiceDecrypt = await decryptEmailService(encryptedEmail!, iv!);
    if (emailServiceDecrypt && "message" in emailServiceDecrypt) return;
    setEmailGet(emailServiceDecrypt.email);
  };

  const handleClickChangePassword = async () => {
    const userUpdated = await patchResetPasswordUser(
      emailGet,
      formPasswordCode.password,
      formPasswordCode.password
    );
    if (userUpdated.message === "Password successfully updated.") {
      inputAlert("Password updated", "success");
      navigate("/login");
    }
  };

  return (
    <form>
      {showInputs ? (
        <div className="input-code">
          <TextInput
            label="Enter new password"
            name="password"
            onChange={handleChangePassword}
            required
            type="password"
          />
          <MainButton text="confirm" onClick={handleClickChangePassword} />
        </div>
      ) : (
        <>
          <TextInput label="Code" name="code" onChange={handleChange} required type="text" />
          <MainButton text="confirm" onClick={handleClick} />
        </>
      )}
    </form>
  );
}

export default function RecoveryPasswordForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecoveryPasswordFormContent />
    </Suspense>
  );
}
