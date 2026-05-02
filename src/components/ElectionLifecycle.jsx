import { useState, useEffect, useRef } from "react";

const STEPS = [
  {
    id: "announce",
    phase: "ANNOUNCE",
    color: "green",
    title: "Announcement & MCC",
    duration: "Day 1",
    desc: "The Election Commission of India (ECI) announces the election schedule, activating the Model Code of Conduct (MCC) immediately. All government spending, transfers, and new policies are frozen. Political parties are notified of the schedule and key dates.",
    facts: [
      { label: "Activated By", val: "ECI Commissioner", cls: "green" },
      { label: "MCC Coverage", val: "All 36 States/UTs", cls: "blue" },
      { label: "Key Document", val: "Press Notification", cls: "" },
      { label: "Effect", val: "Govt. freeze begins", cls: "orange" },
    ],
    tags: [
      { cls: "green", label: "ECI ORDER" },
      { cls: "orange", label: "MCC ACTIVE" },
      { cls: "dim", label: "SCHEDULE FIXED" },
      { cls: "dim", label: "GAZETTE NOTIFIED" },
    ],
    ask: "What is the Model Code of Conduct and what does it prohibit?",
  },
  {
    id: "nominate",
    phase: "NOMINATE",
    color: "orange",
    title: "Nomination Phase",
    duration: "14 days",
    desc: "Candidates file nomination papers (Form 2B) with the Returning Officer. Nominations are scrutinised for eligibility — age, citizenship, criminal record disclosures. Candidates may withdraw within the withdrawal window. Final candidate list is published.",
    facts: [
      { label: "Form", val: "Form 2B", cls: "orange" },
      { label: "Security Deposit", val: "₹25,000 (Gen) / ₹12,500 (SC/ST)", cls: "" },
      { label: "Withdrawal", val: "Last date notified", cls: "blue" },
      { label: "Scrutiny By", val: "Returning Officer", cls: "green" },
    ],
    tags: [
      { cls: "orange", label: "FORM 2B" },
      { cls: "dim", label: "SCRUTINY" },
      { cls: "green", label: "AFFIDAVIT" },
      { cls: "dim", label: "DEPOSIT" },
    ],
    ask: "What are the eligibility rules to contest a Lok Sabha election?",
  },
  {
    id: "campaign",
    phase: "CAMPAIGN",
    color: "blue",
    title: "Campaign Period",
    duration: "~21 days",
    desc: "Parties and candidates campaign across constituencies. Strict spending limits apply — ₹95 lakh per Lok Sabha candidate. Rallies require police permission. The campaign formally ends 48 hours before polling (silence period), during which no canvassing is allowed.",
    facts: [
      { label: "Spending Limit", val: "₹95 Lakh (LS)", cls: "orange" },
      { label: "Silence Period", val: "48 hours before poll", cls: "blue" },
      { label: "Exit Polls", val: "Banned until last phase", cls: "" },
      { label: "Media Rules", val: "MCMC monitored", cls: "green" },
    ],
    tags: [
      { cls: "blue", label: "RALLIES" },
      { cls: "orange", label: "SPEND LIMIT" },
      { cls: "dim", label: "SILENCE PERIOD" },
      { cls: "green", label: "PAID NEWS WATCH" },
    ],
    ask: "What are the campaign spending limits and how are they enforced?",
  },
  {
    id: "vote",
    phase: "VOTE",
    color: "green",
    title: "Polling Day",
    duration: "1–7 days (phases)",
    desc: "Voters cast ballots via EVM (Electronic Voting Machine). VVPAT confirms the vote. Polling runs 7 AM–6 PM. Paramilitary forces are deployed. Lok Sabha 2024 ran across 7 phases over 44 days covering all 543 constituencies.",
    facts: [
      { label: "Machine", val: "EVM + VVPAT", cls: "green" },
      { label: "Hours", val: "7:00 AM – 6:00 PM", cls: "blue" },
      { label: "2024 Phases", val: "7 phases, 44 days", cls: "orange" },
      { label: "Booth Officers", val: "Presiding + Poll Officers", cls: "" },
    ],
    tags: [
      { cls: "green", label: "EVM" },
      { cls: "green", label: "VVPAT" },
      { cls: "blue", label: "CRPF DEPLOY" },
      { cls: "orange", label: "MOCK POLL" },
    ],
    ask: "How does the EVM and VVPAT system work to ensure fair voting?",
  },
  {
    id: "count",
    phase: "COUNT",
    color: "orange",
    title: "Vote Counting",
    duration: "1 day",
    desc: "Counting begins at 8 AM on the designated date. EVMs are opened round-by-round at counting centres. Postal ballots (armed forces, overseas) are counted first. Candidates and agents watch each round. Trends are published in real time on the ECI portal.",
    facts: [
      { label: "Starts", val: "8:00 AM", cls: "green" },
      { label: "Postal Ballots", val: "Counted first", cls: "blue" },
      { label: "Round System", val: "EVM tray-by-tray", cls: "orange" },
      { label: "ECI Portal", val: "Live results feed", cls: "" },
    ],
    tags: [
      { cls: "orange", label: "ROUND BY ROUND" },
      { cls: "green", label: "POSTAL FIRST" },
      { cls: "blue", label: "COUNTING AGENTS" },
      { cls: "dim", label: "STREAMED LIVE" },
    ],
    ask: "How are votes counted and what is the postal ballot process?",
  },
  {
    id: "result",
    phase: "RESULT",
    color: "blue",
    title: "Result & Certificate",
    duration: "Day of count",
    desc: "The winning candidate is declared by the Returning Officer once their lead is unassailable. The Certificate of Election is issued under Form 22. Losers who polled less than 1/6th of valid votes forfeit their security deposit. MCC is lifted after results.",
    facts: [
      { label: "Certificate", val: "Form 22", cls: "blue" },
      { label: "Deposit Forfeited", val: "< 1/6 votes", cls: "orange" },
      { label: "MCC Lifted", val: "After final result", cls: "green" },
      { label: "Oath Taking", val: "Before first session", cls: "" },
    ],
    tags: [
      { cls: "blue", label: "FORM 22" },
      { cls: "orange", label: "DEPOSIT RULE" },
      { cls: "green", label: "MCC LIFTED" },
      { cls: "dim", label: "OATH OF OFFICE" },
    ],
    ask: "What happens after a candidate wins — what is the oath-taking process?",
  },
];

