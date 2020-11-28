import Button from "@material-ui/core/Button/Button";
import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { getMailContent } from "./mailing";
import copy from "copy-to-clipboard";

export interface ICopyResultProps {
  resultWarningAndErrorMessages: string[];
  resultSuccessMessages: string[];
}

export default function CopyResult(props: ICopyResultProps) {
  function copyMailContentToClipboard() {
    const mailContent = getMailContent(
      props.resultWarningAndErrorMessages,
      props.resultSuccessMessages
    );

    copy(mailContent);
  }

  return (
    <Button
      color="inherit"
      size="small"
      startIcon={<FileCopyIcon />}
      onClick={() => copyMailContentToClipboard()}
    >
      KOPIUJ WYNIK TESTU
    </Button>
  );
}
