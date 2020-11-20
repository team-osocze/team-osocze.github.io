import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';

interface IInfoDialogProps {
    infoText: String;
}

const useStyles = makeStyles({
    dialogLink: {
        display: "inline",
        marginLeft: "8px"
      },
});

export default function InfoDialog({ infoText }: IInfoDialogProps){
    const [open, setOpen] = React.useState(false);  
    const classes = useStyles();  
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <>
          <Link onClick={handleClickOpen}>
              <Typography variant="subtitle2" className={classes.dialogLink}>Dowiedz się więcej.</Typography>           
          </Link >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >           
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {infoText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>             
              <Button onClick={handleClose} color="primary" autoFocus>
                Rozumiem
              </Button>
            </DialogActions>
          </Dialog>
        </>
    );
}

