import AdminTemplate from "../admin-template"
import { useAdminDashboardStyles } from "./dashboard.style"

export default function AdminDashboardIndex() {
    return(
        <AdminTemplate body={<AdminDashboard/>}/>
    ) 
}

function AdminDashboard() {

    const styles = useAdminDashboardStyles()

    return(
        <div className={styles.root}>
            AdminDashboard 
        </div>
    )
}