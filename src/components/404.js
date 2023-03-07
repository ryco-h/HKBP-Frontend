import { Button, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import logo from '../media/logo-putih.png'
import { url } from "../services/URL"

export default function NotFound({isMaintenance}) {

    const style = use404Styles()

    return(
        <div className={style.root}>
            <div className={style.body}>
                <img src={logo} className={style.img}/>
                <div className={style.bodyChild}>
                    <Typography variant="h3" sx={{fontFamily: 'Poppins', color: 'white', width: '100%', textAlign: 'center'}}>
                        HKBP Purwakarta
                    </Typography>
                    <div style={{borderTop: '2px solid white', width: '80%'}}/>
                    <Typography variant="h5" sx={{fontFamily: 'Poppins', color: 'white', width: '100%', textAlign: 'center'}}>
                        {(isMaintenance) ? 'Halaman sedang diproses' : 'Halaman tidak ditemukan'}
                    </Typography>
                </div>
            </div>
            
            <a href={url.frontend} style={{textDecoration: 'none', color: 'white'}}>
                <Button variant='contained'>
                    Halaman Utama
                </Button>
            </a>
        </div>
    )
}

const use404Styles = makeStyles({

    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#383383',
        gap: '20px'
    },
    body: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
    },
    img: {
        maxWidth: '100px'
    },
    bodyChild: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
})