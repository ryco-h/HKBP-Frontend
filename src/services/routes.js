import React from 'react';
import { Route, Routes } from "react-router-dom";
import NotFound from '../components/404';
import AdminIndex from "../components/admin/admin";
import AdminDashboardIndex from "../components/admin/dashboard/dashboard";
import DAcaraIbadahIndex from "../components/admin/dokumen/acara-ibadah";
import DIbadahKhususIndex from "../components/admin/dokumen/ibadah-khusus";
import DTataIbadahIndex from "../components/admin/dokumen/tata-ibadah";
import JadwalKegiatanIndex from "../components/admin/jadwal-kegiatan/jadwal-kegiatan";
import DiakoniaIndex from "../components/dewan/diakonia/diakonia";
import KoinoniaIndex from "../components/dewan/koinonia/koinonia";
import MarturiaIndex from "../components/dewan/marturia/marturia";
import AcaraIbadahIndex from "../components/dokumen/acara-ibadah/acara-ibadah";
import IbadahKhususIndex from "../components/dokumen/ibadah-khusus/ibadah-khusus";
import TataIbadahIndex from "../components/dokumen/tata-ibadah/tata-ibadah";
import HomepageIndex from "../components/homepage/homepage";
import HistoryIndex from '../components/profile/history/history';
import InformasiIndex from "../components/profile/informasi/informasi";
import LocationIndex from "../components/profile/location/location";

export default function Routers() {
    return(
        <Routes>
            <Route path='*' element={<NotFound/>}/>
            <Route path="/" element={<HomepageIndex/>}/>
            <Route path="/lokasi" element={<LocationIndex/>}/>
            <Route path="/sejarah" element={<HistoryIndex/>}/>
            <Route path="/informasi" element={<InformasiIndex/>}/>
            <Route path="/acara-ibadah" element={<AcaraIbadahIndex/>}/>
            <Route path="/acara-ibadah/:documentName" element={<AcaraIbadahIndex/>}/>
            <Route path="/tata-ibadah" element={<TataIbadahIndex/>}/>
            <Route path="/ibadah-khusus" element={<IbadahKhususIndex/>}/>
            <Route path="/dewan/koinonia" element={<KoinoniaIndex/>}/>
            <Route path="/dewan/diakonia" element={<DiakoniaIndex/>}/>
            <Route path="/dewan/marturia" element={<MarturiaIndex/>}/>
            <Route path="admin" element={<AdminIndex/>}>
                <Route path="dashboard" element={<AdminDashboardIndex/>}/>
                <Route path="dokumen/tata-ibadah" element={<DTataIbadahIndex/>}/>
                <Route path="dokumen/acara-ibadah" element={<DAcaraIbadahIndex/>}/>
                <Route path="dokumen/ibadah-khusus" element={<DIbadahKhususIndex/>}/>
                <Route path="informasi" element={<JadwalKegiatanIndex/>}/>
            </Route>
        </Routes>
    )
}