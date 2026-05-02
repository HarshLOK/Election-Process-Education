import { useState } from "react";

const ELECTION_TYPES = [
  {
    id: "lok-sabha",
    name: "Lok Sabha",
    scope: "NATIONAL",
    scopeColor: "primary",
    seats: "543",
    term: "5 Years",
    voters: "Universal Adult Franchise",
    desc: "Direct elections to the lower house of India's bicameral Parliament.",
    system: "First Past The Post (FPTP)",
    eligibility: "Any Indian citizen aged 25+ can contest. Any citizen aged 18+ can vote.",
  },
  {
    id: "rajya-sabha",
    name: "Rajya Sabha",
    scope: "NATIONAL",
    scopeColor: "blue",
    seats: "245 (233 Elected, 12 Nominated)",
    term: "6 Years (1/3rd retire every 2 years)",
    voters: "Elected MLAs",
    desc: "Indirect elections to the upper house, representing states at the federal level.",
    system: "Proportional Representation with Single Transferable Vote (PR-STV)",
    eligibility: "Any Indian citizen aged 30+.",
  },
  {
    id: "vidhan-sabha",
    name: "State Assembly (Vidhan Sabha)",
    scope: "STATE",
    scopeColor: "secondary",
    seats: "Varies by State (e.g., UP 403, Goa 40)",
    term: "5 Years",
    voters: "Universal Adult Franchise",
    desc: "Direct elections for the state legislative assembly.",
    system: "First Past The Post (FPTP)",
    eligibility: "Any Indian citizen aged 25+ can contest. Any citizen aged 18+ can vote.",
  },
  {
    id: "panchayat",
    name: "Gram Panchayat",
    scope: "LOCAL",
    scopeColor: "accent",
    seats: "Ward Members + Sarpanch",
    term: "5 Years",
    voters: "Village Residents",
    desc: "Local self-government at the village level (3-tier system).",
    system: "First Past The Post (FPTP)",
    eligibility: "Age 21+ to contest.",
  },
  {
    id: "municipal",
    name: "Municipal Corporation",
    scope: "LOCAL",
    scopeColor: "accent",
    seats: "Ward Councillors + Mayor",
    term: "5 Years",
    voters: "City Residents",
    desc: "Urban local bodies managing city administration.",
    system: "First Past The Post (FPTP)",
    eligibility: "Age 21+ to contest.",
  },
  {
    id: "president",
    name: "Presidential",
    scope: "NATIONAL",
    scopeColor: "primary",
    seats: "1",
    term: "5 Years",
    voters: "Electoral College (MPs + MLAs)",
    desc: "Election for the Head of State of the Republic of India.",
    system: "Proportional Representation with Single Transferable Vote",
    eligibility: "Indian citizen aged 35+, qualified for Lok Sabha.",
  }
];

export default function ElectionTypes() {
  const [selectedId, setSelectedId] = useState(null);
  
  const selected = ELECTION_TYPES.find(t => t.id === selectedId);

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto h-full flex flex-col relative z-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 border border-secondary/30 rounded font-mono text-[10px] font-bold tracking-widest text-secondary mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#FF7A00]"></div>
          MODULE S02
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          ELECTION TYPES <span className="text-secondary text-shadow-glow-o drop-shadow-[0_0_12px_rgba(255,122,0,0.5)]">EXPLORER</span>
        </h1>
        <p className="text-muted text-sm md:text-base max-w-2xl">
          India conducts multiple types of elections at the National, State, and Local levels.
          Explore the systems, term lengths, and electorate for each type.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {ELECTION_TYPES.map(type => (
          <TypeCard key={type.id} type={type} onClick={() => setSelectedId(type.id)} />
        ))}
      </div>

      {/* Detail Slide-in Panel */}
      <div className={`fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#0B0F14]/95 backdrop-blur-xl border-l border-white/10 z-50 transform transition-transform duration-300 ease-out flex flex-col ${selected ? 'translate-x-0' : 'translate-x-full'}`}>
        {selected && (
          <>
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#11161C]">
              <div>
                <Badge scope={selected.scope} color={selected.scopeColor} />
                <h2 className="font-display text-2xl font-bold text-white mt-3">{selected.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedId(null)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <p className="text-sm text-muted leading-relaxed">
                {selected.desc}
              </p>
              
              <div className="space-y-4">
                <DetailRow label="Seats / Size" value={selected.seats} />
                <DetailRow label="Term Length" value={selected.term} />
                <DetailRow label="Who Votes?" value={selected.voters} />
                <DetailRow label="Voting System" value={selected.system} />
                <DetailRow label="Eligibility" value={selected.eligibility} />
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/10">
                <button className="w-full py-3 rounded bg-secondary/10 border border-secondary/30 text-secondary font-mono text-xs font-bold tracking-widest hover:bg-secondary/20 hover:shadow-[0_0_15px_rgba(255,122,0,0.2)] transition-all">
                  COMPARE SYSTEMS &rarr;
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Overlay when panel is open */}
      {selected && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

function TypeCard({ type, onClick }) {
  const colorStyles = {
    primary: "border-primary/30 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(0,255,163,0.15)]",
    secondary: "border-secondary/30 hover:border-secondary/60 hover:shadow-[0_0_20px_rgba(255,122,0,0.15)]",
    accent: "border-accent/30 hover:border-accent/60 hover:shadow-[0_0_20px_rgba(77,163,255,0.15)]",
    blue: "border-[#4DA3FF]/30 hover:border-[#4DA3FF]/60 hover:shadow-[0_0_20px_rgba(77,163,255,0.15)]"
  };

  return (
    <div 
      onClick={onClick}
      className={`p-6 border rounded-xl bg-card transition-all duration-300 cursor-pointer group relative overflow-hidden ${colorStyles[type.scopeColor]}`}
    >
      <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-current opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
      
      <Badge scope={type.scope} color={type.scopeColor} />
      
      <h3 className="font-sans text-xl font-bold text-white mt-4 mb-2">{type.name}</h3>
      <p className="text-sm text-muted line-clamp-2 mb-6">{type.desc}</p>
      
      <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono text-muted uppercase tracking-wider">Electorate</span>
          <span className="font-bold text-white truncate max-w-[60%] text-right">{type.voters}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono text-muted uppercase tracking-wider">Seats</span>
          <span className="font-bold text-white truncate max-w-[60%] text-right">{type.seats}</span>
        </div>
      </div>
    </div>
  );
}

function Badge({ scope, color }) {
  const colors = {
    primary: "text-primary bg-primary/10 border-primary/30",
    secondary: "text-secondary bg-secondary/10 border-secondary/30",
    accent: "text-accent bg-accent/10 border-accent/30",
    blue: "text-[#4DA3FF] bg-[#4DA3FF]/10 border-[#4DA3FF]/30"
  };
  
  return (
    <div className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 rounded border ${colors[color]}`}>
      {scope}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="p-3 bg-white/5 border border-white/5 rounded-lg">
      <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">{label}</div>
      <div className="font-sans text-sm text-white font-medium">{value}</div>
    </div>
  );
}
