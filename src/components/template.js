import { Fragment } from "react";
import Footer from "./footer/footer";
import NavigationBar from "./navigation/navigation-bar";

export default function Template({body}) {

    return(
        <Fragment>
            <NavigationBar/>
            <div style={{minHeight: '80vh'}}>
                {body}
            </div>
            <Footer/>
        </Fragment>
    )
}