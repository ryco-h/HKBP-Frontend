import { Fragment, useCallback, useState } from 'react';
import { useDiakoniaStyles } from "./diakonia.style";
import { Desktop, Mobile } from "../../../services/responsive";
import Loader from "../../../services/loader";
import ModalCard from "../modal";
import Template from "../../template";

import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { Helmet } from "react-helmet-async";
import 'reactflow/dist/style.css';

import { Typography } from "@mui/material";

const initialNodes = [
    {
        id: '1',
        type: 'input',
        sourcePosition: 'bottom',
        data: { label: 'Dewan Diakonia' },
        position: { x: 0, y: 0 },
    },
    {
        id: '2',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Seksi Diakonia Sosial' },
        position: { x: 300, y: 100 },
    },
    {
        id: '3',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Seksi Pendidikan' },
        position: { x: 100, y: 100 },
    },
    {
        id: '4',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Seksi Kemasyarakatan' },
        position: { x: -100, y: 100 },
    },
    {
        id: '5',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Seksi Kesehatan' },
        position: { x: -300, y: 100 },
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
    },
    {
        id: 'h3',
        source: '1',
        type: 'straight',
        target: '4',
    },
    {
        id: 'h4',
        source: '1',
        type: 'straight',
        target: '5',
    }
];

export default function DiakoniaIndex() {

    return(
        <Fragment>
            <Helmet>
                <title>Dewan Diakonia</title>
            </Helmet>
            <Template body={<Diakonia/>}/>
        </Fragment>
    )
}

function Diakonia() {

    const styles = useDiakoniaStyles()

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
    const proOptions = { hideAttribution: true };

    return(
        <div className={styles.root}>
            <div style={{
                textAlign: 'center',
            }}>
                <Desktop>
                    <Typography variant='h5' sx={{pt: 5, fontWeight: '800', fontFamily: 'Poppins'}}>
                        Dewan Diakonia
                    </Typography>
                </Desktop>
                <Mobile>
                    <Typography variant='h5' sx={{m: 2, textDecoration: 'underline', fontFamily: 'Poppins'}}>
                        Dewan Diakonia
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
    // backgroundColor: 'red',
    backgroundColor: '#ffffff',
    borderRadius: '30px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
}

const flowMobile = {
    display: 'inline-block',
    width: '100%',
    height: (typeof window !== "undefined") && window.innerHeight * 0.5,
    // backgroundColor: 'red',
}