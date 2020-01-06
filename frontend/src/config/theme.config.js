import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { palette } from '@material-ui/system';

const theme = createMuiTheme(() => ({
    MuiDrawer: {
        background: '#1976d2'
    },
    palette: {
        common: {
            "black": "rgba(0, 0, 0, 1)",
            "white": "#fff"
        },
        background: {
            "paper": "rgba(155, 155, 155, 0.1)",
            "default": "rgba(255, 255, 255, 1)"
        },
        primary: {
            "light": "rgba(160, 203, 254, 1)",
            "main": "rgba(92, 153, 224, 1)",
            "dark": "rgba(56, 133, 223, 1)",
            "contrastText": "rgba(255, 255, 255, 1)"
        },
        secondary: {
            "light": "rgba(240, 234, 169, 1)",
            "main": "rgba(248, 206, 134, 1)",
            "dark": "rgba(212, 197, 14, 1)",
            "contrastText": "rgba(255, 255, 255, 1)"
        },
        error: {
            "light": "rgba(219, 149, 149, 1)",
            "main": "rgba(208, 2, 27, 1)",
            "dark": "rgba(221, 62, 62, 1)",
            "contrastText": "#fff"
        },
        text: {
            "primary": "rgba(0, 0, 0, 0.92)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        },
        paper: {
            backgroundColor: palette.grey[900],
            color: palette.common.white,
            border: 'none',
            boxShadow: '0 0 8px 0 rgba(0,0,0,0.38)',
            '& .MuiListItemIcon-root': {
                color: 'rgba(255, 255, 255, 0.64)'
            },
            '& .MuiTypography-colorTextSecondary': {
                color: 'rgba(255, 255, 255, 0.48)'
            },
            '& .MuiDivider-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.24)'
            }
        }
    },
    typography: {
        useNextVariants: true
    }
}));

export const uiSetting = (() => {
    return {
        drawerWidth: 240,
        keyScrollToTop: "back-to-top-anchor",
    };
})();

export default theme;
