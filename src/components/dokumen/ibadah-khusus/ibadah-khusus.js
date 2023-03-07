import { Fragment } from "react"
import Template from "../../template"
import DocumentCard from "../document-card"

import { Helmet } from "react-helmet-async"

export default function IbadahKhususIndex() {
    return(
        <Fragment>
            <Helmet>
                <title>Ibadah Khusus</title>
            </Helmet>
            <Template body={<IbadahKhusus/>}/>
        </Fragment>
    ) 
}

function IbadahKhusus() {

    return(
        <div>
            <DocumentCard category={'Ibadah Khusus'}/>
        </div>
    )
}