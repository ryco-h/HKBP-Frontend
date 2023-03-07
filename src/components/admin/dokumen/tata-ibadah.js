import AdminTemplate from "../admin-template"
import CardDocumentContainer from "./card-container"
import { useDTataIbadahStyles } from "./dokumen.style"

export default function DTataIbadahIndex() {
    return(
        <AdminTemplate body={<DTataIbadah/>}/>
    ) 
}

function DTataIbadah() {

    const styles = useDTataIbadahStyles()

    return(
        <div className={styles.root}>
            <CardDocumentContainer category={'Tata Ibadah'}/>
        </div>
    )
}