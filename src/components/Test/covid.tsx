import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import IQuestionGroup from "./IQuestionGroup";

const useStyles = makeStyles((theme) => ({
  question: {
    marginBottom: "40px",
    display:"flex",
    flexDirection: "column",
    textAlign:"left"
  },
  anserwButtons: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width:"50%"
  },
}));

const CovidGroupDetails: React.FC = () => {
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
      <div className={classes.question}>
        <Typography>
          Czy chorowałaś/eś na Covid-19 lub przechodziłeś zakażenie wirusem
          SARS-Cov-2 bezobjawowo?
        </Typography>
        <div className={classes.anserwButtons}>
          <Button variant="outlined" color="primary">
            TAK
          </Button>
          <Button variant="contained" color="primary">
            NIE
          </Button>
        </div>
      </div>
      <div className={classes.question}>
        <Typography>
        Czy objawy jakie wystąpiły w związku z Covid-19 ustąpiły i czujesz się zdrowy?
        </Typography>
        <div className={classes.anserwButtons}>
          <Button variant="outlined" color="primary">
            TAK
          </Button>
          <Button variant="contained" color="primary">
            NIE
          </Button>
        </div>
      </div>
    </>
  );
};

export default class CovidGroup implements IQuestionGroup {
  public secondaryHeading = "Covid info";
  public details: JSX.Element = (<CovidGroupDetails />);
}
