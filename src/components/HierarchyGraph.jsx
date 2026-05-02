import { useState, useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  applyNodeChanges, 
  applyEdgeChanges,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { 
    id: '1', 
    position: { x: 400, y: 50 }, 
    data: { role: 'PRIME MINISTER', holder: 'Narendra Modi', desc: 'Head of Government, leader of the executive branch.', level: 'l1' }, 
    type: 'custom'
  },
  { 
    id: '2', 
    position: { x: 200, y: 200 }, 
    data: { role: 'CABINET MINISTERS', holder: 'Home, Defence, Finance...', desc: 'Core executive team heading major ministries.', level: 'l2' }, 
    type: 'custom'
  },
  { 
    id: '3', 
    position: { x: 600, y: 200 }, 
    data: { role: 'MINISTERS OF STATE', holder: 'Independent Charge / Deputies', desc: 'Junior ministers assisting cabinet members.', level: 'l2' }, 
    type: 'custom'
  },
  { 
    id: '4', 
    position: { x: 400, y: 350 }, 
    data: { role: 'MEMBERS OF PARLIAMENT (MPs)', holder: '543 Lok Sabha + 245 Rajya Sabha', desc: 'Legislators at the federal level.', level: 'l3' }, 
    type: 'custom'
  },
  { 
    id: '5', 
    position: { x: 400, y: 500 }, 
    data: { role: 'MEMBERS OF LEGISLATIVE ASSEMBLY (MLAs)', holder: 'State Level Representatives', desc: 'Legislators at the state level (Vidhan Sabha).', level: 'l4' }, 
    type: 'custom'
  },
  { 
    id: '6', 
    position: { x: 200, y: 650 }, 
    data: { role: 'MUNICIPAL COUNCILLORS', holder: 'Urban Wards', desc: 'Urban local government representatives.', level: 'l5' }, 
    type: 'custom'
  },
  { 
    id: '7', 
    position: { x: 600, y: 650 }, 
    data: { role: 'GRAM PANCHAYAT MEMBERS', holder: 'Rural Wards (Sarpanch/Panch)', desc: 'Rural local government representatives.', level: 'l5' }, 
    type: 'custom'
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#00FFA3', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#4DA3FF', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#8B949E', strokeWidth: 1, strokeDasharray: '5,5' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#8B949E', strokeWidth: 1, strokeDasharray: '5,5' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#FF7A00', strokeWidth: 2 } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#8B949E', strokeWidth: 1 } },
  { id: 'e5-7', source: '5', target: '7', animated: true, style: { stroke: '#8B949E', strokeWidth: 1 } },
];

function CustomNode({ data }) {
  const getStyles = () => {
    switch(data.level) {
      case 'l1': return "bg-[#0c1a12] border-[#00FFA3] text-[#00FFA3] shadow-[0_0_24px_rgba(0,255,163,0.18)]";
      case 'l2': return "bg-[#0a1220] border-[#4DA3FF] text-[#4DA3FF] shadow-[0_0_24px_rgba(77,163,255,0.18)]";
      case 'l3': return "bg-[#1a110a] border-[#FF7A00] text-[#FF7A00] shadow-[0_0_24px_rgba(255,122,0,0.18)]";
      case 'l4': return "bg-[#11161C] border-[#8B949E] text-white";
      case 'l5': return "bg-[#0B0F14] border-white/20 text-muted";
      default: return "bg-[#11161C] border-[#8B949E] text-white";
    }
  };

  return (
    <div className={`px-5 py-3 rounded-xl border-2 min-w-[240px] text-center transition-transform hover:scale-105 cursor-pointer ${getStyles()}`}>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-none" />
      <div className="font-mono text-[10px] tracking-widest font-bold mb-1">{data.role}</div>
      <div className="font-sans text-sm font-medium text-white mb-2">{data.holder}</div>
      <div className="text-[10px] opacity-70 leading-tight">{data.desc}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-none" />
    </div>
  );
}

export default function HierarchyGraph() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  
  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-8 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded font-mono text-[10px] font-bold tracking-widest text-primary mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#00FFA3]"></div>
          MODULE S04
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight">
          POLITICAL <span className="text-primary text-shadow-glow-g">HIERARCHY GRAPH</span>
        </h1>
      </div>

      <div className="flex-1 relative border-t border-white/10 bg-[#0B0F14]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="dark"
        >
          <Background color="rgba(255,255,255,0.05)" gap={20} size={1} />
          <Controls className="!bg-[#11161C] !border-white/10 !fill-white" />
        </ReactFlow>

        {selectedNode && (
          <div className="absolute top-6 right-6 w-80 bg-[#11161C] border border-white/10 rounded-xl p-6 shadow-2xl z-10 animate-fade-in">
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-muted hover:text-white"
            >
              ✕
            </button>
            <div className="font-mono text-[10px] text-primary tracking-widest uppercase mb-1">Role Details</div>
            <h3 className="font-sans text-xl font-bold text-white mb-2">{selectedNode.data.role}</h3>
            <p className="text-sm text-muted mb-6">{selectedNode.data.desc}</p>
            
            <div className="space-y-3">
              <div className="bg-white/5 rounded p-3">
                <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Current Holder(s)</div>
                <div className="text-sm font-medium text-white">{selectedNode.data.holder}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
