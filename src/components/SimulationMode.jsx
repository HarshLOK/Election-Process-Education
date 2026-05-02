import { useState } from 'react';

const VOTER_SCENARIO = [
  {
    title: "Election Day Morning",
    text: "It's 7:00 AM on Polling Day. You want to cast your vote. What is your very first step before leaving home?",
    choices: [
      { text: "Head straight to the nearest polling booth.", type: "wrong", feedback: "Incorrect. You might go to the wrong booth or your name might be missing. Always check first!" },
      { text: "Check your name on the Electoral Roll online.", type: "correct", feedback: "Correct! Verifying your name and booth location on the ECI portal is the best first step." }
    ]
  },
  {
    title: "At the Polling Booth",
    text: "You reached the correct booth. The First Polling Officer asks for your identification. What do you provide?",
    choices: [
      { text: "My EPIC (Voter ID) or Aadhaar Card.", type: "correct", feedback: "Correct! The officer will verify your identity against the electoral roll." },
      { text: "Just tell them my name and address.", type: "wrong", feedback: "Incorrect. You must provide an ECI-approved photo ID document to vote." }
    ]
  },
  {
    title: "Inside the Voting Compartment",
    text: "Your finger is inked, and you are standing in front of the EVM (Electronic Voting Machine). How do you cast your vote?",
    choices: [
      { text: "Press the blue button next to your chosen candidate's symbol.", type: "correct", feedback: "Correct! A red light will glow next to the button, and a long beep will sound." },
      { text: "Select the candidate on the touch screen.", type: "wrong", feedback: "Incorrect. Indian EVMs use physical blue buttons, not touch screens." }
    ]
  },
  {
    title: "VVPAT Verification",
    text: "You've pressed the button on the EVM. What is the crucial final step before you leave the compartment?",
    choices: [
      { text: "Walk out and collect a receipt from the officer.", type: "wrong", feedback: "Incorrect. The VVPAT slip is not handed to you. It drops into a sealed box." },
      { text: "Look through the VVPAT window for 7 seconds to verify the printed slip.", type: "correct", feedback: "Correct! The Voter Verifiable Paper Audit Trail (VVPAT) lets you visually confirm your vote was recorded correctly." }
    ]
  }
];

const CANDIDATE_SCENARIO = [
  {
    title: "Filing Nominations",
    text: "You want to run for Lok Sabha. What is the first official step?",
    choices: [
      { text: "Start campaigning on social media immediately.", type: "wrong", feedback: "Incorrect. You must file official nomination papers first to be a recognized candidate." },
      { text: "Submit Form 2A along with an affidavit to the Returning Officer.", type: "correct", feedback: "Correct! Form 2A and the affidavit (Form 26) declaring assets and criminal records are mandatory." }
    ]
  },
  {
    title: "Campaign Financing",
    text: "Your campaign is gaining momentum. You receive a large cash donation of ₹30,000 from a supporter. What do you do?",
    choices: [
      { text: "Accept it and use it to print more banners.", type: "wrong", feedback: "Incorrect. ECI rules prohibit accepting anonymous cash donations over ₹2,000." },
      { text: "Refuse the cash and ask for a cheque or digital transfer.", type: "correct", feedback: "Correct! To maintain transparency, large donations must be traceable." }
    ]
  },
  {
    title: "The Silent Period",
    text: "It is 48 hours before polling begins. What action must you take?",
    choices: [
      { text: "Stop all public meetings, rallies, and loud campaigning.", type: "correct", feedback: "Correct! The 'Silent Period' allows voters to think peacefully without influence." },
      { text: "Hold one final massive rally to show strength.", type: "wrong", feedback: "Incorrect. This violates the Model Code of Conduct and can lead to disqualification." }
    ]
  },
  {
    title: "Results Day",
    text: "The counting is complete. You have won by a margin of 5,000 votes! What happens next?",
    choices: [
      { text: "Declare yourself the MP and march into Parliament.", type: "wrong", feedback: "Incorrect. You must wait for official certification." },
      { text: "Collect the Certificate of Election from the Returning Officer.", type: "correct", feedback: "Correct! Form 22 (Certificate of Election) is your official proof of victory." }
    ]
  }
];

