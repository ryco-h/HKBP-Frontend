import * as React from 'react';
import { Fragment, useState } from "react";
import { useInformasiStyles, useJadwalKegiatanStyles } from "./informasi.style"
import Template from "../../template";

import { Desktop, Mobile } from "../../../services/responsive";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";
import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DoneIcon from '@mui/icons-material/Done';


export default function InformasiIndex() {
    return(
        <Fragment>
            <HelmetProvider>
                <Helmet prioritizeSeoTags>
                    <title>Informasi HKBP Purwakarta</title>
                    <meta name="title" content="Informasi HKBP Purwakarta"/>
                    <link rel="canonical" href="https://hkbppurwakarta.com/informasi" />
                    <meta name="description" content="Informasi mengenai daftar pelayan gereja, jadwal ibadah atau kebaktian dan kegiatan lainnya."/>
                    <meta name="keywords" content="Gereja, HKBP, HKBP Purwakarta, Jemaat, Ibadah, Pelayanan, Jadwal Ibadah, Jadwal, Kebaktian, Minggu, Live Streaming"/>
                    <meta name="robots" content="index, follow"/>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                    <meta name="language" content="Indonesia"/>
                    <meta name="revisit-after" content="1 days"/>
                    <meta name="author" content="HKBP Purwakarta"/>
                </Helmet>
            </HelmetProvider>
            <Template body={<Informasi/>}/>
        </Fragment>
    ) 
}

function Informasi() {

    const styles = useInformasiStyles()

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return(
        <div className={styles.root}>
            <Desktop>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
                    <Box sx={{ bgcolor: 'transparent', width: '80%'}}>
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{backgroundColor: '#373A41', color: 'white', borderRadius: '20px'}}
                        >
                            <Tab label="Jadwal Kegiatan" {...a11yProps(0)} />
                            <Tab label="Daftar Pelayan" {...a11yProps(1)} />
                        </Tabs>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <JadwalKegiatan/>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <Typography sx={{fontFamily: 'Poppins'}}>Sedang dalam proses.</Typography>
                            </TabPanel>
                        </SwipeableViews>
                    </Box>
                </div>
            </Desktop>
            <Mobile>
                <Box sx={{ width: '100%', p: 2, boxSizing: 'border-box' }}>
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{backgroundColor: '#373A41', color: 'white', borderRadius: '20px'}}
                    >
                        <Tab label="Jadwal Kegiatan" {...a11yProps(0)}/>
                        <Tab label="Daftar Pelayan" {...a11yProps(1)} />
                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <JadwalKegiatan/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <Typography sx={{fontFamily: 'Poppins'}}>Sedang dalam proses.</Typography>
                        </TabPanel>
                    </SwipeableViews>
                </Box>
            </Mobile>
        </div>
    )
}

function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1, pt: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
}