const COLOR = {
  green: { bg: "rgba(0,255,163,0.1)", border: "rgba(0,255,163,0.35)", text: "#00FFA3" },
  orange: { bg: "rgba(255,122,0,0.1)", border: "rgba(255,122,0,0.35)", text: "#FF7A00" },
  blue: { bg: "rgba(77,163,255,0.1)", border: "rgba(77,163,255,0.35)", text: "#4DA3FF" },
  dim: { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", text: "#8B949E" },
};

function Tag({ cls, label }) {
  const c = COLOR[cls] || COLOR.dim;
  return (
    <span
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        borderRadius: 3,
        padding: "3px 8px",
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      {label}
    </span>
  );
}

function FactCard({ label, val, cls }) {
  const textColor = cls ? COLOR[cls]?.text : "#E6EDF3";
  return (
    <div
      style={{
        background: "#161c24",
        borderRadius: 6,
        padding: "10px 12px",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 8,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: "#8B949E",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: textColor }}>{val}</div>
    </div>
  );
}

function StepCard({ step, index, isActive, isDone, onClick }) {
  const c = COLOR[step.color];
  return (
    <div style={{ display: "flex", gap: 0, position: "relative", paddingLeft: 52 }}>
      {/* Dot */}
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 18,
          width: 28,
          height: 28,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `2px solid ${isActive ? c.text : isDone ? "rgba(0,255,163,0.4)" : "rgba(255,255,255,0.08)"}`,
          background: isActive ? c.bg : "#0B0F14",
          boxShadow: isActive ? `0 0 0 4px ${c.bg}` : "none",
          transition: "all 0.3s",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 9,
            fontWeight: 700,
            color: isActive ? c.text : isDone ? "rgba(0,255,163,0.6)" : "#8B949E",
          }}
        >
          {index + 1}
        </span>
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1,
          margin: "8px 0",
          background: isActive ? (step.color === "green" ? "#0c1a12" : step.color === "orange" ? "#1a110a" : "#0a1220") : "#11161C",
          border: `1px solid ${isActive ? c.border : "rgba(255,255,255,0.05)"}`,
          borderRadius: 10,
          overflow: "hidden",
          transition: "all 0.3s",
        }}
      >
        {/* Header */}
        <div
          onClick={onClick}
          style={{
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                color: c.text,
                borderRadius: 3,
                padding: "3px 8px",
                fontFamily: "'Space Mono', monospace",
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              {step.phase}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                color: isActive ? c.text : "#E6EDF3",
                transition: "color 0.3s",
              }}
            >
              {step.title}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#8B949E", whiteSpace: "nowrap" }}>
              {step.duration}
            </span>
            <span style={{ fontSize: 10, color: isActive ? c.text : "#8B949E", transition: "transform 0.3s", display: "inline-block", transform: isActive ? "rotate(180deg)" : "none" }}>
              ▲
            </span>
          </div>
        </div>

        {/* Expandable Body */}
        {isActive && (
          <div style={{ padding: "0 18px 18px" }}>
            <p
              style={{
                fontSize: 13,
                color: "#8B949E",
                lineHeight: 1.7,
                marginBottom: 14,
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: 14,
              }}
            >
              {step.desc}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              {step.facts.map((f, i) => (
                <FactCard key={i} {...f} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {step.tags.map((t, i) => (
                <Tag key={i} {...t} />
              ))}
            </div>
            <button
              onClick={() => alert(`Ask MATDATA: ${step.ask}`)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 6,
                background: "rgba(77,163,255,0.08)",
                border: "1px solid rgba(77,163,255,0.2)",
                color: "#4DA3FF",
                fontFamily: "'Space Mono', monospace",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 1,
                cursor: "pointer",
              }}
            >
              ▶ Ask MATDATA: {step.ask.substring(0, 42)}...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ElectionLifecycle() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setActive((prev) => {
          if (prev >= STEPS.length - 1) {
            setPlaying(false);
            clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 2800);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const progressPct = ((active + 1) / STEPS.length) * 100;

  return (
    <div style={{ background: "#0B0F14", color: "#E6EDF3", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ padding: "28px 32px 20px", borderBottom: "1px solid rgba(0,255,163,0.1)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,255,163,0.08)", border: "1px solid rgba(0,255,163,0.2)", borderRadius: 4, padding: "3px 10px", fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "#00FFA3", marginBottom: 10 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00FFA3", display: "inline-block" }} />
            MODULE S01
          </div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 20, fontWeight: 900, color: "#00FFA3", letterSpacing: 1 }}>
            ELECTION LIFECYCLE
          </div>
          <div style={{ fontSize: 12, color: "#8B949E", marginTop: 4 }}>
            6 phases from announcement to certificate — click any step or use auto-play
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => setPlaying((p) => !p)}
            style={{
              padding: "7px 16px",
              borderRadius: 5,
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 1.5,
              border: playing ? "1px solid rgba(255,122,0,0.3)" : "1px solid rgba(0,255,163,0.3)",
              background: playing ? "rgba(255,122,0,0.1)" : "rgba(0,255,163,0.08)",
              color: playing ? "#FF7A00" : "#00FFA3",
              cursor: "pointer",
            }}
          >
            {playing ? "⏸ PAUSE" : "▶ AUTO-PLAY"}
          </button>
          <button
            onClick={() => { setPlaying(false); setActive(0); }}
            style={{ padding: "7px 14px", borderRadius: 5, fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: 1, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#8B949E", cursor: "pointer" }}
          >
            RESET
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "20px 32px 0" }}>
        <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg,#00FFA3,#4DA3FF)", borderRadius: 2, transition: "width 0.5s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          {STEPS.map((s, i) => (
            <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: i === active ? "#00FFA3" : "#8B949E", letterSpacing: 0.5 }}>
              {s.phase}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: "24px 32px 0", position: "relative" }}>
        {/* Vertical rail */}
        <div style={{ position: "absolute", left: 45, top: 24, bottom: 0, width: 2, background: "rgba(255,255,255,0.05)", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 45, top: 24, width: 2, background: "linear-gradient(to bottom,#00FFA3,#4DA3FF)", borderRadius: 2, height: `${(active / (STEPS.length - 1)) * 100}%`, transition: "height 0.5s ease" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {STEPS.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              index={i}
              isActive={i === active}
              isDone={i < active}
              onClick={() => { setPlaying(false); setActive(i); }}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: 8 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700, color: "#00FFA3" }}>{active + 1} / {STEPS.length}</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#8B949E", letterSpacing: 1, marginTop: 2 }}>PHASE</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700, color: "#FF7A00" }}>~90</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#8B949E", letterSpacing: 1, marginTop: 2 }}>TOTAL DAYS</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 16, fontWeight: 700, color: "#4DA3FF" }}>6</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#8B949E", letterSpacing: 1, marginTop: 2 }}>PHASES</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            style={{ padding: "8px 18px", borderRadius: 6, fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: 1, cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#8B949E" }}
          >
            ← PREV
          </button>
          <button
            onClick={() => setActive((a) => Math.min(STEPS.length - 1, a + 1))}
            disabled={active === STEPS.length - 1}
            style={{ padding: "8px 18px", borderRadius: 6, fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: 1, cursor: active === STEPS.length - 1 ? "not-allowed" : "pointer", border: "1px solid rgba(0,255,163,0.3)", background: "rgba(0,255,163,0.1)", color: "#00FFA3", opacity: active === STEPS.length - 1 ? 0.3 : 1 }}
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
