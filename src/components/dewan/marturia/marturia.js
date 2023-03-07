import { Fragment, useCallback, useState } from 'react';
import ModalCard from "../modal";
import 'reactflow/dist/style.css';
import { useMarturiaStyles } from "./marturia.style";
import { Desktop, Mobile } from "../../../services/responsive";
import Loader from "../../../services/loader";
import Template from "../../template";

import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { Helmet } from "react-helmet-async";

import { Typography } from "@mui/material";

const initialNodes = [
    {
        id: '1',
        type: 'input',
        sourcePosition: 'bottom',
        data: { label: 'Dewan Marturia' },
        position: { x: 0, y: 0 },
    },
    {
        id: '2',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Seksi Ibadah - Musik' },
        position: { x: 200, y: 100 },
    },
    {
        id: '3',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Seksi Zending' },
        position: { x: -200, y: 100 },
    }
];

const initialEdges = [
    {
        id: 'h1',
        source: '1',
        type: 'straight',
        target: '2',
    },
    {
        id: 'h2',
        source: '1',
        type: 'straight',
        target: '3',
    }
];

export default function MarturiaIndex() {

    return(
        <Fragment>
            <Helmet>
                <title>Dewan Marturia</title>
            </Helmet>
            <Template body={<Marturia/>}/>
        </Fragment>
    )
}

function Marturia() {

    const styles = useMarturiaStyles()

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const [modal, setModal] = useState({
        title: '',
        desc: ''
    })

    const handleClickOpen = (id) => {
        setOpen(true);
        initialNodes.filter(item => item.id === id).map(item => {
            setModal({
                title: item.data.label,
                desc: ''
            })
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [nodes, _, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

    return(
        <div className={styles.root}>
            <div style={{
                textAlign: 'center',
            }}>
                <Desktop>
                    <Typography variant='h5' sx={{pt: 5, fontWeight: '800', fontFamily: 'Poppins'}}>
                        Dewan Marturia
                    </Typography>
                </Desktop>
                <Mobile>
                    <Typography variant='h5' sx={{m: 2, textDecoration: 'underline', fontFamily: 'Poppins'}}>
                        Dewan Marturia
                    </Typography>
                </Mobile>
            </div>

            <Desktop>
                <div className={styles.tagsContainer}>
                    <div style={flow}>
                        <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        fitView
                        autoPanOnNodeDrag
                        onNodeClick={(event, node) => {(node.id !== '1') && handleClickOpen(node.id)}}
                        style={{borderRadius: '30px'}}
                        ></ReactFlow>
                    </div>
                    
                </div>
            </Desktop>

            <Mobile>
                <div className={styles.tagsContainerMobile}>
                    <div style={flowMobile}>
                        <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        fitView
                        onNodeClick={(event, node) => {(node.id !== '1') && handleClickOpen(node.id)}}
                        autoPanOnNodeDrag
                        ></ReactFlow>
                    </div>
                </div>
            </Mobile>

            <ModalCard child={true} title={modal.title} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}>
                <Typography sx={{fontFamily: 'Poppins'}}>
                    Sedang dalam proses pembuatan.
                </Typography>
            </ModalCard>

            <Loader open={loading}/>
        </div>
    )
}

const flow = {
    display: 'inline-block',
    width: '100%',
    height: (typeof window !== "undefined") && window.innerHeight * 0.6,
    backgroundColor: '#ffffff',
    borderRadius: '30px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
}

const flowMobile = {
    display: 'inline-block',
    width: '100%',
    height: (typeof window !== "undefined") && window.innerHeight * 0.5,
}