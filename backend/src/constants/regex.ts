const emailRegEx: String[] = [
  "^[a-zA-Z0-9]+@student.ubc.ca$",
  "^[a-zA-Z0-9]+@alumni.ubc.ca$",
  "^[a-zA-Z0-9]+@alum.ubc.ca$",
];

const pwdRegEx: String[] = [];

const emailRe = new RegExp(emailRegEx.join("|"));
const pwdRe = new RegExp(pwdRegEx.join("|"));

export { emailRe, pwdRe };
