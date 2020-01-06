import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { uiSetting } from '../config/theme.config';
import { MenuConfigs } from '../config/menu.config';
import { cssStyled } from "../config/appbar.style";
import ProfileMenu from "../fragment/ProfileMenu";

const keySrollToTop = String(uiSetting.keyScrollToTop);

const DrawerMenu = () => {
    const classes = cssStyled();
    const theme = useTheme();
    const [state, setState] = React.useState({});
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const toggleDrawer = (isOpen) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setMobileOpen(isOpen);
    };

    const handleCollapse = item => {
        setState(prevState => ({ [item]: !prevState[item] }));
    };

    const drawer = (
        <List>
            {MenuConfigs.map(({ key, label, icon, to, items: subItems }) => (
                <>
                    <ListItem
                        key={key}
                        value={key}
                        button={!!to}
                        component={to ? Link : "div"}
                        to={to}
                        onClick={
                            subItems.length > 0 ? (() => handleCollapse(key)) : undefined
                        }>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText primary={label} />
                        {subItems.length === 0 ? (
                            <></>
                        ) : !state[key] ? (
                            <ExpandMore />
                        ) : (
                                    <ExpandLess />
                                )}
                    </ListItem>
                    {subItems.length > 0 ? (
                        <Collapse in={state[key]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {subItems.map(({ key, label, icon, to }) => (
                                    <ListItem
                                        key={key}
                                        value={key}
                                        button={!!to}
                                        component={to ? Link : "div"}
                                        to={to}
                                        {...!!to && { to }}
                                        className={classes.nested}>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText primary={label} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    ) : (
                            <></>
                        )}
                </>
            ))}
        </List>
    );

    return (
        <div className={classes.root}>

            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: state['open']
                })}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={toggleDrawer(!mobileOpen)}
                        className={classes.settingButton}
                    >
                        <MenuOutlinedIcon className={classes.settingButton} />
                    </IconButton>
                    <Typography className={classes.title} variant="h6">Social Media Network</Typography>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton
                        edge="end"
                        aria-label="token of current user"
                        aria-controls="primary-token"
                        aria-haspopup="false"
                        color="inherit">
                        <Badge badgeContent={100.000} color="secondary">
                            <MonetizationOn className={classes.moneyButton} />
                        </Badge>
                    </IconButton>
                    <div style={{ width: 20 }} />
                    <ProfileMenu />
                </Toolbar>
            </AppBar>
            <Toolbar display="none" id={keySrollToTop} />
            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of tos. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={toggleDrawer(false)}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}>
                        <IconButton onClick={toggleDrawer(!mobileOpen)} className={classes.closeSettingButton}>
                            <CloseIcon />
                        </IconButton>
                        <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                            {drawer}
                        </div>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    {/* Menu always display on desktop */}
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper
                        }}>
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    )
}

export default DrawerMenu;