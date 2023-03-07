import { makeStyles } from "@mui/styles";
import { isDesktop } from "react-device-detect";

export const useHomepageStyles = makeStyles({
    root: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    body: {
        // width: (isDesktop) && '80%',
    },
    header: {
        textAlign: 'center'
    },
    textSection: {
        // minHeight: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeHeader: {
        display: 'flex',
        margin: '20px',
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: 'red'
    },
    welcomeText: {
        padding: '20px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontFamily: 'Itim',
    },
    pdf: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5vw',
        gap: '20px',
        backgroundColor: 'whitesmoke',
        boxSizing: 'border-box',
        padding: '20px',
        borderRadius: '20px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    },
    pdfModal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    }
})