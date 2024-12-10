import React, { useCallback } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Controls, MiniMap, Background
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Run' } },
    { id: '2', position: { x: 50, y: 50 }, data: { label: 'Node 1' } },
    { id: '3', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
    { id: '4', position: { x: 100, y: 100 }, data: { label: 'Node 3' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function FlowEditor() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => {
            const updatedEdges = addEdge(params, edges);
            setEdges(updatedEdges);
            console.log('Edges after connect:', updatedEdges);
        },
        [edges, setEdges]
    );

    const handleNodesChange = useCallback(
        (changes) => {
            onNodesChange(changes);
            console.log('Nodes after change:', nodes);
        },
        [nodes, onNodesChange]
    );

    const handleEdgesChange = useCallback(
        (changes) => {
            onEdgesChange(changes);
            console.log('Edges after change:', edges);
        },
        [edges, onEdgesChange]
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                colorMode="dark"
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
