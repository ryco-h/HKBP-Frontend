import React, { Fragment, useEffect, useState } from "react";
import Fabs from "./fab";
import ModalCard from "../dewan/modal";
import { useDocumentCardStyles } from "./document-card.styles";
import "./document-card.css";

import { url } from "../../services/URL";
import postCountVisits from "../../services/post";
import { handleDownloadFile } from "../../services/download";
import { Desktop, Mobile } from "../../services/responsive";
import Loader from "../../services/loader";
import { fetchDocumentByCategory } from "../../services/fetch";

import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { FcDocument } from 'react-icons/fc'
import { GrDocumentPdf } from 'react-icons/gr'
import { RiFilePpt2Line } from "react-icons/ri";
import TreeView, { flattenTree } from "react-accessible-treeview";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/id';
import { Button, Fab, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


export default function DocumentCard({category}) {

    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isMobile = useMediaQuery({ maxWidth: 991 })
    
    const styles = useDocumentCardStyles()
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const param = (params.documentName) && params.documentName.replace(/\.[^/.]+$/, "")
    
    const [folders, setFolders] = useState({
        name: '',
        children: []
    })

    const [files, setFiles] = useState([])

    useEffect(() => {
        
        fetchDocumentByCategory(category).then(res => {
            setFolders(generateFolder(res.documents.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.dateUploaded) - new Date(a.dateUploaded);
            })))
            setFiles(res.documents)
            if(param) {
                res.documents.filter(file => file.documentName.replace(/\.[^/.]+$/, "") === param).map(file => {
                    setUri(file.documentUrl)
                    handleClickOpen(file._id, file.documentName)
                })
            } else {
                setOpen(false)
            }
            setLoading(false)
        })  
    }, [param])

    const data = (folders) && flattenTree(folders);

    const [selectedDocument, setDocument] = useState()
    const [open, setOpen] = useState(false);
    const [uri, setUri] = useState('')

    const handleClickOpen = (id, name) => {
        setDocument(name)
        setOpen(true)
        files.filter(file => file.documentName === name).map(file => {
            setUri(file.documentUrl)
        })

        postCountVisits({id})
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [ selectedDate, setSelectedDate ] = useState('')

    useEffect(() => {
        setLoading(true)
        if(selectedDate) {
            setFolders(generateFolder(files.filter(data => new Date(data.dateUploaded).setHours(0, 0, 0, 0) === new Date(selectedDate.$d).setHours(0, 0, 0, 0)).sort(function(a,b){
                return new Date(b.dateUploaded) - new Date(a.dateUploaded);
            })))
            setLoading(false)
        } else if(selectedDate === null) {
            setFolders(generateFolder(files.sort(function(a,b){
                return new Date(b.dateUploaded) - new Date(a.dateUploaded);
            })))
            setLoading(false)
        }

    }, [selectedDate])

    const handleShare = () => {
        navigator.clipboard.writeText(`${url.frontend}/acara-ibadah/${selectedDocument.replace(/ /g, '%20').replace(/\.[^/.]+$/, "")}`)
        window.alert('Link telah disalin')
    }

    const handleDownload = (uri, target) => {
        setLoading(true)
        handleDownloadFile(uri, target, uri.replace('https://storage.googleapis.com/hkbp-376304.appspot.com/', ''))
        setLoading(false)
    }

    const [openFab, setFab] = useState(false)
    const handleOpenFab = () => {
        setFab(true)
    }

    const handleCloseFab = () => {
        setFab(false)
    }

    return(
        <div className={styles.root}>
            <Typography variant='h4' sx={{textAlign: 'center', mt: 7, fontFamily: 'Poppins', textDecoration: 'underline'}}>{category}</Typography>
            
            <div className={styles.container}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'id'}>
                        <DatePicker
                            showToolbar={false}
                            views={['day']}
                            inputFormat="DD/MM/YYYY"
                            inputProps={{placeholder: 'Cari berdasarkan tanggal'}}
                            value={(selectedDate) && selectedDate}
                            onChange={(newValue) => {
                                setSelectedDate(newValue)
                            }}
                            openTo='day'
                            renderInput={(params) => <TextField placeholder="Cari berdasarkan tanggal" variant="standard" {...params} />}
                        />
                    </LocalizationProvider>
                    <IconButton onClick={() => setSelectedDate(null)}>
                        <DeleteIcon fontSize="large"/>
                    </IconButton>
                </div>

                <Desktop>
                    {(folders) && 
                    <div style={ide} className={'ide'}>
                        {(folders.children.length === 0) && <div style={{textAlign: 'center'}}>Tidak ada dokumen.</div>}
                        <TreeView
                        data={data}
                        aria-label="directory tree"
                        nodeRenderer={({
                            element,
                            isBranch,
                            isExpanded,
                            getNodeProps,
                            level
                        }) => (
                            <div
                            {...getNodeProps()} style={{ paddingLeft: 30 * (level - 1) }}>
                            {isBranch ? (
                                <FolderIcon isOpen={isExpanded} />
                            ) : (
                                <FileIcon filename={element.name} />
                            )}
                            {(level === 1) ? element.name : 
                                <Link style={{textDecoration: 'none', color: 'white'}} to={`/acara-ibadah/${element.name.replace(/\.[^/.]+$/, "")}`} onClick={() => handleClickOpen(element._id, element.name)}>{element.name}</Link>
                            }
                            </div>
                        )}
                        />
                    </div>
                    }
                </Desktop>

                <Mobile>
                    {(folders) && 
                    <div style={ideMobile} className="ide">
                        {(folders.children.length === 0) && <div style={{textAlign: 'center'}}>Tidak ada dokumen.</div>}
                        <TreeView
                        data={data}
                        aria-label="directory tree"
                        nodeRenderer={({
                            element,
                            isBranch,
                            isExpanded,
                            getNodeProps,
                            level
                        }) => (
                            <div
                            {...getNodeProps()} style={{ paddingLeft: 30 * (level - 1) }}>
                            {isBranch ? (
                                <FolderIcon isOpen={isExpanded} />
                            ) : (
                                <FileIcon filename={element.name} />
                            )}
                            {(level === 1) ? element.name : 
                                <Link style={{textDecoration: 'none', color: 'white'}} to={`/acara-ibadah/${element.name.replace(/\.[^/.]+$/, "")}`} onClick={() => handleClickOpen(element._id, element.name)}>{element.name}</Link>
                            }
                            </div>
                        )}
                        />
                    </div>
                    }
                </Mobile>
            </div>

            <ModalCard title={
                <Fragment>
                    <Desktop>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '5px', justifyContent: 'space-between'}}>
                            <span style={{fontSize: '15px', width: '100%'}}>Jika dokumen gagal dibuka, silahkan unduh atau buka kembali.</span>
                            <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', gap: '20px'}}>
                                <IconButton onClick={() => handleDownload(uri, 'application/pdf')}>
                                    <DownloadIcon/>
                                </IconButton>

                                <IconButton onClick={() => handleShare()}>
                                    <ShareIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </Desktop>

                    <Mobile>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: '10px'}}>
                            <Button size='small' variant='contained' onClick={() => handleShare()} startIcon={<ShareIcon/>}>
                                Salin Link
                            </Button>

                            <Button size='small' variant='contained' onClick={() => handleDownload(uri, 'application/pdf')} startIcon={<DownloadIcon/>}>
                                Unduh File
                            </Button>
                        </div>
                    </Mobile>
                </Fragment>
            } uri={uri} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>

            <ModalCard 
            disableFs={(isDesktop) ? true : false} child open={openFab} handleClose={handleCloseFab}>
                <Fabs/>
            </ModalCard>

            <Loader open={loading}/>

            {(!openFab) && 
                <div style={{
                    display: 'block',
                    position: 'fixed',
                    bottom: (isDesktop) ? 20 : 5,
                    right: (isDesktop) ? 20 : 5,
                    margin: '20px',
                    zIndex: '99999999'
                }}>
                    <Fab onClick={handleOpenFab} color="primary" aria-label="add">
                        <QuestionMarkIcon />
                    </Fab>
                </div>
            }
        </div>
    )
}

