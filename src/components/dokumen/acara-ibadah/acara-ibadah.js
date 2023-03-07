import { Fragment } from "react";
import Template from "../../template"
import DocumentCard from "../document-card";

import { Helmet } from "react-helmet-async";

export default function AcaraIbadahIndex() {
    return(
        <Fragment>
            <Helmet>
                <title>Acara Ibadah</title>
            </Helmet>
            <Template body={<AcaraIbadah/>}/>
        </Fragment>
    ) 
}

function AcaraIbadah() {

    return(
        <div>
            <DocumentCard category={'Acara Ibadah'}/>
        </div>
    )
}