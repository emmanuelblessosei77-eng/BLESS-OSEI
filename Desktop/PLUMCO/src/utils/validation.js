export const getErrorMessage = (field, type) => {
  const messages = {
    email: {
      required: "Email is required",
      invalid: "Please enter a valid email address",
    },
    phone: {
      required: "Phone number is required",
      invalid: "Please enter a valid phone number",
    },
    name: {
      required: "Name is required",
      invalid: "Name must be at least 2 characters",
    },
    message: {
      required: "Message is required",
      invalid: "Message must be at least 10 characters",
    },
  };

  return messages[field]?.[type] || "Invalid input";
};

export const validation = {
  // other validators...
  getErrorMessage,
};

export default validation;
