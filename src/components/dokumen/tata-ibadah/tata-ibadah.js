import { Fragment } from "react"
import Template from "../../template"
import DocumentCard from "../document-card"

import { Helmet } from "react-helmet-async"

export default function TataIbadahIndex() {
    return(
        <Fragment>
            <Helmet>
                <title>Tata Ibadah</title>
            </Helmet>
            <Template body={<TataIbadah/>}/>
        </Fragment>
    ) 
}

function TataIbadah() {

    return(
        <div>
            <DocumentCard category={'Tata Ibadah'}/>
        </div>
    )
}