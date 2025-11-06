import { useState } from "react";
import {
  validateEmail,
  validateName,
  validatePasswordAll,
  validateConfirmPassword,
} from "@/utils/validate";

export const useSignupForm = () => {
  // 폼 입력 필드 상태 관리
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 폼 입력 필드 에러 메시지 상태 관리
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]); // 여러 에러 동시 표시
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 에러 초기화
    setUsernameError("");
    setNameError("");
    setPasswordErrors([]);
    setConfirmPasswordError("");

    // 이메일 검증
    const emailError = validateEmail(username);
    if (emailError) {
      setUsernameError(emailError);
    }

    // 이름 검증
    const nameValidationError = validateName(name);
    if (nameValidationError) {
      setNameError(nameValidationError);
    }

    // 비밀번호 종합 검증
    const pwErrors = validatePasswordAll(password);
    if (pwErrors.length > 0) {
      setPasswordErrors(pwErrors);
    }

    // 비밀번호 확인 검증 (비밀번호 유효 시에만 검증)
    if (pwErrors.length === 0) {
      const confirmPwError = validateConfirmPassword(password, confirmPassword);
      if (confirmPwError) {
        setConfirmPasswordError(confirmPwError);
      }
    }
  };

  return {
    username,
    name,
    password,
    confirmPassword,
    setUsername,
    setName,
    setPassword,
    setConfirmPassword,
    usernameError,
    nameError,
    passwordErrors,
    confirmPasswordError,
    handleSubmit,
  };
};