export default function SimulationMode() {
  const [activeRole, setActiveRole] = useState(null); // 'voter' or 'candidate'
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const reset = () => {
    setActiveRole(null);
    setStep(0);
    setFeedback(null);
    setIsComplete(false);
  };

  const activeScenario = activeRole === 'candidate' ? CANDIDATE_SCENARIO : VOTER_SCENARIO;

  const handleChoice = (choice) => {
    setFeedback({ type: choice.type, text: choice.feedback });
    
    if (choice.type === 'correct') {
      setTimeout(() => {
        if (step < activeScenario.length - 1) {
          setStep(s => s + 1);
          setFeedback(null);
        } else {
          setIsComplete(true);
        }
      }, 2500);
    }
  };

  if (!activeRole) {
    return (
      <div className="p-8 md:p-12 max-w-7xl mx-auto h-full flex flex-col items-center justify-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded font-mono text-[10px] font-bold tracking-widest text-[#FF7A00] mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] shadow-[0_0_8px_#FF7A00]"></div>
          MODULE S06
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4 tracking-tight text-center">
          SIMULATION <span className="text-[#FF7A00] text-shadow-glow-o">MODE</span>
        </h1>
        <p className="text-muted mb-12 text-center max-w-lg">
          Experience the electoral process first-hand. Make decisions and see the consequences in real-time. Choose your path to begin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <button 
            onClick={() => setActiveRole('voter')}
            className="group p-8 rounded-2xl border border-primary/30 bg-card hover:bg-[#0c1a12] hover:border-primary/60 hover:shadow-[0_0_30px_rgba(0,255,163,0.15)] transition-all text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <div className="font-mono text-xs font-bold tracking-widest text-primary mb-2">PATH 01</div>
            <h2 className="font-sans text-3xl font-bold text-white mb-3">You are the Voter</h2>
            <p className="text-muted">Navigate polling day, EVMs, and VVPAT verification to successfully cast your ballot.</p>
          </button>
          
          <button 
            onClick={() => setActiveRole('candidate')}
            className="group p-8 rounded-2xl border border-secondary/30 bg-card hover:bg-[#1a0f0a] hover:border-secondary/60 hover:shadow-[0_0_30px_rgba(255,122,0,0.15)] transition-all text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
            <div className="font-mono text-xs font-bold tracking-widest text-secondary mb-2">PATH 02</div>
            <h2 className="font-sans text-3xl font-bold text-white mb-3">You are the Candidate</h2>
            <p className="text-muted">File nominations, manage campaign spending, and fight to win your constituency.</p>
          </button>
        </div>
      </div>
    );
  }

  const scenario = activeScenario[step];

  if (isComplete) {
    return (
      <div className="p-8 md:p-12 max-w-3xl mx-auto h-full flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full border-4 border-primary bg-primary/10 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,255,163,0.3)]">
          <span className="text-4xl">{activeRole === 'voter' ? '🗳️' : '🏆'}</span>
        </div>
        <h1 className="font-display text-4xl font-black text-white mb-4">SIMULATION COMPLETE!</h1>
        <p className="text-muted text-lg mb-8">
          {activeRole === 'voter' 
            ? "Congratulations. You successfully navigated the polling process, verified your identity, cast your vote correctly on the EVM, and verified the VVPAT slip. You are an informed voter!"
            : "Congratulations! You successfully filed your nomination, ran a clean campaign, respected the Model Code of Conduct, and won the election. You are now a Member of Parliament!"}
        </p>
        <button 
          onClick={reset}
          className="px-8 py-3 rounded bg-primary/10 border border-primary/30 text-primary font-mono text-sm font-bold tracking-widest hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(0,255,163,0.2)] transition-all"
        >
          RETURN TO MENU
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left Panel: Narrative */}
      <div className="w-1/2 p-12 flex flex-col justify-center border-r border-white/10 bg-[#0B0F14] relative">
        <div className="absolute top-8 left-12">
          <div className="font-mono text-xs font-bold tracking-widest text-muted mb-2">
            STEP {step + 1} OF {activeScenario.length}
          </div>
          <div className="flex gap-2">
            {activeScenario.map((_, i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-primary shadow-[0_0_8px_#00FFA3]' : 'bg-white/10'}`}></div>
            ))}
          </div>
        </div>
        
        <h2 className="font-display text-3xl font-black text-white mb-6 mt-12">{scenario.title}</h2>
        <p className="text-lg text-muted leading-relaxed mb-8">{scenario.text}</p>
        
        {feedback && (
          <div className={`p-4 rounded-lg border flex items-start gap-3 animate-fade-in ${
            feedback.type === 'correct' 
              ? 'bg-primary/10 border-primary/30 text-primary shadow-[0_0_20px_rgba(0,255,163,0.15)]' 
              : 'bg-secondary/10 border-secondary/30 text-secondary'
          }`}>
            <span className="text-xl">{feedback.type === 'correct' ? '✓' : '✕'}</span>
            <span className="font-medium text-sm mt-1 text-white">{feedback.text}</span>
          </div>
        )}
      </div>

      {/* Right Panel: Choices */}
      <div className="w-1/2 p-12 flex flex-col justify-center bg-[#11161C]">
        <h3 className="font-mono text-xs font-bold tracking-widest text-muted uppercase mb-6">Select your action:</h3>
        <div className="flex flex-col gap-4">
          {scenario.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(choice)}
              disabled={feedback && feedback.type === 'correct'}
              className={`p-6 text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-sans text-white text-lg ${
                feedback && feedback.type === 'correct' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
