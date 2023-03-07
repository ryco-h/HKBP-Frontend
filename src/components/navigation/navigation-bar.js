import { Fragment, useState } from 'react';
import { useNavigationStyles } from "./navigation.style"
import './navigation.css'
import logo from '../../media/logo.png'

import { Desktop, Mobile } from '../../services/responsive'

import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { Box, Drawer, IconButton, List, ListItemButton, ListItemText, ListSubheader, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';



export default function NavigationBar() {

    const styles = useNavigationStyles()

    const [openEx, setOpenEx] = useState({});

    const handleClick = (id) => {
        setOpenEx((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    const [open, setOpen] = useState(false)
    const menu = [
        {
            name: 'Halaman Utama',
            to: '/'
        },
        {
            name: 'Dokumen Ibadah',
            child: [
                {
                    name: 'Tata Ibadah',
                    to: '/tata-ibadah'
                },
                {
                    name: 'Acara Ibadah',
                    to: '/acara-ibadah'
                },
                {
                    name: 'Ibadah Khusus',
                    to: '/ibadah-khusus'
                }
            ]
        },
        {
            name: 'Dewan',
            child: [
                {
                    name: 'Koinonia',
                    to: '/dewan/koinonia'
                },
                {
                    name: 'Diakonia',
                    to: '/dewan/diakonia'
                },
                {
                    name: 'Marturia',
                    to: '/dewan/marturia'
                }
            ]
        },
        {
            name: 'Profile',
            child: [
                {
                    name: 'Google Maps',
                    to: '/lokasi'
                },
                {
                    name: 'Sejarah',
                    to: '/sejarah'
                },
                {
                    name: 'Informasi Lainnya',
                    to: '/informasi'
                }
            ]
        }
    ]
    
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        setOpen(open)
    };

    const list = (listMenu) => {
        
        return (
            <Box
                sx={{ width: 250}}
                role="presentation"
                onKeyDown={toggleDrawer(false)}
            >
                <List
                sx={{ width: '100%', maxWidth: 360 }}
                component="nav"
                subheader={
                    <Link style={link} to={'/'}>
                        <ListSubheader component="div" id="nested-list-subheader" sx={{
                            bgcolor: 'white',
                            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                        }}>
                                HKBP Purwakarta
                        </ListSubheader>
                    </Link>
                }
                >
                    {listMenu.map((menu, index) => (
                        <Fragment key={menu.name}>
                            {(!menu.child) &&
                                <Link key={menu.to + index} style={link} to={menu.to}>
                                    <ListItemButton onClick={() => handleClick(menu.name)}>
                                        <ListItemText primary={menu.name} />
                                    </ListItemButton>
                                </Link>
                            }
                            {(menu.child) && 
                                <Fragment>
                                    <ListItemButton onClick={() => handleClick(menu.name)}>
                                        <ListItemText primary={menu.name} />
                                        {openEx[menu.name] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={openEx[menu.name]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {menu.child.map((menuc, index) => (
                                                <Link key={menuc.to + index} style={link} to={menuc.to}>
                                                    <ListItemButton sx={{ pl: 4 }} key={menuc.name}>
                                                        <ListItemText primary={menuc.name}/>
                                                    </ListItemButton>
                                                </Link>
                                            ))}
                                        </List>
                                    </Collapse>
                                </Fragment>
                            }
                        </Fragment>
                    ))}
                </List>
            </Box>
        );
    }

    return(
        <div className={styles.root}>
            <Desktop>
                <div className={styles.legendContainer}>
                    <Link to={'/'} style={link} className={styles.logoContainer}>
                        <div style={{width: 'auto'}}>
                            <img src={logo} style={{maxWidth: '50px'}}/>
                        </div>
                        <Typography className={'legend'} variant='h5' sx={legendTitle}>
                            HKBP Purwakarta
                        </Typography>
                    </Link>
                    
                    <div className={styles.menuContainer}>
                        {menu.map((item, index) => (
                            <Fragment key={item.name}>
                                {(item.child) && 
                                <div className='dropdown'>
                                    <div sx={legend} className='dropbtn'>{item.name}</div>
                                    <div className="dropdown-content">
                                    {item.child.map((child, indexc) => (
                                        <Link key={child.name} style={link} to={child.to}>
                                            {child.name}
                                        </Link>
                                    ))}
                                    </div>
                                </div>
                                }
                            </Fragment>
                        ))}
                    </div>
                </div>
            </Desktop>
            <Mobile>
                <div className={styles.legendContainerMobile}>
                    <IconButton onClick={toggleDrawer(true)} sx={{p: 1}}>
                        <MenuIcon fontSize='large'/>
                    </IconButton>
                    <Typography variant={(isMobile) ? 'h6' : 'h4'} sx={legendTitle}>
                        HKBP Purwakarta
                    </Typography>
                    <div style={{width: '10%'}}>
                        <img src={logo} width={'100%'}/>
                    </div>
                </div>

                <Drawer
                    anchor={'left'}
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{sx: {bgcolor: '#ececec'}}}
                >
                    {list(menu)}
                </Drawer>
            </Mobile>
        </div>
    )
}

const legendTitle = {
    fontWeight: 'bold',
    letterSpacing: (isMobile) && '1px',
    fontFamily: 'Poppins'
}

const legend = {
    fontWeight: 'bold',
    letterSpacing: (isMobile) && '1px',
    textAlign: 'center',
    fontFamily: 'Poppins'
}

const link = {
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'Poppins'
}