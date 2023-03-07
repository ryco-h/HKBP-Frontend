import folder from '../../media/fab/folder.png'
import file from '../../media/fab/file.png'

import { Accordion, AccordionDetails, AccordionSummary, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import HeightIcon from '@mui/icons-material/Height';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

export default function Fabs() {

    return(
        <List>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{fontWeight: 'bold', ...typography}}>Petunjuk Penggunaan Acara Ibadah</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ListItem sx={flexListItem}>
                        <img alt='' src={folder} width={'100%'}/>
                        <Typography sx={typography}>
                            <strong>1. </strong>Tekan salah 1 tanggal untuk melihat daftar dokumen
                        </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem sx={flexListItem}>
                        <img alt='' src={file} width={'100%'}/>
                        <ListItemText
                            secondary={
                                <span>
                                    Contoh: tekan pada <strong>
                                        Tingting Minggu 26 Februari 2023.pdf
                                    </strong>
                                </span>
                            }
                        >
                            <Typography sx={typography}>
                                <strong>2. </strong>Tekan pada dokumen/file yang ingin dibuka 
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem sx={flexListItem}>
                        <ListItemText>
                            <Typography sx={typography}>
                                <strong>3. </strong>Setelah itu akan terbuka tampilan dari dokumen yang telah dipilih
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{fontWeight: 'bold', ...typography}}>Petunjuk Penggunaan Dokumen</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <ListItem sx={flexListItemRow}>
                            <SkipNextIcon fontSize='large' sx={{backgroundColor: 'white', borderRadius: '50%', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}/>
                            <Typography sx={typography}>Tombol untuk berpindah ke halaman selanjutnya</Typography>
                        </ListItem>
                        <ListItem sx={flexListItemRow}>
                            <SkipPreviousIcon fontSize='large' sx={{backgroundColor: 'white', borderRadius: '50%', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}/>
                            <Typography sx={typography}>Tombol untuk berpindah ke halaman sebelumnya</Typography>
                        </ListItem>
                        <ListItem sx={flexListItemRow}>
                            <ZoomOutIcon fontSize='large' sx={{backgroundColor: 'white', borderRadius: '50%', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}/>
                            <Typography sx={typography}>Tombol untuk memperkecil layar dokumen</Typography>
                        </ListItem>
                        <ListItem sx={flexListItemRow}>
                            <ZoomInIcon fontSize='large' sx={{backgroundColor: 'white', borderRadius: '50%', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}/>
                            <Typography sx={typography}>Tombol untuk memperbesar layar dokumen</Typography>
                        </ListItem>
                        <ListItem sx={flexListItemRow}>
                            <ZoomOutMapIcon fontSize='large' sx={{backgroundColor: 'white', borderRadius: '50%', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}/>
                            <Typography sx={typography}>Tombol untuk mengembalikan ukuran layar dokumen</Typography>
                        </ListItem>
                        <ListItem sx={flexListItemRow}>
                            <HeightIcon fontSize='large' sx={{transform: 'rotate(90deg)', backgroundColor: 'white', borderRadius: '50%', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}/>
                            <ListItemText
                            primary={
                                <Typography sx={typography}>Tombol untuk melihat dokumen secara keseluruhan</Typography>
                            }
                            secondary={
                                <span>
                                    Geser layar ke atas setelah menekan tombol
                                </span>
                            }
                            ></ListItemText>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
        </List>
    )
}

const flexListItem = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',
    height: '100%'
}

const flexListItemRow = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    height: '100%'
}

const typography= {
    width: '100%',
    fontFamily: 'Poppins'
}