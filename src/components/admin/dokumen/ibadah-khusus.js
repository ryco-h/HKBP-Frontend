import AdminTemplate from "../admin-template"
import CardDocumentContainer from "./card-container"
import { useDIbadahKhususStyles } from "./dokumen.style"

export default function DIbadahKhususIndex() {
    return(
        <AdminTemplate body={<DIbadahKhusus/>}/>
    ) 
}

function DIbadahKhusus() {

    const styles = useDIbadahKhususStyles()

    return(
        <div className={styles.root}>
            <CardDocumentContainer category={'Ibadah Khusus'}/>
        </div>
    )
}