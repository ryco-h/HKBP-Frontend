import { makeStyles } from "@mui/styles";

export const useInformasiStyles = makeStyles({

    root: {
        
    }
})

export const useJadwalKegiatanStyles = makeStyles({
    root: {
        
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
    },
    section: {
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        boxSizing: 'border-box'
    },
    headTag: {
        fontFamily: 'Poppins',
        cursor: 'pointer',
        '&:hover': {
            color: 'blue',
        }
    }
})