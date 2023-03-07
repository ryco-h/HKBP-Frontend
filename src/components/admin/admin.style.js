import { makeStyles } from "@mui/styles";

export const useAdminStyles = makeStyles({
    root: {

    },
    body: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: 'whitesmoke',
        padding: '20px',
        boxSizing: 'border-box',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: '20px'
    },
    loginBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
    }
})

export const useAdminTemplateStyles = makeStyles({
    
    root: {
        display: 'inline-block',
        width: '100%'
    },
    sidebar: {
        flex: 1
    },
    props: {
        // flex: 2,
        flexGrow: 4,
        background: 'white',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        borderRadius: '10px',
        padding: '10px',
    },
    propsMobile: {
        // flex: 2,
        flexGrow: 4,
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        borderRadius: '10px',
        padding: '10px',
        margin: '10px'
    }
})