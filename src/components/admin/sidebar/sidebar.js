import { useState } from "react";
import { useSidebarMobileStyles } from "./sitebar.style";
import { Desktop, Mobile } from "../../../services/responsive";
import Loader from "../../../services/loader";
import mediaLogo from '../../../media/logo.png'

import { FcDocument } from 'react-icons/fc'
import { BsCalendarDateFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { MdSpaceDashboard } from 'react-icons/md'

import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

export default function SidebarComponent() {

    const styles = useSidebarMobileStyles()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleLogOut = () => {

        setLoading(true)

        localStorage.removeItem('access_token')

        window.alert('Berhasil keluar.')
        navigate('/admin')
    }
    
    const { toggleSidebar } = useProSidebar();

    const Menus = () => {
        return(
            <Menu>
                <MenuItem component={<Link to='/'/>} icon={<img src={mediaLogo} width={20} height='auto'/>}>Halaman Utama</MenuItem>
                <MenuItem component={<Link to='/admin/dashboard'/>} icon={<MdSpaceDashboard/>}>Dashboard</MenuItem>
                <SubMenu icon={<FcDocument/>} label='Dokumen'>
                    <MenuItem component={<Link to='/admin/dokumen/tata-ibadah'/>}>Tata Ibadah</MenuItem>
                    <MenuItem component={<Link to='/admin/dokumen/acara-ibadah'/>}>Acara Ibadah</MenuItem>
                    <MenuItem component={<Link to='/admin/dokumen/ibadah-khusus'/>}>Ibadah Khusus</MenuItem>
                </SubMenu>
                <MenuItem component={<Link to='/admin/jadwal-kegiatan'/>} icon={<BsCalendarDateFill/>}>Jadwal Kegiatan</MenuItem>
                <Desktop>
                    <MenuItem icon={<BiLogOut/>} onClick={() => handleLogOut()}>Keluar</MenuItem>
                </Desktop>
            </Menu>
        )
    }

    return(
        <div>
            <Desktop>
                <Sidebar
                backgroundColor="transparent"
                rootStyles={{
                    height: '60vh',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                }}>
                    <Menus/>
                </Sidebar>
            </Desktop>
            <Mobile>
                <div className={styles.mobile}>
                    <Sidebar
                    backgroundColor="white"
                    breakPoint="lg">
                        <Menus/>
                    </Sidebar>

                    <Button onClick={() => toggleSidebar()}>
                        <FiMenu fontSize={'30px'} color="#383383"/>
                    </Button>
                    <div onClick={() => handleLogOut()} className={styles.logout}>
                        Keluar
                        <BiLogOut fontSize={'20px'}/>
                    </div>
                </div>
            </Mobile>
            <Loader open={loading}/>
        </div>
    )
}