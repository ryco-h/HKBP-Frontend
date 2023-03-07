import React, { Fragment, useEffect, useState } from 'react'
import { useHomepageStyles } from './homepage.style';
import Template from '../template'
import ModalCard from '../dewan/modal';
import { JadwalKegiatan } from '../profile/informasi/informasi';

import postCountVisits from '../../services/post';
import { fetchFeaturedDocument } from '../../services/fetch';
import { Desktop, Mobile } from '../../services/responsive';
import Loader from '../../services/loader';
import { handleDownloadFile } from '../../services/download';

import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';

import { Button, Typography } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function HomepageIndex() {

    return(
        <Fragment>
            <HelmetProvider>
                <Helmet prioritizeSeoTags>
                    <title>Gereja HKBP Purwakarta</title>
                    <meta name="title" content="Gereja HKBP Purwakarta"/>
                    <link rel="canonical" href="https://hkbppurwakarta.com" />
                    <meta name="description" content="Website Gereja HKBP Purwakarta. Menyediakan dokumen untuk ibadah, serta menyediakan informasi mengenai pelayan-pelayan gereja HKBP Purwakarta."/>
                    <meta name="keywords" content="Gereja, HKBP, HKBP Purwakarta, Jemaat, Ibadah, Pelayanan"/>
                    <meta name="robots" content="index, follow"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                    <meta name="language" content="Indonesia"/>
                    <meta name="revisit-after" content="1 days"/>
                    <meta name="author" content="HKBP Purwakarta"/>
                </Helmet>
            </HelmetProvider>
            <Template body={<Homepage/>}/>
        </Fragment>
    )
}

function Homepage() {

    const [loading, setLoading] = useState(false)
    const [featured, setFeatured] = useState([])
    const [open, setOpen] = React.useState(false);

    const [selectedDocument, setDocument] = useState({
        documentName: '',
        documentUri: ''
    })
    
    const handleClickOpen = (id, name, uri) => {
        setOpen(true);
        setDocument({
            documentName: name,
            documentUri: uri
        })

        postCountVisits({id})
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const styles = useHomepageStyles()

    useEffect(() => {
        setLoading(true)
        fetchFeaturedDocument().then(res => {
            setFeatured(res.featuredDocument.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.dateUploaded) - new Date(a.dateUploaded);
            }))
            setLoading(false)
        })
    }, [])

    const formatDate = (date) => {
        const newDate = new Date(date)
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return newDate.toLocaleDateString("id-ID", options)
    }

    return(
        <div className={styles.root}>

            <div className={styles.welcomeHeader}>
                <div className={styles.textSection}>
                    <Desktop>
                        <div style={{fontSize: '40px'}} className={styles.welcomeText}>
                            Selamat Datang di <br/> HKBP Purwakarta
                        </div>
                    </Desktop>
                    <Mobile>
                        <div style={{fontSize: '30px'}} className={styles.welcomeText}>
                            Selamat Datang di <br/> HKBP Purwakarta
                        </div>
                    </Mobile>
                </div>
                <Desktop>
                        <iframe style={{
                            borderRadius: '20px',
                            boxSizing: 'border-box',
                        }}
                        width="50%" height="400px" src="https://www.youtube.com/embed/gPYgx8FGty4" title="HKBP Purwakarta Ressort Purwakarta Istimewa Menjadi Berkat Bagi Dunia." frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                </Desktop>
            </div>

            <div className={styles.header}>
                <Desktop>
                    <Typography variant='h4' sx={[legend, {mt: 10, textDecoration: 'underline', fontFamily: 'Poppins'}]}>
                        Jadwal Ibadah
                    </Typography>
                </Desktop>
                <Mobile>
                    <Typography variant='h5' sx={[legend, {m: 2, textDecoration: 'underline', fontFamily: 'Poppins'}]}>
                        Jadwal Ibadah
                    </Typography>
                </Mobile>
            </div>

            <Desktop>
                <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    <div style={{width: '80%', padding: '20px', boxSizing: 'border-box'}}>
                        <JadwalKegiatan/>
                    </div>
                </div>
            </Desktop>

            <Mobile>
                <div style={{padding: '20px', boxSizing: 'border-box'}}>
                    <JadwalKegiatan/>
                </div>
            </Mobile>

            <Mobile>
                <div style={{
                    margin: '20px'
                }}>
                    <iframe style={{
                        borderRadius: '20px'
                    }} width="100%" height="300px" src="https://www.youtube.com/embed/gPYgx8FGty4" title="HKBP Purwakarta Ressort Purwakarta Istimewa Menjadi Berkat Bagi Dunia." frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
            </Mobile>

            <div className={styles.header}>
                <Desktop>
                    <Typography variant='h4' sx={[legend, {mt: 10, textDecoration: 'underline', fontFamily: 'Poppins'}]}>
                        Dokumen Terbaru
                    </Typography>
                </Desktop>
                <Mobile>
                    <Typography variant='h5' sx={[legend, {m: 2, textDecoration: 'underline', fontFamily: 'Poppins'}]}>
                        Dokumen Terbaru
                    </Typography>
                </Mobile>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {featured.map((document, index) => (
                    <div className={styles.pdf} key={document.documentName}>
                        <Typography
                        variant='body2' style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>
                            {document.documentName}
                        </Typography>
                        <div style={{
                            margin: 0, padding: 0, textDecoration: 'underline'
                        }}>
                            {formatDate(document.dateUploaded)}
                        </div>
                        
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                            <Button onClick={() => handleClickOpen(document._id, document.documentName, document.documentUrl)} variant='contained'>Lihat Dokumen</Button>
                            <Button onClick={() => handleDownloadFile(document.documentUrl, 'application/pdf', document.documentName)} variant='contained'>Unduh Dokumen</Button>
                        </div>
                    </div>
                ))}
            </div>
            <ModalCard
            directClose={true}
            title={
                <Fragment>
                    <Desktop>
                        <div style={{display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between'}}>
                            <span style={{fontSize: '15px'}}>{selectedDocument.documentName}</span>
                            <span style={{fontSize: '15px'}}>Jika dokumen gagal dibuka, silahkan unduh atau buka kembali.</span>
                        </div>
                    </Desktop>
                    <Mobile>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '5px'}}>
                            <span style={{fontSize: '15px'}}>Jika dokumen gagal dibuka, silahkan unduh atau buka kembali.</span>
                        </div>
                    </Mobile>
                </Fragment>
            } uri={selectedDocument.documentUri} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>

            <Loader open={loading}/>
        </div>
    )
}

const boxHeader = {
    width: '100%',
    padding: '50px',
    boxSizing: 'border-box',
    borderRadius: '20px'
}

const legend = {
    fontWeight: 'bold',
    letterSpacing: (isMobile) && '1px',
}