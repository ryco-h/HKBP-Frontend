import { makeStyles } from "@mui/styles";

export const useDocumentCardStyles = makeStyles({
    root: {
        
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px'
    },
    calendar: {
        '& .MuiPickersCalendarHeader-root': {
            display: 'none'
        }
    }
})