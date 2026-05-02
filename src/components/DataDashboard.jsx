import { useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, Legend
} from 'recharts';

const voteShareData = [
  { name: 'Ruling Coalition (NDA)', value: 43.3, color: '#FF7A00' },
  { name: 'Opposition Bloc (INDIA)', value: 41.6, color: '#4DA3FF' },
  { name: 'Others', value: 15.1, color: '#00FFA3' },
];

const turnoutData = [
  { year: '1999', turnout: 59.9 },
  { year: '2004', turnout: 58.0 },
  { year: '2009', turnout: 58.2 },
  { year: '2014', turnout: 66.4 },
  { year: '2019', turnout: 67.4 },
  { year: '2024', turnout: 65.7 },
];

const regionalData = [
  { region: 'North', nda: 45, india: 40, others: 15 },
  { region: 'South', nda: 25, india: 60, others: 15 },
  { region: 'East', nda: 35, india: 45, others: 20 },
  { region: 'West', nda: 55, india: 35, others: 10 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#11161C] border border-white/10 p-3 rounded-lg shadow-xl font-sans">
        <p className="text-white font-bold mb-2 text-sm">{label || payload[0].name}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color || entry.payload.color }} className="text-xs font-mono font-bold tracking-wider">
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DataDashboard() {
  const [activeElection, setActiveElection] = useState("2024 Lok Sabha");

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto flex flex-col relative z-10 h-full overflow-y-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] font-bold tracking-widest text-muted mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></div>
            MODULE S05
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
            ELECTION <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">DATA DASHBOARD</span>
          </h1>
          <p className="text-muted text-sm md:text-base max-w-2xl">
            Real-time analytics and historical visualization of voter turnout, 
            party vote shares, and regional swing dynamics.
          </p>
        </div>
        
        <select 
          className="bg-card border border-white/10 text-white rounded-lg px-4 py-2 font-mono text-sm tracking-widest outline-none focus:border-primary transition-colors"
          value={activeElection}
          onChange={(e) => setActiveElection(e.target.value)}
        >
          <option value="2024 Lok Sabha">2024 LOK SABHA</option>
          <option value="2019 Lok Sabha">2019 LOK SABHA</option>
          <option value="2014 Lok Sabha">2014 LOK SABHA</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Vote Share Donut Chart */}
        <div className="bg-card border border-white/10 rounded-2xl p-6 lg:col-span-1 flex flex-col">
          <h3 className="font-mono text-xs font-bold tracking-widest text-white mb-6 uppercase">National Vote Share</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={voteShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {voteShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} style={{ filter: `drop-shadow(0 0 8px ${entry.color}80)` }} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="font-display text-2xl font-bold text-white">100%</span>
              <span className="font-mono text-[10px] text-muted tracking-widest">VOTES CAST</span>
            </div>
          </div>
        </div>

        {/* Voter Turnout Trend */}
        <div className="bg-card border border-white/10 rounded-2xl p-6 lg:col-span-2 flex flex-col">
          <h3 className="font-mono text-xs font-bold tracking-widest text-white mb-6 uppercase">Historical Voter Turnout (%)</h3>
          <div className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={turnoutData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFA3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FFA3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="year" stroke="#8B949E" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#8B949E" fontSize={10} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="turnout" name="Turnout" stroke="#00FFA3" strokeWidth={3} fillOpacity={1} fill="url(#colorTurnout)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Swing Analysis */}
        <div className="bg-card border border-white/10 rounded-2xl p-6 flex flex-col">
          <h3 className="font-mono text-xs font-bold tracking-widest text-white mb-6 uppercase">Regional Seat Distribution (%)</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="region" type="category" stroke="#8B949E" fontSize={11} tickLine={false} axisLine={false} width={50} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: "'Space Mono', monospace", paddingTop: '10px' }} />
                <Bar dataKey="nda" name="NDA" stackId="a" fill="#FF7A00" radius={[0, 0, 0, 0]} />
                <Bar dataKey="india" name="INDIA" stackId="a" fill="#4DA3FF" radius={[0, 0, 0, 0]} />
                <Bar dataKey="others" name="Others" stackId="a" fill="#00FFA3" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-card border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
          <h3 className="font-mono text-xs font-bold tracking-widest text-white mb-6 uppercase">AI Insights Engine</h3>
          
          <div className="space-y-4 flex-1">
            <InsightRow 
              color="primary"
              title="Turnout Dip Recorded" 
              desc="The 2024 Lok Sabha elections saw a minor dip of 1.7% in overall voter turnout compared to 2019." 
            />
            <InsightRow 
              color="secondary"
              title="Regional Polarization" 
              desc="Data indicates strong regional clustering, with the NDA dominant in the North/West and INDIA alliance strong in the South." 
            />
            <InsightRow 
              color="accent"
              title="Rise of Regional Parties" 
              desc="Others accounted for 15.1% of the vote share, playing a crucial role in coalition formations." 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightRow({ title, desc, color }) {
  const colors = {
    primary: "border-primary/30 bg-primary/5",
    secondary: "border-secondary/30 bg-secondary/5",
    accent: "border-[#4DA3FF]/30 bg-[#4DA3FF]/5",
  };
  
  const textColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-[#4DA3FF]",
  };

  return (
    <div className={`p-4 border rounded-lg ${colors[color]}`}>
      <div className={`font-mono text-[10px] font-bold tracking-widest uppercase mb-1 ${textColors[color]}`}>{title}</div>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  );
}
