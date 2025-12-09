import { Alert } from "react-native";

export const validateEmail = (email: string): boolean => {
  // Simple regex for basic email validation
  const emailRegex = /^.+@.+\..+$/;
  if (!emailRegex.test(email.trim())) {
    Alert.alert(
      "Invalid Email",
      'Please enter a valid email address that includes "@" and ".".'
    );
    return false;
  }
  return true;
};

export const validatePassword = (password: string): boolean => {
  const trimmed = password.trim();

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!passwordRegex.test(trimmed)) {
    Alert.alert(
      "Invalid Password",
      `Password must:
- Be at least 6 characters
- Contain at least ONE uppercase letter
- Contain at least ONE lowercase letter
- Contain at least ONE number
- Not contain Arabic letters
- Not contain spaces`
    );
    return false;
  }

  return true;
};
export const validateName = (name: string, fieldName: string): boolean => {
  const trimmed = name.trim();
  const nameRegex =
    /^(?![_*$!])[A-Za-z\u0600-\u06FF]{2,}(?:[ -]?[A-Za-z\u0600-\u06FF]{2,})*$/;

  if (!nameRegex.test(trimmed)) {
    Alert.alert(
      "Invalid Name",
      `${fieldName} must:
- Start with at least 2 letters
- No special characters at start`
    );
    return false;
  }

  return true;
};

export const validateLogInInput = (
  email: string,
  password: string
): boolean => {
  if (!validateEmail(email) || !validatePassword(password)) {
    return false;
  }

  return true;
};

export const validateSignUpInput = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): boolean => {
  if (
    !validateName(firstName, "First Name") ||
    !validateName(lastName, "Last Name") ||
    !validateEmail(email) ||
    !validatePassword(password)
  ) {
    return false;
  }

  return true;
};

export const validatePasscode = (passcode: string): boolean => {
  const code = passcode.trim();
  // Must be exactly 6 characters, uppercase letters A-Z and digits 0-9 only
  const re = /^[A-Z0-9]{6}$/;
  if (!re.test(code)) {
    Alert.alert(
      "Invalid Passcode",
      "Passcode must be exactly 6 characters and contain only uppercase letters (A-Z) and numbers."
    );
    return false;
  }
  return true;
};
