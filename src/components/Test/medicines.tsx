import {
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import IQuestionGroup from "./IQuestionGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  header: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));


const MedicinesGroupDetails: React.FC = ()=> {
  const classes = useStyles();
  // const [
  //   expandedGroup,
  //   setExpandedGroup,
  // ] = React.useState<QuestionGroup | null>(null);

  // const handleChange = (group: QuestionGroup) => (
  //   event: React.ChangeEvent<{}>,
  //   expanded: boolean
  // ) => {
  //   setExpandedGroup((previouslyExpandedGroup) =>
  //     previouslyExpandedGroup !== group ? group : null
  //   );
  // };

  return (
    <>
            <Typography></Typography>
    </>
  );
}


export default class Medicines implements IQuestionGroup{
  public secondaryHeading = "Leki";
  public details: JSX.Element = <MedicinesGroupDetails/>;
}
