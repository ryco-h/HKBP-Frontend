import { Fragment, useState, useCallback } from "react";
import { useKoinoniaStyles } from "./koinonia.style";
import { Desktop, Mobile } from "../../../services/responsive";
import Loader from "../../../services/loader";
import ModalCard from "../modal";
import Template from "../../template";

import { Helmet } from "react-helmet-async";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

import { Typography } from "@mui/material";

const initialNodes = [
    {
        id: '1',
        sourcePosition: 'bottom',
        targetPosition: 'top',
        data: { label: 'Dewan Koinonia' },
        position: { x: 0, y: 0 },
    },
    {
        id: '2',
        sourcePosition: 'bottom',
        targetPosition: 'top',
        data: { label: 'Seksi Bapak' },
        position: { x: 300, y: 100 },
    },
    {
        id: '3',
        sourcePosition: 'bottom',
        targetPosition: 'top',
        data: { label: 'Seksi Perempuan' },
        position: { x: -300, y: 100 },
    },
    {
        id: 's4',
        type: 'input',
        sourcePosition: 'bottom',
        data: { label: 'Koor Gabungan Exaudi' },
        position: { x: 200, y: -100 },
    },
    {
        id: 's5',
        type: 'input',
        sourcePosition: 'bottom',
        data: { label: 'Seksi Lansia' },
        position: { x: -200, y: -100 },
    },
    {
        id: '4-2',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Koor Ama' },
        position: { x: 100, y: 200 },
    },
    {
        id: '5-2',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Koor Ama Huria' },
        position: { x: 300, y: 200 },
    },
    {
        id: '6-2',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Koor Ama Ebenezer' },
        position: { x: 500, y: 200 },
    },
    {
        id: '7-3',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Koor Ina Huria' },
        position: { x: -100, y: 200 },
    },
    {
        id: '8-3',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Koor Ina Maranatha' },
        position: { x: -300, y: 200 },
    },
    {
        id: '9-3',
        type: 'output',
        targetPosition: 'top',
        data: { label: 'Koor Ina Naomi' },
        position: { x: -500, y: 200 },
    },
];

const initialEdges = [
    {
        id: 'h1',
        source: '1',
        type: 'smoothstep',
        target: '2',
    },
    {
        id: 'h2',
        source: '1',
        type: 'smoothstep',
        target: '3',
    },
    {
        id: 'h3',
        source: '2',
        type: 'smoothstep',
        target: '4-2',
    },
    {
        id: 'h4',
        source: '2',
        type: 'smoothstep',
        target: '5-2',
    },
    {
        id: 'h5',
        source: '2',
        type: 'smoothstep',
        target: '6-2',
    },
    {
        id: 'h6',
        source: '3',
        type: 'smoothstep',
        target: '7-3',
    },
    {
        id: 'h7',
        source: '3',
        type: 'smoothstep',
        target: '8-3',
    },
    {
        id: 'h8',
        source: '3',
        type: 'smoothstep',
        target: '9-3',
    },
    {
        id: 'h9',
        source: 's4',
        type: 'straight',
        target: '1',
    },
    {
        id: 'h10',
        source: 's5',
        type: 'straight',
        target: '1',
    },
];


export default function KoinoniaIndex() {

    return(
        <Fragment>
            <Helmet>
                <title>Dewan Koinonia</title>
            </Helmet>
            <Template body={<Koinonia/>}/>
        </Fragment>
    )
}

function Koinonia() {

    const styles = useKoinoniaStyles()

    const [modal, setModal] = useState({
        title: '',
        desc: ''
    })

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

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
                // margin: '20px'
            }}>
                <Desktop>
                    <Typography variant='h5' sx={{pt: 5, fontWeight: '800', fontFamily: 'Poppins'}}>
                        Dewan Koinonia
                    </Typography>
                </Desktop>
                <Mobile>
                    <Typography variant='h5' sx={{m: 2, textDecoration: 'underline', fontFamily: 'Poppins'}}>
                        Dewan Koinonia
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
                        // panOnDrag={false}
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

const tag = {
    padding: '20px',
    backgroundColor: 'whitesmoke',
    borderRadius: '20px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    fontFamily: 'Itim',
    cursor: 'pointer'
}

const tagMobile = {
    padding: '20px',
    backgroundColor: 'whitesmoke',
    borderRadius: '20px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
    fontFamily: 'Itim',
    cursor: 'pointer'
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
    height: (typeof window !== "undefined") && window.innerHeight * 0.5
}