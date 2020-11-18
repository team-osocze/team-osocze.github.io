import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, SvgIcon, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link, LinkProps } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        drawerHeader: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0 0 10px"
        }
    }),
);

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    onClick: () => void;
}

function ListItemLink(props: ListItemLinkProps) {
    const { primary, to, icon } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
                <Link to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <li onClick={props.onClick}>
            <ListItem button component={renderLink}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

interface AppBarProps {
    showResultOption: boolean;
}

export default function ButtonAppBar({showResultOption}: AppBarProps) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawerOpen = () => {
        setDrawerOpen(x => !x);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                open={drawerOpen}
                variant="persistent"
                anchor="left"
            >
                <div className={classes.drawerHeader} onClick={toggleDrawerOpen}>
                    <Typography>Osocze app</Typography>
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <ListItemLink primary="O projekcie" to="" onClick={toggleDrawerOpen} />
                    <ListItemLink primary="Test" to="test" onClick={toggleDrawerOpen}/>
                    {showResultOption && <ListItemLink primary="Wynik" to="result" onClick={toggleDrawerOpen}/>}
                    <ListItemLink primary="FAQ - Najczęściej zadawane pytania" to="faq" onClick={toggleDrawerOpen}/>
                    <Divider />
                    <ListItem button component="a" href="https://github.com/team-osocze/team-osocze.github.io" target="_blank">
                        <ListItemIcon><GitHubIcon style={{color: "black"}}/></ListItemIcon>
                        <ListItemText primary="Kod źródłowy"/>
                    </ListItem>
                    <ListItem button component="a" href="https://www.mediusflow.com/" target="_blank">
                        <ListItemIcon>
                            <SvgIcon>
                            <circle cx="11.9" cy="12.1" r="5.2" fill="red" />
                            <path d="M11.9,23.6c-6.4,0-11.6-5.2-11.6-11.6S5.6,0.5,11.9,0.5s11.6,5.2,11.6,11.6S18.3,23.6,11.9,23.6z M11.9,2.9&#xD;&#xA;	c-5.1,0-9.2,4.1-9.2,9.2c0,5.1,4.1,9.2,9.2,9.2c5.1,0,9.2-4.1,9.2-9.2C21.1,7,17,2.9,11.9,2.9z" fill="black"/>
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Twórcy"/>
                    </ListItem>
                    <Divider />
                    <ListItem button component="a" href="https://rckik.krakow.pl/" target="_blank">
                            <SvgIcon>                            
                                <path d="M974 3362 c-48 -38 -56 -74 -49 -216 12 -223 -21 -418 -105 -628 -47 -118 -108 -231 -260 -479 -127 -206 -176 -302 -218 -421 -53 -149 -65 -238 -60 -448 4 -164 8 -195 32 -275 56 -186 142 -329 279 -462 134 -130 257 -202 443 -260 84 -26 100 -27 284 -27 184 0 200 1 284 27 186 58 309 130 443 260 138 133 224 276 279 462 23 78 27 113 31 260 6 210 -15 352 -82 553 -139 417 -384 788 -931 1412 -221 252 -230 260 -297 260 -34 0 -59 -6 -73 -18z m529 -1370 c13 -15 16 -53 19 -238 2 -169 6 -225 17 -237 12 -15 41 -17 237 -17 189 0 225 -2 238 -16 13 -13 16 -45 16 -194 0 -167 -1 -180 -19 -190 -12 -6 -107 -10 -239 -10 -192 0 -221 -2 -233 -17 -11 -12 -15 -68 -17 -242 -2 -196 -5 -228 -19 -238 -24 -18 -342 -18 -366 -1 -14 11 -17 43 -19 239 -2 174 -6 230 -17 242 -12 15 -41 17 -233 17 -132 0 -227 4 -239 10 -18 10 -19 23 -19 190 0 149 3 181 16 194 13 14 49 16 238 16 196 0 225 2 237 17 11 12 15 68 17 237 3 185 6 223 19 238 14 16 36 18 183 18 147 0 169 -2 183 -18z" fill="red"/>
                            </SvgIcon>
                        <ListItemText primary="Patronat RCKiK"/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}