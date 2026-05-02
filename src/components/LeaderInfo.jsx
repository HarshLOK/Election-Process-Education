import { useState } from 'react';
import { Search } from 'lucide-react';

const LEADERS = [
  {
    id: 1,
    name: "Narendra Modi",
    role: "Prime Minister",
    party: "NDA",
    color: "#FF7A00",
    constituency: "Varanasi, Uttar Pradesh",
    tenure: "2014 - Present",
    social: { followers: "96M", engagement: "High" }
  },
  {
    id: 2,
    name: "Rahul Gandhi",
    role: "Leader of Opposition",
    party: "INDIA",
    color: "#4DA3FF",
    constituency: "Rae Bareli, Uttar Pradesh",
    tenure: "2004 - Present",
    social: { followers: "25M", engagement: "High" }
  },
  {
    id: 3,
    name: "Amit Shah",
    role: "Minister of Home Affairs",
    party: "NDA",
    color: "#FF7A00",
    constituency: "Gandhinagar, Gujarat",
    tenure: "2019 - Present",
    social: { followers: "34M", engagement: "Medium" }
  },
  {
    id: 4,
    name: "Mallikarjun Kharge",
    role: "President, INC",
    party: "INDIA",
    color: "#4DA3FF",
    constituency: "Rajya Sabha (Karnataka)",
    tenure: "2021 - Present",
    social: { followers: "3M", engagement: "Medium" }
  },
  {
    id: 5,
    name: "Nitish Kumar",
    role: "Chief Minister",
    party: "NDA",
    color: "#FF7A00",
    constituency: "Bihar Legislative Council",
    tenure: "2015 - Present",
    social: { followers: "8M", engagement: "Low" }
  },
  {
    id: 6,
    name: "Mamata Banerjee",
    role: "Chief Minister",
    party: "INDIA",
    color: "#4DA3FF",
    constituency: "Bhabanipur, West Bengal",
    tenure: "2011 - Present",
    social: { followers: "7M", engagement: "High" }
  }
];

export default function LeaderInfo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParty, setFilterParty] = useState("ALL");

  const filteredLeaders = LEADERS.filter(leader => {
    const matchesSearch = leader.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          leader.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          leader.constituency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesParty = filterParty === "ALL" || leader.party === filterParty;
    return matchesSearch && matchesParty;
  });

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto flex flex-col relative z-10 h-full overflow-y-auto">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] font-bold tracking-widest text-muted mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></div>
          MODULE S08
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          LEADER <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">INFO SYSTEM</span>
        </h1>
        <p className="text-muted text-sm md:text-base max-w-2xl">
          Browse comprehensive profiles for MPs, MLAs, and key ministers. Filter by state, party, or search by name.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search leaders by name, role, or constituency..." 
            className="w-full bg-[#11161C] border border-white/10 text-white rounded-lg pl-10 pr-4 py-3 font-sans text-sm outline-none focus:border-white/30 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "NDA", "INDIA"].map(party => (
            <button
              key={party}
              onClick={() => setFilterParty(party)}
              className={`px-6 py-3 rounded-lg font-mono text-xs font-bold tracking-widest transition-all ${
                filterParty === party 
                  ? "bg-white/10 text-white border border-white/30" 
                  : "bg-transparent text-muted border border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {party}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
        {filteredLeaders.map(leader => (
          <div key={leader.id} className="bg-card border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/30 transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity" style={{ backgroundColor: leader.color }}></div>
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="font-mono text-[10px] font-bold tracking-widest px-2 py-1 rounded border" style={{ color: leader.color, borderColor: `${leader.color}50`, backgroundColor: `${leader.color}10` }}>
                {leader.party}
              </div>
            </div>
            
            <h3 className="font-display text-2xl font-bold text-white mb-1">{leader.name}</h3>
            <div className="text-white/70 font-mono text-xs font-bold tracking-widest uppercase mb-4">{leader.role}</div>
            
            <div className="space-y-3 mb-6 border-t border-white/5 pt-4">
              <div>
                <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Constituency / State</div>
                <div className="text-sm text-white">{leader.constituency}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Tenure</div>
                <div className="text-sm text-white">{leader.tenure}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-t border-white/5 pt-4">
              <div>
                <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Followers</div>
                <div className="text-sm font-bold text-white">{leader.social.followers}</div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Engagement</div>
                <div className="text-sm font-bold text-white">{leader.social.engagement}</div>
              </div>
            </div>
          </div>
        ))}
        {filteredLeaders.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted font-mono text-sm tracking-widest">
            NO LEADERS FOUND MATCHING YOUR CRITERIA
          </div>
        )}
      </div>
    </div>
  );
}
