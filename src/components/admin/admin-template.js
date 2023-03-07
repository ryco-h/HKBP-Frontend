import { Desktop, Mobile } from "../../services/responsive";
import { useAdminTemplateStyles } from "./admin.style";
import SidebarComponent from "./sidebar/sidebar";

export default function AdminTemplate(props) {

    const styles = useAdminTemplateStyles()

    return(
        <div className={styles.root}>
            <Desktop>
                <div style={body}>
                    <div className={styles.sidebar}>
                        <SidebarComponent/>
                    </div>
                    <div className={styles.props}>
                        {props.body}
                    </div>
                </div>
            </Desktop>
            <Mobile>
                <div style={bodyMobile}>
                    <div className={styles.sidebar}>
                        <SidebarComponent/>
                    </div>
                    <div className={styles.propsMobile}>
                        {props.body}
                    </div>
                </div>
            </Mobile>
        </div>
    )
}

const body = {
    display: 'flex',
    padding: '30px',
    boxSizing: 'border-box',
    height: '100%',
    gap: '20px',
    width: '100%'
}

const bodyMobile = {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
}