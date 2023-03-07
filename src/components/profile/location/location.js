import { Fragment, useEffect } from "react";
import { useLocationStyles } from "./location.style";
import Template from "../../template";

import { Desktop, Mobile } from "../../../services/responsive";
import useWindowDimensions from "../../../services/useWindowDimensions";

import { Helmet } from "react-helmet-async";
import { isMobile } from "react-device-detect";
import { Typography } from "@mui/material";

export default function LocationIndex() {

    return(
        <Fragment>
            <Helmet>
                <title>Lokasi</title>
            </Helmet>
            <Template body={<Location/>}/>
        </Fragment>
    )
}

function Location() {

    return (
    // Important! Always set the container height explicitly
    <div style={{ width: '100%' }}>
        <Desktop>
            <Typography variant="h5" sx={{m: 5, ml: 20, textAlign: 'left', ...legend}}>
                Lokasi Gereja HKBP Purwakarta
            </Typography>
        </Desktop>
        <Mobile>
            <Typography variant="h6" sx={{m: 3, textAlign: 'center', ...legend}}>
                Lokasi Gereja HKBP Purwakarta
            </Typography>
        </Mobile>
        <div>
            <CardMap/>
        </div>
    </div>
    );
}

function CardMap() {

    useEffect(() => {

        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=default';
        document.head.appendChild(script)

        return () => {
            document.head.removeChild(script);
        }
    }, [])

    const {width, height} = useWindowDimensions()

    useEffect(() => {

        window.initMap = initMap

        const scriptBody = document.createElement('script');
        scriptBody.defer = true
        scriptBody.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBXW4eB2rJKmKXrNrKcyHhpxumEg7ND-3I&callback=initMap';
        document.body.appendChild(scriptBody)

        return () => {
            document.body.removeChild(scriptBody);
        }
    }, [width > 992])

    function initMap() {

        const hkbp = { lat: -6.5174463094905315, lng: 107.45042329210436 };

        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 18,
          center: hkbp,
        });

        const marker = new window.google.maps.Marker({
          position: hkbp,
          map: map,
        });
    }

    const styles = useLocationStyles()

    return(
        <div className={styles.root}>
            <div className={styles.container}>
                <Desktop>
                    <div className={styles.cardContainer}>
                        <div className={styles.maps} id='map'></div>
                        <div style={{padding: '20px', marginLeft: '20px'}} className={`${styles.rightCard}`}>
                            <div>
                                <Typography variant='h6' sx={title}>Kontak Kami</Typography>
                                <Typography sx={desc}>0264201836</Typography>
                            </div>
                            <div>
                                <Typography variant='h6' sx={title}>Alamat</Typography>
                                <Typography sx={desc}>
                                    Jl. Veteran No.129, Ciseureuh, Kec. Purwakarta, Kabupaten Purwakarta, Jawa Barat 41118
                                </Typography>
                            </div>
                            <div>
                                <Typography variant='h6' sx={title}>Lihat kami melalui Google Maps</Typography>
                                <Typography sx={desc}>
                                    <a href="https://goo.gl/maps/me1my3ddDRVDYr7J9">HKBP Purwakarta</a>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Desktop>
                <Mobile>
                    <div className={styles.cardContainerMobile}>
                        <div className={styles.maps} id='map'></div>
                        <div style={{padding: '20px'}} className={styles.rightCard}>
                            <div>
                                <Typography sx={title}>Kontak Kami</Typography>
                                <Typography sx={desc}>0264201836</Typography>
                            </div>
                            <div>
                                <Typography sx={title}>Alamat</Typography>
                                <Typography sx={desc}>
                                    Jl. Veteran No.129, Ciseureuh, Kec. Purwakarta, Kabupaten Purwakarta, Jawa Barat 41118
                                </Typography>
                            </div>
                            <div>
                                <Typography sx={title}>Lihat kami melalui Google Maps</Typography>
                                <Typography sx={desc}>
                                    <a href="https://goo.gl/maps/me1my3ddDRVDYr7J9">HKBP Purwakarta</a>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Mobile>
            </div>
        </div>
    )
}

const legend = {
    fontWeight: 'bold',
    letterSpacing: (isMobile) && '1px',
}

const title = {
    fontWeight: 'bold',

}   

const desc = {
    color: '#00000080'
}

const flex = {
    display: 'flex',
    justifyContent :'center',
    alignItems: 'center'
}