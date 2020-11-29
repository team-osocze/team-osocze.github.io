import React from "react";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from "@material-ui/icons/Drafts";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getMailContent } from "./mailing";
const applicationEmail: string = "osocze@rckik.pl";

interface IResultProps {
  subject: string;
  resultWarningAndErrorMessages: string[];
  resultSuccessMessages: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emailLink: {
      display: "inline",
    },
    buttonLink: {
      marginBottom: "5px",
    },
    hrefLink: {
      "text-decoration": "none",
    },
  })
);

export default function Mailto({
  subject,
  resultWarningAndErrorMessages,
  resultSuccessMessages,
}: IResultProps) {
  const classes = useStyles();

  const applicationEmailText = getMailContent(
    resultWarningAndErrorMessages,
    resultSuccessMessages
  );

  const params = `?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(applicationEmailText)}`;

  return (
    <>
      <p>
        <Button
          variant="outlined"
          className={classes.buttonLink}
          color="primary"
          startIcon={<DraftsIcon />}
        >
          <a
            className={classes.hrefLink}
            href={`mailto:${applicationEmail}${params}`}
            color="primary"
          >
            <Typography
              variant="h6"
              gutterBottom
              className={classes.emailLink}
              color="primary"
            >
              {" "}
              Zgłoś się przez e-mail{" "}
            </Typography>
          </a>
        </Button>
      </p>
    </>
  );
}
