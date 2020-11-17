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
            width: "180px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px"
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
                    <Divider />
                    <ListItem button component="a" href="https://github.com/team-osocze/team-osocze.github.io">
                        <ListItemIcon><GitHubIcon /></ListItemIcon>
                        <ListItemText primary="Kod źródłowy"/>
                    </ListItem>
                    <ListItem button component="a" href="https://www.mediusflow.com/">
                        <ListItemIcon>
                            <SvgIcon>
                            <circle cx="11.9" cy="12.1" r="5.2" />
                                <path d="M11.9,23.6c-6.4,0-11.6-5.2-11.6-11.6S5.6,0.5,11.9,0.5s11.6,5.2,11.6,11.6S18.3,23.6,11.9,23.6z M11.9,2.9&#xD;&#xA;	c-5.1,0-9.2,4.1-9.2,9.2c0,5.1,4.1,9.2,9.2,9.2c5.1,0,9.2-4.1,9.2-9.2C21.1,7,17,2.9,11.9,2.9z" />
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Twórcy"/>
                    </ListItem>
                    <Divider />
                    <ListItem>Patronat...</ListItem>
                </List>
            </Drawer>
        </div>
    );
}