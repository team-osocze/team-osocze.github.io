import { CircularProgress, createStyles, makeStyles, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import React from "react";

const useStyles = makeStyles((_) =>
  createStyles({
    progress:{
      fontSize: "0.7rem"
    }
  }),
);
interface CircularProgressWithLabelProps {
  answeredQuestions: number;
  allQuestions: number;
}
export default function CircularProgressWithLabel(
  props: CircularProgressWithLabelProps
) {
  const classes = useStyles();

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="static"
        value={100 * (props.answeredQuestions / props.allQuestions)}
        size={40}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
          className={classes.progress}
        >{`${props.answeredQuestions}/${props.allQuestions}`}</Typography>
      </Box>
    </Box>
  );
}
