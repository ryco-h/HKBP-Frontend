import { makeStyles } from "@mui/styles";

export const useLocationStyles = makeStyles({
    root: {
        // height: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        boxSizing: 'border-box',
        display: 'flex',
        // alignItems: 'center',
        backgroundColor: 'whitesmoke',  
        padding: '20px',
        boxSizing: 'border-box',
        // overflow: 'auto',
        width: '90%',
        // height: '100%',
        borderRadius: '20px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    },
    cardContainerMobile: {
        boxSizing: 'border-box',
        // display: 'flex',
        // flexDirection: 'column',
        backgroundColor: 'whitesmoke',
        padding: '20px',
        margin: '20px',
        boxSizing: 'border-box',
        overflow: 'auto',
        width: '100%',
        borderRadius: '20px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
    },
    maps: {
        flex: 1,
        height: '400px',
    },
    rightCard: {
        boxSizing: 'border-box',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '20px',
        width: '100%',
        // backgroundColor: 'red'
    }
})