import { makeStyles } from "@mui/styles";

export const useCardContainerStyles = makeStyles({
    root: {

    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: '40px',
        padding: '20px'
    },
    cardAdd : {
        position: 'relative',
        display: 'flex',
        flex: '0 1 auto',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 'max(30%, 300px)',
        borderRadius: '20px',
        padding: '20px',
        backgroundColor: '#1A374D',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        cursor: 'pointer',
        '& .hoverAct': {
            background: 'rgba(255, 255, 255, 0)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
        },
        '&:hover': {
            '& .hoverAct': {
                width: '100%',
                height: '100%',
                position: 'absolute',
            }
        }   
    },
    card: {
        fontFamily: 'Poppins',
        display: 'flex',
        flex: '0 1 auto',
        flexDirection: 'column',
        width: 'max(30%, 300px)',
        gap: '20px',
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: '#1A374D',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        cursor: 'pointer',
        color: 'white'
    },
    icon: {
        background: 'white',
        borderRadius: '50%',
        padding: '10px',
        boxSizing: 'border-box'
    }
})

export const useDTataIbadahStyles = makeStyles({

    root: {

    }
})

export const useDAcaraIbadahStyles = makeStyles({

    root: {
        
    },
    
})

export const useDIbadahKhususStyles = makeStyles({

    root: {
        
    }
})