import AdminTemplate from "../admin-template"
import { useJadwalKegiatanStyles } from "./jadwal-kegiatan.style"

export default function JadwalKegiatanIndex() {
    return(
        <AdminTemplate body={<JadwalKegiatan/>}/>
    ) 
}

function JadwalKegiatan() {

    const styles = useJadwalKegiatanStyles()

    return(
        <div className={styles.root}>
            JadwalKegiatan
        </div>
    )
}