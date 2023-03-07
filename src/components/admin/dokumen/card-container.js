import { createRef, forwardRef, Fragment, useEffect, useState } from "react"
import { useCardContainerStyles } from "./dokumen.style"
import titleCase from "../../../services/changeTitle"
import { fetchDocumentByCategory } from "../../../services/fetch"
import { formatDate } from "../../../services/formatDate"
import Loader from "../../../services/loader"
import { handleDownloadFile } from "../../../services/download"
import { Desktop, Mobile } from "../../../services/responsive"
import getExtension from "../../../services/getExtension"
import { url } from "../../../services/URL";
import ModalCard from "../../dewan/modal"

import axios from "axios";

import { FcDocument } from 'react-icons/fc'
import { GrDocumentPdf } from 'react-icons/gr'
import { MdOutlineAdd } from 'react-icons/md'
import { RiFilePpt2Line } from 'react-icons/ri'

import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, Slide, TextField, Typography, MenuItem, FormControl, InputLabel, Chip, FormControlLabel, Radio, FormLabel, RadioGroup, Alert } from "@mui/material"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";

export default function CardDocumentContainer({category}) {

    const styles = useCardContainerStyles()
    const [document, setDocument] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)
        fetchDocumentByCategory(category).then(res => {
            setDocument(res.documents)
            setLoading(false)
        })
    }, [category])

    const [modal, setModal] = useState({
        selectedDocument: '',
        uri: ''
    })

    const [open, setOpen] = useState(false)

    const handleClickOpen = (name, uri) => {

        modal['selectedDocument'] = name
        modal['uri'] = uri

        setModal(modal)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(!open)
    }

    const [dialog, setDialog] = useState({
        title: '',
        _id: '',
        documentName: '',
        category: '',
        documentUrl: ''
    })
    
    const [openDialog, setOpenDialog] = useState(false)

    const handleClickOpenDialog = (doc, target) => {

        if(target === 'Edit' && doc) {
            const ext = getExtension(doc.documentName)

            dialog['title'] = target
            dialog['_id'] = doc._id
            dialog['documentName'] = doc.documentName
            dialog['category'] = doc.category
            dialog['documentUrl'] = doc.documentUrl
            setDialog(dialog)

            documentToEdit['_id'] = doc._id
            documentToEdit['documentName'] = doc.documentName.replace('.'+ext, '')
            documentToEdit['dateUploaded'] = doc.dateUploaded
            documentToEdit['category'] = doc.category
            documentToEdit['documentUrl'] = doc.documentUrl
            documentToEdit['isFeatured'] = doc.isFeatured
            documentToEdit['ext'] = ext
            setDocumentToEdit(documentToEdit)
        } else if(target === 'Post') {

            dialog['title'] = target
            setDialog(dialog)
        }

        setOpenDialog(true)
    }

    const handleCloseDialog = () => {


        setDialog({
            title: '',
            _id: '',
            documentName: '',
            category: '',
            documentUrl: ''
        })

        setDocumentToEdit({
            _id: '',
            documentName: '',
            dateUploaded: '',
            category: '',
            documentUrl: '',
            isFeatured: '',
            ext: ''
        })
        setOpenDialog(false)
    }

    const [documentToEdit, setDocumentToEdit] = useState({
        _id: '',
        documentName: '',
        dateUploaded: '',
        category: '',
        documentUrl: '',
        isFeatured: '',
        ext: ''
    })

    const handleChange = (e) => {
        const value = e.target.value
        const id = e.target.id
        
        setDocumentToEdit(prev => ({...prev, [id]: value }))
    }

    const handleChangeSelect = (e) => {
        setDocumentToEdit(prev => ({...prev, ['category']: e.target.value}))
    }

    const handleChangeFeatured = (e) => {
        setDocumentToEdit(prev => ({...prev, ['isFeatured']: !documentToEdit.isFeatured}))
    }

    const handleSubmitEdit = (e) => {

        setLoading(true)

        documentToEdit['documentName'] = (getExtension(documentToEdit.documentName) === documentToEdit.ext) ? documentToEdit.documentName : documentToEdit.documentName + '.' + documentToEdit.ext
        
        axios.put(`${url.backend}/file/update`, documentToEdit)
        .then(res => {
            if(res.data.status === 200) {
                window.alert('Dokumen berhasil diperbarui!')
                window.location.reload()
            } else if(res.data.status === 400) {
                window.alert('Gagal memperbarui dokumen!')
            }
            setLoading(false)
        })
    }

    const handleDelete = (e) => {

        setLoading(true)

        axios.delete(`${url.backend}/file/delete`, {
            data: {
                _id: dialog._id,
                documentName: dialog.documentName
            }
        })
        .then(res => {
            if(res.data.status === 200) {
                window.alert('Dokumen berhasil dihapus!')
                window.location.reload()
            } else if(res.data.status === 400) {
                window.alert('Gagal menghapus dokumen!')
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        if(window.location.pathname === '/admin/dokumen/acara-ibadah') {
            setDocumentToPost(prev => ({...prev, ['category']: 'Acara Ibadah'}))
        } else if(window.location.pathname === '/admin/dokumen/tata-ibadah') {
            setDocumentToPost(prev => ({...prev, ['category']: 'Tata Ibadah'}))
        } else if(window.location.pathname === '/admin/dokumen/ibadah-khusus') {
            setDocumentToPost(prev => ({...prev, ['category']: 'Ibadah Khusus'}))
        }
    }, [])

    const [documentToPost, setDocumentToPost] = useState({
        file: '',
        category: '',
        dateUploaded: 'present',
        isFeatured: false
    })

    const fileInput = createRef()

    const handleChangeFile = (e) => {

        e.preventDefault()
        setDocumentToPost(prev => ({...prev, ['file']: fileInput.current.files[0]}))
    }

    const handleChangePost = (e) => {
        const value = e.target.value

        setDocumentToPost(prev => ({...prev, ['isFeatured']: (value === 'true')}))
    }

    const handleSubmitPost = (e) => {

        setLoading(true)

        const formData = new FormData()

        if(documentToPost.file === null || documentToPost.file === undefined || documentToPost.file === '') {
            window.alert('File tidak boleh kosong')
            setLoading(false)
            return false
        }

        if(documentToPost.dateUploaded === undefined || documentToPost.dateUploaded === null) {
            window.alert('Periksa kembali tanggal')
            setLoading(false)
            return false
        }

        formData.append('filePdf', documentToPost.file)
        formData.append('category', documentToPost.category)
        formData.append('dateUploaded', documentToPost.dateUploaded)
        formData.append('isFeatured', documentToPost.isFeatured)

        axios.post(`${url.backend}/file/post`, formData, {
            headers: {'Access-Control-Allow-Origin' : '*',}
        })
        .then(res => {
            if(res.data.status === 400) {
                window.alert(res.data.err)
            } else if(res.data.status === 200) {
                window.alert('Berhasil mengupload dokumen.')
                window.location.reload()
            }
            setLoading(false)
        })
    }

    return(
        <div className={styles.root}>
            <div style={{width: '100%', boxSizing: 'border-box'}}>
                <Alert variant={'filled'} severity={'info'} sx={{width: '100%', fontFamily: 'Poppins', boxSizing: 'border-box', fontWeight: 'bold'}}>
                    Featured adalah penanda apabila dokumen ditampilkan di halaman utama. 
                </Alert>
            </div>
            <div className={styles.container}>
                <div className={styles.cardAdd} onClick={() => handleClickOpenDialog(null, 'Post')}>
                    <div className={'hoverAct'}/>
                    <MdOutlineAdd style={{color: 'white'}} size={100}/>
                </div>
                {document.map((doc, index) => (
                    <div
                    key={doc.documentName+' '+index}
                    className={styles.card}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Typography variant='h5' sx={{fontFamily: 'Poppins'}}>
                                {doc.category}
                            </Typography>
                            <Avatar sx={{
                                margin: '20px',
                                width: 55, 
                                height: 55,
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                '&:hover': {
                                   backgroundColor: 'rgb(37, 150, 190)',
                                }
                            }}>
                                <FileIcon filename={doc.documentName} />
                            </Avatar>
                        </div>
                        <div>
                            {titleCase(doc.documentName)}
                            <br/>
                            {formatDate(doc.dateUploaded)}
                        </div>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px'
                        }}>
                            {(doc.isFeatured) ? 
                            <Chip
                                label="Featured"
                                variant="filled"
                                color='info'
                                icon={<DoneIcon />}
                            />
                            : 
                            <Chip
                                label="Featured"
                                variant="filled"
                                color='info'
                                icon={<CloseIcon />}
                            />
                            }
                            {(doc.countVisited) ?
                            <Chip
                                label={`Dibuka: ${doc.countVisited} kali`}
                                variant="filled"
                                color='info'
                            />
                            :
                            <Chip
                                label={`Dibuka: 0`}
                                variant="filled"
                                color='info'
                            />
                            }
                        </div>
                        <div style={{borderTop: 'white 2px solid'}}/>
                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px'}}>
                            <Button variant='contained' onClick={() => handleClickOpenDialog(doc, 'Edit')}>
                                Edit Dokumen
                            </Button>
                            <Button variant='contained' onClick={() => handleClickOpen(doc.documentName, doc.documentUrl)}>
                                Lihat Dokumen
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <ModalCard
            directClose={true}
            title={
                <Fragment>
                    <Desktop>
                        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                            <Button variant="contained" onClick={() => handleDownloadFile(modal.uri, 'application/pdf', modal.selectedDocument)}>
                                Unduh File
                            </Button>
                            <span style={{fontSize: '15px'}}>Jika dokumen gagal dibuka, silahkan unduh atau buka kembali.</span>
                        </div>
                    </Desktop>
                    <Mobile>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '5px'}}>
                            <span style={{fontSize: '15px'}}>Jika dokumen gagal dibuka, silahkan unduh atau buka kembali.</span>
                            <Button variant="contained" onClick={() => handleDownloadFile(modal.uri, 'application/pdf', modal.selectedDocument)}>
                                Unduh File
                            </Button>
                        </div>
                    </Mobile>
                </Fragment>
            } uri={modal.uri} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
            
            <Loader open={loading}/>
            
            <Dialog open={openDialog} onClose={handleCloseDialog} TransitionComponent={Transition} fullWidth>
                {(dialog.title === 'Edit') && 
                    <Fragment>
                        <DialogTitle>{dialog.title}</DialogTitle>
                        <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                            <DialogContentText>
                                <a href={dialog.documentUrl} target='_blank'>Link Dokumen</a>
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="documentName"
                                label="Nama Dokumen"
                                value={documentToEdit.documentName || ''}
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                            />

                            <FormControl fullWidth>
                                <InputLabel id="kategori-label">Kategori</InputLabel>
                                <Select
                                    id="category"
                                    value={documentToEdit.category || ''}
                                    label="Kategori"
                                    labelId="kategori-label"
                                    onChange={handleChangeSelect}
                                    >
                                        <MenuItem value={'Tata Ibadah'}>Tata Ibadah</MenuItem>
                                        <MenuItem value={'Acara Ibadah'}>Acara Ibadah</MenuItem>
                                        <MenuItem value={'Ibadah Khusus'}>Ibadah Khusus</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <FormLabel id="isFeatured-label">Featured</FormLabel>
                                <RadioGroup
                                    aria-labelledby="isFeatured-label"
                                    id="isFeatured"
                                    value={documentToEdit.isFeatured}
                                    onChange={handleChangeFeatured}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleSubmitEdit}>Update</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                        </DialogActions>
                    </Fragment>
                }
                {(dialog.title === 'Post') && 
                    <Fragment>
                        <DialogTitle>{dialog.title}</DialogTitle>
                        <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                            <input type='file' ref={fileInput} onInput={handleChangeFile}/>
                            <TextField label="Kategori" value={documentToPost.category || ''}/>

                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Tanggal"
                                        inputFormat="DD/MM/YYYY"
                                        value={(documentToPost.dateUploaded === 'present') ? Date.now() : documentToPost.dateUploaded}
                                        onChange={(newValue) => {
                                            setDocumentToPost(prev => ({...prev, ['dateUploaded']: new Date(newValue.$d)}))
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FormControl>

                            <FormControl fullWidth>
                                <FormLabel id="isFeatured-label">Featured</FormLabel>
                                <RadioGroup
                                    aria-labelledby="isFeatured-label"
                                    id="isFeatured"
                                    value={documentToPost.isFeatured}
                                    onChange={handleChangePost}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={false} control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleSubmitPost}>Post</Button>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                        </DialogActions>
                    </Fragment>
                }
            </Dialog>
        </div>
    )
}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FileIcon = ({ filename }) => {
    const extension = filename.slice(filename.lastIndexOf(".") + 1);
    switch (extension) {
        case "pdf":
            return <GrDocumentPdf color="white" className="icon" size={30}/>;
        case "ppt":
            return <RiFilePpt2Line color="white" className="icon" size={30}/>;
        case "pptx":
            return <RiFilePpt2Line color="white" className="icon" size={30}/>;
        case "doc":
            return <FcDocument color="turquoise" className="icon" size={30}/>;
        case "docx":
            return <FcDocument color="turquoise" className="icon" size={30}/>;
        default:
            return null;
    }
};