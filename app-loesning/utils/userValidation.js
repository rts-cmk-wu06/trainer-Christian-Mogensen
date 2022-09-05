import * as yup from "yup";
export const schema = yup.object().shape({
  email: yup
    .string()
    .email("*Emailen skal være gyldig.")
    .required("*Skriv din email"),
  confirmemail: yup
    .string()
    .email("*Er emailen den samme?")
    .required("*Bekræft email")
    .oneOf([yup.ref("email")], "*Emailen skal være den samme"),
  password: yup
    .string()
    .required("*Skriv dit kodeord")
    .min(4, "*Skal være minimum 4 tegn")
    .max(10, "*Adgangskoden må ikke overskride 10 tegn!"),
});
