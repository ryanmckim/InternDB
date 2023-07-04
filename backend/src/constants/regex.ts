const emailRegEx: String[] = [
  "^[a-zA-Z0-9]+@student.ubc.ca$",
  "^[a-zA-Z0-9]+@alumni.ubc.ca$",
  "^[a-zA-Z0-9]+@alum.ubc.ca$",
];

/*
  Must contain:
  At least 1 lowercase letter,
  At least 1 uppercase letter,
  At least 1 number,
  At least 1 special character(#?!@$%^&*-),
  At least 8 characters
*/
const pwdRegEx: String[] = [
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
];

const emailRe = new RegExp(emailRegEx.join("|"));
const pwdRe = new RegExp(pwdRegEx.join("|"));

export { emailRe, pwdRe };
