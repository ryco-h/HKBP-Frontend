import AdminTemplate from "../admin-template"
import CardDocumentContainer from "./card-container"
import { useDAcaraIbadahStyles } from "./dokumen.style"

export default function DAcaraIbadahIndex() {
    return(
        <AdminTemplate body={<DAcaraIbadah/>}/>
    ) 
}

function DAcaraIbadah() {

    const styles = useDAcaraIbadahStyles()

    return(
        <div className={styles.root}>
            <CardDocumentContainer category={'Acara Ibadah'}/>
        </div>
    )
}
