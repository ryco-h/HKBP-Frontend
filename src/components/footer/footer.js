import { Typography } from "@mui/material"
import { useFooterStyles } from "./footer.style"

export default function Footer() {

    const styles = useFooterStyles()

    return(
        <div className={styles.root}>
            <div className={styles.container}>
                <Typography variant='body1' sx={{fontWeight: 'bold', textAlign: 'center'}}>
                    ©Multimedia2023 - HKBP Purwakarta
                </Typography>
            </div>
        </div>
    )
}