import { useState, useMemo } from "react";

export default function Parliament() {
  const [activeTab, setActiveTab] = useState("lok-sabha");
  const [selectedSeat, setSelectedSeat] = useState(null);

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto h-full flex flex-col relative z-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4DA3FF]/10 border border-[#4DA3FF]/30 rounded font-mono text-[10px] font-bold tracking-widest text-[#4DA3FF] mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#4DA3FF] shadow-[0_0_8px_#4DA3FF]"></div>
          MODULE S03
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          PARLIAMENT <span className="text-[#4DA3FF] text-shadow-glow-b drop-shadow-[0_0_12px_rgba(77,163,255,0.5)]">VISUALIZATION</span>
        </h1>
        <p className="text-muted text-sm md:text-base max-w-2xl">
          Explore the seating arrangement, party distribution, and power dynamics inside the 
          Lok Sabha and Rajya Sabha chambers.
        </p>
      </div>

      <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
        <button
          onClick={() => { setActiveTab("lok-sabha"); setSelectedSeat(null); }}
          className={`px-6 py-2.5 rounded-lg font-mono text-xs font-bold tracking-widest transition-all ${
            activeTab === "lok-sabha"
              ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(0,255,163,0.15)]"
              : "text-muted hover:text-white border border-transparent"
          }`}
        >
          LOK SABHA (543)
        </button>
        <button
          onClick={() => { setActiveTab("rajya-sabha"); setSelectedSeat(null); }}
          className={`px-6 py-2.5 rounded-lg font-mono text-xs font-bold tracking-widest transition-all ${
            activeTab === "rajya-sabha"
              ? "bg-secondary/10 text-secondary border border-secondary/30 shadow-[0_0_15px_rgba(255,122,0,0.15)]"
              : "text-muted hover:text-white border border-transparent"
          }`}
        >
          RAJYA SABHA (245)
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        {/* Chamber Visualization */}
        <div className="bg-card border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(77,163,255,0.05)_0%,transparent_60%)] pointer-events-none"></div>
          
          <ChamberSvg 
            type={activeTab} 
            onSeatClick={setSelectedSeat} 
            selectedSeatId={selectedSeat?.id}
          />

          <div className="mt-8 text-center">
            <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Speaker's Podium</div>
            <div className="w-24 h-2 bg-white/20 mx-auto rounded"></div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-4">
          {selectedSeat ? (
            <div className="bg-card border border-[#4DA3FF]/30 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#4DA3FF]/10 blur-xl rounded-full"></div>
              
              <div className="font-mono text-[10px] tracking-widest text-[#4DA3FF] mb-2 uppercase">Seat {selectedSeat.id}</div>
              <h3 className="font-sans text-xl font-bold text-white mb-1">{selectedSeat.mpName}</h3>
              <div className="text-sm text-muted mb-6">{selectedSeat.party}</div>
              
              <div className="space-y-3">
                <div>
                  <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Constituency</div>
                  <div className="text-sm font-medium">{selectedSeat.constituency}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">State</div>
                  <div className="text-sm font-medium">{selectedSeat.state}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Key Role</div>
                  <div className="text-sm font-medium text-white">{selectedSeat.role || "Member of Parliament"}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-white/5 rounded-xl p-6 text-center text-muted flex flex-col items-center justify-center h-48 border-dashed">
              <span className="font-mono text-xs tracking-widest mb-2">INTERACTIVE CHAMBER</span>
              <span className="text-sm">Click any seat in the visualization to view Member of Parliament details.</span>
            </div>
          )}

          {/* Party Legend */}
          <div className="bg-card border border-white/10 rounded-xl p-6 mt-auto">
            <h4 className="font-mono text-xs font-bold tracking-widest text-white mb-4 border-b border-white/10 pb-2">PARTY DISTRIBUTION (MOCK)</h4>
            <div className="space-y-3">
              <LegendRow color="#FF7A00" name="Ruling Coalition (NDA)" percent="54%" />
              <LegendRow color="#4DA3FF" name="Opposition Bloc (INDIA)" percent="42%" />
              <LegendRow color="#00FFA3" name="Non-Aligned/Others" percent="4%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, name, percent }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}></div>
        <span className="text-muted">{name}</span>
      </div>
      <span className="font-mono font-bold text-white">{percent}</span>
    </div>
  );
}