const generateFolder = (array) => {
        
    var list_date = []
    
    array.map(item => {
        list_date.push(
        {
            name: formatDate(item.dateUploaded)
        })
    })

    var uniqueArray = removeDuplicates(list_date, "name");

    var final_array = {name: '', children: []}
    

    for(var j in uniqueArray) {
        var list_children = []
        for(var i in array) {
            if(formatDate(array[i].dateUploaded) === uniqueArray[j].name) {
                list_children.push({name: array[i].documentName})
            }
        }
        
        final_array['children'].push({
            name: uniqueArray[j].name,
            children: list_children
        })

        list_children = []
    }

    return final_array
}

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }

    return newArray;
}

const FolderIcon = ({ isOpen }) =>
isOpen ? (
    <FaRegFolderOpen color="e8a87c" className="icon" />
) : (
    <FaRegFolder color="e8a87c" className="icon" />
);

const FileIcon = ({ filename }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "pdf":
        return <GrDocumentPdf color="white" className="icon" />;
    case "ppt":
        return <RiFilePpt2Line color="white" className="icon"/>;
    case "pptx":
        return <RiFilePpt2Line color="white" className="icon"/>;
    case "doc":
      return <FcDocument color="turquoise" className="icon" />;
    case "docx":
        return <FcDocument color="turquoise" className="icon" />;
    default:
        return null;
  }
};

const formatDate = (date) => {
    const newDate = new Date(date)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return newDate.toLocaleDateString("id-ID", options)
}

const ide = {
    background: '#464545',
    fontFamily: 'monospace',
    fontSize: '20px',
    color: 'white',
    userSelect: 'none',
    padding: '20px',
    borderRadius: '20px',
    minWidth: '400px',
    boxShadow: '#ffffff 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px'
}

const ideMobile = {
    background: '#464545',
    fontFamily: 'monospace',
    fontSize: '15px',
    color: 'white',
    userSelect: 'none',
    padding: '20px',
    borderRadius: '20px',
    width: '80%',
    boxShadow: '#ffffff 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px',
    display: 'flex',
    overflowX: 'auto'
}