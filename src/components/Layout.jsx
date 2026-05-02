import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Milestone, Layers, Users, Network, BarChart3, Gamepad2, Award, UserCircle } from "lucide-react";

const NAV_ITEMS = [
  { id: "/", label: "Mission Control", icon: LayoutDashboard },
  { id: "/lifecycle", label: "Election Lifecycle", icon: Milestone },
  { id: "/types", label: "Election Types", icon: Layers },
  { id: "/parliament", label: "Parliament", icon: Users },
  { id: "/hierarchy", label: "Hierarchy Graph", icon: Network },
  { id: "/dashboard", label: "Data Dashboard", icon: BarChart3 },
  { id: "/simulation", label: "Simulation Mode", icon: Gamepad2 },
  { id: "/quiz", label: "Quiz Arena", icon: Award },
  { id: "/leaders", label: "Leader Info System", icon: UserCircle },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0B0F14] text-[#E6EDF3] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[rgba(0,255,163,0.12)] bg-[#0B0F14]/90 backdrop-blur flex flex-col z-10 shrink-0">
        <div className="p-6 border-b border-[rgba(0,255,163,0.12)]">
          <div className="font-display font-black text-xl text-primary tracking-widest text-shadow-glow-g">
            MATDATA
          </div>
          <div className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">
            Mission Control
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.id || (item.id !== "/" && location.pathname.startsWith(item.id));
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.id}
                aria-label={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-xs font-bold tracking-wide transition-all ${
                  active 
                    ? "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_12px_rgba(0,255,163,0.1)]" 
                    : "text-muted hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={16} className={active ? "text-primary" : "text-muted"} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[rgba(0,255,163,0.12)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-primary bg-primary/20 flex items-center justify-center shrink-0">
              <span className="font-mono text-xs font-bold text-primary">LV</span>
            </div>
            <div className="flex-1">
              <div className="font-mono text-[10px] font-bold text-primary">LEVEL 4 VOTER</div>
              <div className="w-full bg-white/10 h-1 rounded-full mt-1 overflow-hidden">
                <div className="bg-primary h-full w-[45%] shadow-[0_0_8px_#00FFA3]"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-[#0B0F14]">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,255,163,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <Outlet />
      </main>
    </div>
  );
}
