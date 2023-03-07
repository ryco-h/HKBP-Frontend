import Loader from "./loader";

export const handleDownloadFile = (fileURL, contentType, fileName) => {

    fetch(fileURL, {
        method: 'GET',
        headers: {
            'Content-Type': getExtension(contentType),
        },
    })
    .then((response) => response.blob())
    .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
        new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
        'download',
        fileName,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
    });
}

function getExtension(fileName) {
    var basename = fileName.split(/[\\/]/).pop(),
        pos = basename.lastIndexOf(".");

    if (basename === "" || pos < 1)
        return "";

    const ext = basename.slice(pos + 1);

    if(ext === 'pdf') {
        return 'application/pdf'
    } else if(ext === 'doc') {
        return 'application/msword'
    } else if(ext === 'docx') {
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
}