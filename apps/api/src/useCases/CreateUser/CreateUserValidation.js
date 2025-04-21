export const fieldsSchema = {
  email: [(val) => !!val, "Email is required"],
  type: [(val) => ["person", "company"].includes(val), "Invalid user type"],
  password: [(val) => !!val, "Password is required"],
  name: [(val) => !!val, "Name is required"],
  document: [(val) => !!val, "Document is required"],
  date: [(val) => !!val, "Date is required"],
  phone: [(val) => !!val, "Phone is required"],
};




function validateBySchema(data, schema) {
  const details = Object.entries(schema).reduce((acc, [field, [validate, message]]) => {
    if (!validate(data?.[field])) {
      acc.push({ field, message });
    }
    return acc;
  }, []);

  return {
    hasError: details.length > 0,
    details,
  };
}



export function validateSchema(data) {
  const { email,
    type,
    password,
    name,
    document,
    date,
    phone } = data;

  const fieldsValidation = validateBySchema({
    email,
    type,
    password,
    name,
    document,
    date,
    phone
  }, fieldsSchema);


  return {
    hasError: fieldsValidation.hasError,
    details: [...fieldsValidation.details],
  };
}
