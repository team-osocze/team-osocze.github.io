import { format } from "react-string-format";

export function getMailContent(
  resultWarningAndErrorMessages: string[],
  resultSuccessMessages: string[]
) {
  const applicationEmailBody: string = `Zgłoszenie Ozdrowieńca do RCKiK w Krakowie, \n
Imię i Nazwisko: \n
Numer telefonu: \n
Kontakt z COVID-19: {0} \n
Dodatkowe uwagi: {1} \n`;

  return format(
    applicationEmailBody,
    resultSuccessMessages.join(" \n"),
    resultWarningAndErrorMessages.join(" \n")
  );
}