// Generate D3 semicircular parliament coordinates
function generateSeats(totalSeats) {
  const seats = [];
  const rows = 12;
  const radiusStep = 18;
  const startRadius = 60;
  
  let seatsAssigned = 0;
  
  for (let r = 0; r < rows; r++) {
    if (seatsAssigned >= totalSeats) break;
    
    // Distribute more seats to outer rows
    const seatsInThisRow = Math.min(
      Math.floor((totalSeats * (r + 3)) / 85), 
      totalSeats - seatsAssigned
    );
    
    const radius = startRadius + (r * radiusStep);
    
    for (let i = 0; i < seatsInThisRow; i++) {
      // Angle from PI to 0 (semicircle, left to right)
      const angle = Math.PI - (i / Math.max(1, seatsInThisRow - 1)) * Math.PI;
      
      const x = Math.cos(angle) * radius;
      const y = -Math.sin(angle) * radius; // Negative y because SVG y goes down
      
      // Assign mock parties (left = opposition, right = ruling)
      let partyType = "other";
      if (angle > Math.PI * 0.55) partyType = "opposition";
      if (angle < Math.PI * 0.45) partyType = "ruling";
      
      seats.push({
        id: `${r}-${i}`,
        x, y,
        partyType,
        angle,
        row: r
      });
      seatsAssigned++;
    }
  }
  
  return seats;
}

function ChamberSvg({ type, onSeatClick, selectedSeatId }) {
  const totalSeats = type === "lok-sabha" ? 543 : 245;
  
  // Memoize the seat generation so it doesn't recalculate on every hover
  const seats = useMemo(() => generateSeats(totalSeats), [totalSeats]);
  
  const getSeatColor = (partyType) => {
    switch(partyType) {
      case "ruling": return "#FF7A00";
      case "opposition": return "#4DA3FF";
      default: return "#00FFA3";
    }
  };

  const generateMockMP = (seat) => {
    return {
      id: seat.id,
      mpName: `Hon'ble Member ${seat.id.split('-')[1]}`,
      party: seat.partyType === "ruling" ? "Ruling Party / Coalition" : (seat.partyType === "opposition" ? "Principal Opposition" : "Independent / Other"),
      constituency: type === "lok-sabha" ? `Constituency ${seat.id}` : `State Assembly ${seat.id}`,
      state: "Example State",
      role: seat.row === 0 && seat.partyType === "ruling" ? "Cabinet Minister" : null
    };
  };

  return (
    <svg viewBox="-300 -250 600 300" className="w-full h-full max-h-[500px]" style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}>
      <g transform="translate(0, 40)">
        {seats.map((seat) => {
          const isSelected = selectedSeatId === seat.id;
          const color = getSeatColor(seat.partyType);
          
          return (
            <circle
              key={seat.id}
              cx={seat.x}
              cy={seat.y}
              r={isSelected ? 5 : 3.5}
              fill={color}
              opacity={isSelected ? 1 : 0.6}
              stroke={isSelected ? "#fff" : "none"}
              strokeWidth={1.5}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                filter: isSelected ? `drop-shadow(0 0 8px ${color})` : (seat.row < 2 && seat.partyType === 'ruling' ? `drop-shadow(0 0 4px ${color})` : 'none')
              }}
              onMouseEnter={(e) => {
                e.target.setAttribute('opacity', '1');
                e.target.setAttribute('r', '4.5');
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.target.setAttribute('opacity', '0.6');
                  e.target.setAttribute('r', '3.5');
                }
              }}
              onClick={() => onSeatClick(generateMockMP(seat))}
            />
          );
        })}
      </g>
    </svg>
  );
}
