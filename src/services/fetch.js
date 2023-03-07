import { url } from "./URL"

export async function fetchFeaturedDocument() {

    const res = await fetch(`${url.backend}/file/read-by-feature`)

    return await res.json()
}

export async function fetchDocumentByCategory(category) {

    const res = await fetch(`${url.backend}/file/read-by-category?category=${category}`)

    return await res.json()
}