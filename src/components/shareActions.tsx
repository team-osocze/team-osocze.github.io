import * as React from "react";
import { TwitterShareButton, FacebookShareButton, EmailShareButton, WhatsappShareButton } from 'react-share';
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import ShareIcon from '@material-ui/icons/Share';

const sharedUrl: string = "https://osocze.info"
const sharedText: string = "Czy wiesz, że Twoje osocze może uratować życie? Sprawdź, czy możesz zostać jego dawcą na osocze.info. Wypełnienie wstępnej ankiety zajmie Ci tylko 5 minut. Satysfakcja z uratowania drugiego człowieka będzie trwała całe życie :) Wejdź na:"
const sharedTextWithUrl: string = sharedText + " https://osocze.info"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        background: "lightgray",
        marginTop: "10px"
    },
    icon: {
        padding: 5
    },
    bottomText: {
        marginRight: 15
    }
});

const handleShare = () => {
    if (navigator.share) {
        navigator.share({
            title: sharedText,
            url: sharedUrl
        }).then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
        // fallback
        console.log('fallback to dialog')
    }
};

export function ShareActions() {
    const classes = useStyles();

    return (<>
        <FacebookShareButton url={sharedUrl} quote={sharedTextWithUrl}>
            <FacebookIcon className={classes.icon} color="primary" />
        </FacebookShareButton>
        <TwitterShareButton url={sharedUrl} title={sharedText}>
            <TwitterIcon className={classes.icon} color="primary" />
        </TwitterShareButton>
        <EmailShareButton url={sharedUrl} subject="Osocze ozdrowieńców COVID-19" body={sharedText}>
            <EmailIcon className={classes.icon} color="primary" />
        </EmailShareButton>
        <WhatsappShareButton url={sharedUrl} title={sharedText}>
            <WhatsappIcon className={classes.icon} color="primary" />
        </WhatsappShareButton>
        {navigator.share && <ShareIcon className={classes.icon} color="primary" onClick={handleShare} />}
    </>
    )
}