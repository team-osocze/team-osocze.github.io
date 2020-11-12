import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IQuestionGroup from "./IQuestionGroup";
import CovidGroup from "./covid";
import DiseasesGroup from "./diseases";
import MedicinesGroup from "./medicines";
import DoneIcon from "@material-ui/icons/Done";
import ReplayIcon from "@material-ui/icons/Replay";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    color: "green"
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
  groupDetails: {
    flexDirection: "column",
  },
  groupsList:{
    boxShadow: "2px",
    marginTop: "10px"
  }
}));

const groups: IQuestionGroup[] = [
  new CovidGroup(),
  new DiseasesGroup(),
  new MedicinesGroup(),
];

const Test: React.FC = () => {
  const classes = useStyles();
  const [
    expandedGroup,
    setExpandedGroup,
  ] = React.useState<IQuestionGroup | null>(null);

  function toggleGroup(group: IQuestionGroup) {
    setExpandedGroup((previouslyExpandedGroup) =>
      previouslyExpandedGroup !== group ? group : null
    );
  }

  function openNextGroup() {
    setExpandedGroup((previouslyExpandedGroup) => {
      if (previouslyExpandedGroup === null) {
        return groups[0];
      } else {
        const nextGroupIndex = groups.indexOf(previouslyExpandedGroup, 0) + 1;
        if (nextGroupIndex < groups.length) return groups[nextGroupIndex];
        else return null;
      }
    });
  }

  function restart() {
    setExpandedGroup(groups[0]);
  }

  return (
    <>
      <div className={classes.root}>
        <header className={classes.header}>
          <h1>Test</h1>
          <Button variant="contained" onClick={(e) => restart()}>
            <ReplayIcon />
            POWTÓRZ
          </Button>
        </header>
        <Alert severity="info">
          Informacje nie są zbierane ani przekazywane. Tylko Ty je widzisz i
          masz do nich dostęp.
        </Alert>
        <div className={classes.groupsList}>
          {groups.map((group, index) => (
            <Accordion
              expanded={expandedGroup === group}
              onChange={() => toggleGroup(group)}
              key={group.secondaryHeading}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={group.secondaryHeading + "-content"}
                id={group.secondaryHeading + "-header"}
              >
                <DoneIcon className={classes.heading}/>
                <Typography className={classes.secondaryHeading}>
                  {group.secondaryHeading}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.groupDetails}>
                {group.details}
                <div>
                  {index < groups.length - 1 ? (
                    <Button variant="contained" onClick={() => openNextGroup()}>
                      DALEJ
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={() => {}}>
                      REZULTAT
                    </Button>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
};

export default Test;
