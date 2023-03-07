import { makeStyles } from "@mui/styles";
import { isMobile } from "react-device-detect";

export const useNavigationStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: (isMobile) ? '2vw' : '1vw',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        gap: '20px',
        cursor: 'pointer',
        marginLeft: '100px'
    },
    menuContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        gap: '100px'
    },
    legendContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
    legendContainerMobile: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: '20px',
        '&>*:nth-child(2)': {
            flex: 2,
            textAlign: 'center'
        },
    },
})