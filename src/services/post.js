import axios from "axios";
import { url } from "./URL";

export default async function postCountVisits({id}) {

    const res = await axios.post(`${url.backend}/file/count-visits`, {
        _id: id
    })

    if(res) {
        return true
    } else {
        return false
    }
}