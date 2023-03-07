import { forwardRef, Fragment, useState } from "react";
import { Desktop, Mobile } from '../../services/responsive';
import { useModalStyles } from './modal.styles';

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Link } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCard(props) {

    const styles = useModalStyles()
    
    return (
        <div>
            <Dialog
                fullScreen={(props.disableFs) ? false : true}
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={Transition}
                PaperProps={{style: {overflowY: 'none'}}}
            >
                {(props.child) && 
                    <AppBar sx={{ position: 'relative', bgcolor: 'white', color: 'black' }}>
                        <Toolbar>
                            <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {(props.title) ? props.title : ''}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                }
                <div style={{position: 'relative'}}>
                    {(props.children) ? 
                        <Fragment>
                            <Desktop>
                                <div style={{height: '100%', overflowY: 'auto'}}>
                                    {props.children}
                                </div> 
                            </Desktop>
                            <Mobile>
                                <div style={{height: `calc(${window.innerHeight}px - 50px)`, overflowY: 'auto'}}>
                                    {props.children}
                                </div> 
                            </Mobile>
                        </Fragment>
                    : 
                        <Fragment>
                            <Desktop>
                                <div className={styles.pdf}>
                                    <DocViewer documents={[{uri: props.uri}]} pluginRenderers={DocViewerRenderers}
                                    language={'id'}
                                    config={{
                                        header: {
                                            overrideComponent: () => MyHeader(props) 
                                        },
                                        csvDelimiter: ",", // "," as default,
                                        pdfZoom: {
                                            defaultZoom: 1, // 1 as default,
                                            zoomJump: 1, // 0.1 as default,
                                        },
                                    }}
                                    style={{minHeight: '100vh'}}
                                    />
                                </div>
                            </Desktop>
                            <Mobile>
                                <DocViewer language={'id'} documents={[{uri: props.uri}]} pluginRenderers={DocViewerRenderers}
                                theme={{
                                    tertiary: "#ffffff",
                                    disableThemeScrollbar: false,
                                }}
                                config={{
                                    header: {
                                        disableFileName: false,
                                        retainURLParams: false,
                                        overrideComponent: () => MyHeader(props) 
                                    },
                                    csvDelimiter: ",", // "," as default,
                                    pdfZoom: {
                                        defaultZoom: 1.3, // 1 as default,
                                        zoomJump: 1, // 0.1 as default,
                                    }
                                }}
                                style={{height: (!props.directClose) ? `${window.innerHeight}px` : `calc(${window.innerHeight}px - 50px)`, overflowY: 'scroll'}}
                                />
                            </Mobile>
                        </Fragment>
                    }
                </div>
            </Dialog>
        </div>
    );
}

const MyHeader = (props) => {

    return(
        <Fragment>
            <AppBar sx={{ position: 'relative', bgcolor: 'white', color: 'black' }}>
                <Toolbar>
                    {(props.directClose) ? 
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.handleClose}
                        aria-label="close"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    :
                    <Link to='/acara-ibadah' style={{textDecoration: 'none', color: 'black'}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    }
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {(props.title) ? props.title : ''}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}