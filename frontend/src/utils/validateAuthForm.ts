interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
  surname?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    surname?: string;
  };
}

export const validateAuthForm = (data: AuthFormData): ValidationResult => {
  const errors: ValidationResult["errors"] = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =  /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const latinRegex = /^[A-Za-z]+$/;
  const capitalizedRegex = /^[A-Z][a-z]+$/;

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(data.password)) {
    errors.password = "Password must be at least 8 characters, with 1 capital letter and 1 digit";
  }

  // Confirm password (Register only)
  if (data.confirmPassword !== undefined) {
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords should match";
    }
  }

  // Name validation
  if (data.name !== undefined) {
    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (!latinRegex.test(data.name)) {
      errors.name = "Only Latin letters are allowed";
    } else if (!capitalizedRegex.test(data.name)) {
      errors.name = "Use Title case (e.g., John)";
    }
  }

  // Surname validation
  if (data.surname !== undefined) {
    if (!data.surname.trim()) {
      errors.surname = "Surname is required";
    } else if (!latinRegex.test(data.surname)) {
      errors.surname = "Only Latin letters are allowed";
    } else if (!capitalizedRegex.test(data.surname)) {
      errors.surname = "Use Title case (e.g., John)";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