export function JadwalKegiatan(props) {

    const style = useJadwalKegiatanStyles()

    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isMobile = useMediaQuery({ maxWidth: 991 })

    const [selectedDay, setDay] = useState('Selasa')
    const days = [
        {
            day: 'Selasa',
            detail: [
                {
                    kegiatan: 'Pembinaan Calon Ketua',
                    waktu: '17 : 00'
                },
                {
                    kegiatan: 'PA Punguan Ina',
                    waktu: '18 : 00'
                },
                {
                    kegiatan: 
                    <span>
                        Partangiangan Pardihuta & Keluarga Parhalado 
                        <br/>
                        <strong>(1 x sebulan)</strong>
                    </span>,
                    waktu: '18 : 00'
                },
                {
                    kegiatan: 'Sermon Parhalado',
                    waktu: '19 : 30'
                }
            ]
        },
        {
            day: 'Rabu',
            detail: [
                {
                    kegiatan: 'Partangiangan Sektor',
                    waktu: '19 : 00'
                },
            ]
        },
        {
            day: 'Kamis',
            detail: [
                {
                    kegiatan: 'PA Punguan Ina Naomi',
                    waktu: '17 : 00'
                },
                {
                    kegiatan: 'PA Punguan Exaudi',
                    waktu: '19 : 30'
                }
            ]
        },
        {
            day: 'Jumat',
            detail: [
                {
                    kegiatan: 'PA Punguan Ina Maranatha',
                    waktu: '19 : 00'
                },
                {
                    kegiatan: 'PA Punguan Ama',
                    waktu: '19 : 00'
                },
                {
                    kegiatan: 'PA Punguan Ama Eben Ezer',
                    waktu: '19 : 30'
                }
            ]
        },
        {
            day: 'Sabtu',
            detail: [
                {
                    kegiatan: 'Sermon Guru Sekolah Minggu',
                    waktu: '17 : 00'
                },
                {
                    kegiatan: 'PA Pra-Remaja',
                    waktu: '17 : 00'
                },
                {
                    kegiatan: 'Parguru Malua',
                    waktu: '18 : 00'
                },
                {
                    kegiatan: 'PA Remaja',
                    waktu: '19 : 00'
                },
                {
                    kegiatan: 'PA Naposo Bulung',
                    waktu: '19 : 00'
                }
            ]
        }
    ]
    
    return(
        <div className={style.root}>
            <div style={(props.bodyStyle) && props.bodyStyle} className={style.body}>
                <div style={{padding: (isDesktop) ? '20px' : '5px'}} className={style.section}>
                    <Accordion sx={accordion}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={style.headTag}
                        >
                            <Typography variant={(isDesktop && 'h5')} sx={title}>
                                Jadwal Ibadah Minggu
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Poppins', fontSize: '20px', paddingLeft: '10px'}}>
                                <Typography sx={legend}>Ibadah Sekolah Minggu</Typography>
                                <Typography sx={legendChild}>07:00 WIB</Typography>

                                <Typography sx={legend}>Pagi</Typography>
                                <Box sx={flex}>
                                    <Typography sx={legendChild}>07:00 - 09:00 WIB</Typography>
                                    <Chip className="chip" size={(!isDesktop) ? "small" : "medium"} label='Live Streaming' deleteIcon={<DoneIcon />} onDelete={() => {}}/>
                                </Box>

                                <Typography sx={legend}>Siang</Typography>
                                <Box sx={flex}>
                                    <Typography sx={legendChild}>10:00 - 12:00 WIB</Typography>
                                    <Chip className="chip" size={(!isDesktop) ? "small" : "medium"} label='Live Streaming' deleteIcon={<DoneIcon />} onDelete={() => {}}/>
                                </Box>

                                <Typography sx={legend}>Sore</Typography>
                                <Typography sx={legendChild}>16:00 - 18:00 WIB</Typography>

                                <div>
                                    <Divider>
                                        <YouTubeIcon sx={{color: 'red', fontSize: (isDesktop) ? 50 : 30, mt: 1}}/>
                                    </Divider>
                                </div>
                                <Typography sx={legend}>Live Youtube</Typography>
                                <a href="https://www.youtube.com/@HKBPPURWAKARTA220" style={{
                                    textDecoration: 'none',
                                    fontFamily: 'Poppins',
                                    fontSize: '15px',
                                    padding: '10px',
                                    paddingLeft: '10px'
                                }}>@HKBPPURWAKARTA220</a>
                                
                                <Typography sx={legend}>Parguru Malua</Typography>
                                <Typography sx={legendChild}>14:00 WIB</Typography>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div style={{padding: (isDesktop) ? '20px' : '5px'}} className={style.section}>
                    <Accordion sx={accordion}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={style.headTag}
                        >
                            <Typography variant={(isDesktop && 'h5')} sx={title}>
                                Jadwal Kegiatan Harian
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div style={{display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Poppins'}}>
                                <FormControl fullWidth>
                                    <InputLabel id="label-hari">Hari</InputLabel>
                                    <Select
                                        labelId="label-hari"
                                        id="hari"
                                        value={selectedDay}
                                        label="Hari"
                                        onChange={(e) => setDay(e.target.value)}
                                    >
                                        {days.map(obj => (
                                            <MenuItem key={obj.day} value={obj.day}>{obj.day}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div style={{padding: (isDesktop) ? '20px' : '10px', marginTop: (isMobile) && '10px', boxSizing: 'border-box'}}>
                                    {
                                        days.filter(obj => obj.day === selectedDay)
                                        .map(obj => (
                                            obj.detail.map(act => (
                                                <Fragment key={act.kegiatan}>
                                                    <Desktop>
                                                        <Typography variant='body' sx={{display: 'flex', gap: '20px'}}>
                                                            <span style={{fontWeight: 'bold'}}>{act.waktu}</span>
                                                            <span>{act.kegiatan}</span>
                                                        </Typography>
                                                    </Desktop>

                                                    <Mobile>
                                                        <div style={{display: 'flex', flexDirection: 'column', marginBottom: '15px'}}>
                                                            <span style={{fontWeight: 'bold'}}>{act.waktu}</span>
                                                            <span style={{paddingLeft: '15px'}}>{act.kegiatan}</span>
                                                        </div>
                                                    </Mobile>
                                                </Fragment>
                                            ))
                                        ))
                                    }
                                </div>

                                <Typography variant='body2' sx={{fontFamily: 'Poppins'}}>
                                    *PA = Pendalaman Alkitab
                                </Typography>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export const JadwalIbadahMinggu = () => {
    
    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isMobile = useMediaQuery({ maxWidth: 991 })

    return(
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Poppins', fontSize: '20px', paddingLeft: '10px'}}>
            <Typography sx={legend}>Ibadah Sekolah Minggu</Typography>
            <Typography sx={legendChild}>07:00 WIB</Typography>

            <Typography sx={legend}>Pagi</Typography>
            <Box sx={flex}>
                <Typography sx={legendChild}>07:00 - 09:00 WIB</Typography>
                <Chip className="chip" size={(!isDesktop) ? "small" : "medium"} label='Live Streaming' deleteIcon={<DoneIcon />} onDelete={() => {}}/>
            </Box>

            <Typography sx={legend}>Siang</Typography>
            <Box sx={flex}>
                <Typography sx={legendChild}>10:00 - 12:00 WIB</Typography>
                <Chip className="chip" size={(!isDesktop) ? "small" : "medium"} label='Live Streaming' deleteIcon={<DoneIcon />} onDelete={() => {}}/>
            </Box>

            <Typography sx={legend}>Sore</Typography>
            <Typography sx={legendChild}>16:00 - 18:00 WIB</Typography>

            <div>
                <Divider>
                    <YouTubeIcon sx={{color: 'red', fontSize: (isDesktop) ? 50 : 30, mt: 1}}/>
                </Divider>
            </div>
            <Typography sx={legend}>Live Youtube</Typography>
            <a href="https://www.youtube.com/@HKBPPURWAKARTA220" style={{
                textDecoration: 'none',
                fontFamily: 'Poppins',
                fontSize: '15px',
                padding: '10px',
                paddingLeft: '10px'
            }}>@HKBPPURWAKARTA220</a>
            
            <Typography sx={legend}>Parguru Malua</Typography>
            <Typography sx={legendChild}>14:00 WIB</Typography>
        </div>
    )
}

export const JadwalKegiatanLain = () => {

    const isDesktop = useMediaQuery({ minWidth: 992 })
    const isMobile = useMediaQuery({ maxWidth: 991 })

    const [selectedDay, setDay] = useState('Selasa')
    const days = [
        {
            day: 'Selasa',
            detail: [
                {
                    kegiatan: 'Pembinaan Calon Ketua',
                    waktu: '17 : 00'
                },
                {
                    kegiatan: 'PA Punguan Ina',
                    waktu: '18 : 00'
                },
                {
                    kegiatan: 
                    <span>
                        Partangiangan Pardihuta & Keluarga Parhalado 
                        <br/>
                        <strong>(1 x sebulan)</strong>
                    </span>,
                    waktu: '18 : 00'
                },
                {
                    kegiatan: 'Sermon Parhalado',
                    waktu: '19 : 30'
                }
            ]
        },
        {
            day: 'Rabu',
            detail: [
                {
                    kegiatan: 'Partangiangan Sektor',
                    waktu: '19 : 00'
                },
            ]
        },
        {
            day: 'Kamis',
            detail: [
                {
                    kegiatan: 'PA Punguan Ina Naomi',
                    waktu: '17 : 00'
                },
                {
                    kegiatan: 'PA Punguan Exaudi',
                    waktu: '19 : 30'
                }
            ]
        },
        {
            day: 'Jumat',
            detail: [
                {
                    kegiatan: 'PA Punguan Ina Maranatha',
                    waktu: '19 : 00'
                },
                {
                    kegiatan: 'PA Punguan Ama',
                    waktu: '19 : 00'
                },
                {
                    kegiatan: 'PA Punguan Ama Eben Ezer',
                    waktu: '19 : 30'
                }
            ]
        },
        {
            day: 'Sabtu',
            detail: [
                {
                    kegiatan: 'Sermon Guru Sekolah Minggu',
                    waktu: '17 : 00'
                },
                {
                    kegiatan: 'PA Pra-Remaja',
                    waktu: '17 : 00'
                },
                {
                    kegiatan: 'Parguru Malua',
                    waktu: '18 : 00'
                },
                {
                    kegiatan: 'PA Remaja',
                    waktu: '19 : 00'
                },
                {
                    kegiatan: 'PA Naposo Bulung',
                    waktu: '19 : 00'
                }
            ]
        }
    ]

    return(
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'Poppins'}}>
            <FormControl fullWidth>
                <InputLabel id="label-hari">Hari</InputLabel>
                <Select
                    labelId="label-hari"
                    id="hari"
                    value={selectedDay}
                    label="Hari"
                    onChange={(e) => setDay(e.target.value)}
                >
                    {days.map(obj => (
                        <MenuItem key={obj.day} value={obj.day}>{obj.day}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div style={{padding: (isDesktop) ? '20px' : '10px', marginTop: (isMobile) && '10px', boxSizing: 'border-box'}}>
                {
                    days.filter(obj => obj.day === selectedDay)
                    .map(obj => (
                        obj.detail.map(act => (
                            <Fragment key={act.kegiatan}>
                                <Desktop>
                                    <Typography variant='body' sx={{display: 'flex', gap: '20px'}}>
                                        <span style={{fontWeight: 'bold'}}>{act.waktu}</span>
                                        <span>{act.kegiatan}</span>
                                    </Typography>
                                </Desktop>

                                <Mobile>
                                    <div style={{display: 'flex', flexDirection: 'column', marginBottom: '15px'}}>
                                        <span style={{fontWeight: 'bold'}}>{act.waktu}</span>
                                        <span style={{paddingLeft: '15px'}}>{act.kegiatan}</span>
                                    </div>
                                </Mobile>
                            </Fragment>
                        ))
                    ))
                }
            </div>

            <Typography variant='body2' sx={{fontFamily: 'Poppins'}}>
                *PA = Pendalaman Alkitab
            </Typography>
        </div>
    )
}

const accordion = {
    border: 'none',
    bgcolor: 'transparent',
    boxShadow: 'none'
}

const title = {
    fontFamily: 'Poppins',
    fontWeight: 'bold'
}

const legend = {
    fontFamily: 'Poppins',
    fontSize: '20px',
    fontWeight: 'bold'
}

const legendChild = {
    fontFamily: 'Poppins',
    fontSize: '15px',
    padding: '10px',
    paddingLeft: '10px'
}

const flex = {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',   
    alignItems: 'center',
    '& .chip': {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#373A41',
            color: 'white'
        }
    }
}