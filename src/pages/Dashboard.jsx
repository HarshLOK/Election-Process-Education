import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto relative z-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded font-mono text-[10px] font-bold tracking-widest text-primary mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#00FFA3]"></div>
          LIVE STATUS
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          WELCOME TO <span className="text-primary text-shadow-glow-g drop-shadow-[0_0_12px_rgba(0,255,163,0.5)]">MATDATA</span>
        </h1>
        <p className="text-muted text-sm md:text-base max-w-2xl">
          India's first dark-futuristic, graph-driven, gamified election intelligence platform. 
          Your journey to becoming an informed citizen starts here.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="ACTIVE ELECTIONS" value="2" color="primary" />
        <StatCard label="TOTAL SEATS (LS)" value="543" color="accent" />
        <StatCard label="REGISTERED VOTERS" value="968M+" color="secondary" />
        <StatCard label="DAYS TO NEXT POLL" value="14" color="primary" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <h2 className="font-display text-xl font-bold border-b border-[rgba(0,255,163,0.12)] pb-3 mb-6 flex items-center gap-2">
            <span className="text-primary">YOUR</span> LEARNING JOURNEY
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <JourneyCard 
              phase="01" 
              title="Election Lifecycle" 
              desc="Understand the 6 phases from announcement to result certificate."
              link="/lifecycle"
              color="primary"
            />
            <JourneyCard 
              phase="02" 
              title="Election Types" 
              desc="Explore Lok Sabha, Rajya Sabha, State Assemblies and more."
              link="/types"
              color="secondary"
            />
            <JourneyCard 
              phase="03" 
              title="Parliament" 
              desc="Interactive visualization of seating and hierarchy."
              link="/parliament"
              color="accent"
            />
            <JourneyCard 
              phase="04" 
              title="Political Hierarchy" 
              desc="Explore the chain of command using a node graph."
              link="/hierarchy"
              color="primary"
            />
            <JourneyCard 
              phase="05" 
              title="Data Dashboard" 
              desc="Analytics, historical voter turnout, and vote share insights."
              link="/dashboard"
              color="secondary"
            />
            <JourneyCard 
              phase="06" 
              title="Simulation Mode" 
              desc="Interactive role-playing: You are the Voter."
              link="/simulation"
              color="accent"
            />
            <JourneyCard 
              phase="07" 
              title="Quiz Arena" 
              desc="Test your knowledge and earn civic badges."
              link="/quiz"
              color="primary"
            />
            <JourneyCard 
              phase="08" 
              title="Leader Info System" 
              desc="Profiles, roles, and stats for major political figures."
              link="/leaders"
              color="accent"
            />
          </div>
        </div>

        {/* Right Panel: Live Feed */}
        <div className="xl:col-span-1 flex flex-col gap-6">
          <div className="bg-card border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <h3 className="font-mono text-xs font-bold tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              LIVE FEED
            </h3>
            
            <div className="space-y-4">
              <div className="border-l-2 border-primary/50 pl-4 py-1">
                <div className="text-[10px] font-mono text-muted mb-1">2 HOURS AGO</div>
                <div className="text-sm text-white">Election Commission announces schedule for upcoming State Assemblies.</div>
              </div>
              <div className="border-l-2 border-secondary/50 pl-4 py-1">
                <div className="text-[10px] font-mono text-muted mb-1">5 HOURS AGO</div>
                <div className="text-sm text-white">Voter turnout recorded at 68.4% in Phase 2 of ongoing polls.</div>
              </div>
              <div className="border-l-2 border-[#4DA3FF]/50 pl-4 py-1">
                <div className="text-[10px] font-mono text-muted mb-1">1 DAY AGO</div>
                <div className="text-sm text-white">New guidelines issued for campaign financing and digital ads.</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0F14] border border-secondary/30 rounded-xl p-6 text-center">
            <div className="font-mono text-[10px] font-bold tracking-widest text-secondary mb-2">NEXT MAJOR ELECTION</div>
            <div className="font-display text-4xl font-black text-white mb-1">14 <span className="text-lg">DAYS</span></div>
            <div className="text-sm text-muted">State Assembly Polls</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    primary: "text-primary border-primary/20 bg-card",
    secondary: "text-secondary border-secondary/20 bg-card",
    accent: "text-accent border-accent/20 bg-card",
  };
  
  return (
    <div className={`p-5 border rounded-xl ${colors[color]} relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg`}>
      <div className="font-display text-2xl font-bold z-10 relative drop-shadow-md">{value}</div>
      <div className="font-mono text-[10px] text-muted tracking-wider mt-1 z-10 relative">{label}</div>
    </div>
  );
}

function JourneyCard({ phase, title, desc, link, color, disabled }) {
  const colorMap = {
    primary: { text: "text-primary", bg: "bg-primary/10", border: "border-primary/30", hover: "hover:border-primary/60 hover:shadow-[0_0_20px_rgba(0,255,163,0.15)]" },
    secondary: { text: "text-secondary", bg: "bg-secondary/10", border: "border-secondary/30", hover: "hover:border-secondary/60 hover:shadow-[0_0_20px_rgba(255,122,0,0.15)]" },
    accent: { text: "text-accent", bg: "bg-accent/10", border: "border-accent/30", hover: "hover:border-accent/60 hover:shadow-[0_0_20px_rgba(77,163,255,0.15)]" }
  };
  
  const c = colorMap[color];
  
  if (disabled) {
    return (
      <div className="p-6 border border-white/5 bg-white/5 rounded-xl opacity-60">
        <div className="font-mono text-xs text-muted font-bold tracking-widest mb-2">PHASE {phase}</div>
        <h3 className="font-sans text-lg font-bold text-white/50 mb-2">{title}</h3>
        <p className="text-sm text-muted/70 mb-6">{desc}</p>
        <div className="inline-flex font-mono text-[10px] font-bold text-muted bg-black/30 px-3 py-1.5 rounded">
          LOCKED
        </div>
      </div>
    );
  }

  return (
    <Link to={link} className={`block p-6 border rounded-xl bg-card transition-all duration-300 ${c.border} ${c.hover} group relative overflow-hidden`}>
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-current opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
      <div className={`font-mono text-xs font-bold tracking-widest mb-2 ${c.text}`}>PHASE {phase}</div>
      <h3 className="font-sans text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-muted mb-6">{desc}</p>
      <div className={`inline-flex items-center gap-2 font-mono text-xs font-bold ${c.text} ${c.bg} px-3 py-1.5 rounded transition-transform group-hover:translate-x-1`}>
        START MODULE &rarr;
      </div>
    </Link>
  );
}
