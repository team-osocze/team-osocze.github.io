import { CircularProgress, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import React from "react";

interface CircularProgressWithLabelProps{
    value: number;
}
export default function CircularProgressWithLabel(props: CircularProgressWithLabelProps) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="static" {...props} />
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
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }