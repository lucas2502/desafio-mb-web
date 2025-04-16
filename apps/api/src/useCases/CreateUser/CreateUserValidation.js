export const commonFieldsSchema = {
  email: [(val) => !!val, "Email is required"],
  type: [(val) => ["person", "company"].includes(val), "Invalid user type"],
  password: [(val) => !!val, "Password is required"],
};

export const personSchema = {
  name: [(val) => !!val, "Name is required"],
  cpf: [(val) => !!val, "CPF is required"],
  dateOfbirth: [(val) => !!val, "Date of birth is required"],
  phone: [(val) => !!val, "Phone is required"],
};

export const companySchema = {
  name: [(val) => !!val, "Name is required"],
  cnpj: [(val) => !!val, "CNPJ is required"],
  openingDate: [(val) => !!val, "Opening date is required"],
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
  const { email, type, password, person, company } = data;

  const commonValidation = validateBySchema({ email, type, password }, commonFieldsSchema);

  const specificSchema = type === "person" ? personSchema : companySchema;
  const specificData = type === "person" ? person : company;
  const specificValidation = validateBySchema(specificData, specificSchema);

  return {
    hasError: commonValidation.hasError || specificValidation.hasError,
    details: [...commonValidation.details, ...specificValidation.details],
  };
}
