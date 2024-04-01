export const validateEmail = (value: string) => {
  if (!value) {
    return 'Email is required';
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.)+[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return 'Email is not valid';
  }

  return undefined;
};

export const validateName = (value: string) => {
  if (!value) {
    return 'Name is required';
  }

  return undefined;
};

export const validateMessage = (value: string) => {
  if (!value) {
    return 'Message is required';
  }

  return undefined;
};

export const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }

  return undefined;
};
