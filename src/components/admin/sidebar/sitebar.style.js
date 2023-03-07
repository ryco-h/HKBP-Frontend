import { makeStyles } from "@mui/styles";

export const useSidebarMobileStyles = makeStyles({
    mobile: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        boxSizing: 'border-box'
    },
    logout: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        background: '#383383',
        color: 'white',
        borderRadius: '20px',
        padding: '10px',
        paddingLeft: '20px',
        paddingRight: '20px',
        cursor: 'pointer',
        "&:hover": {
            background: '#38338360'
        }
    }
})