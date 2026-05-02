import { useState } from 'react';

const QUIZ_QUESTIONS = [
  {
    level: 1,
    question: "What is the minimum voting age for a citizen of India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    correct: 1,
    fact: "The 61st Constitutional Amendment Act of 1988 lowered the voting age from 21 to 18 years."
  },
  {
    level: 2,
    question: "Which body conducts the elections to the Lok Sabha?",
    options: ["State Election Commission", "Supreme Court of India", "Election Commission of India", "Ministry of Home Affairs"],
    correct: 2,
    fact: "The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India."
  },
  {
    level: 3,
    question: "What does EVM stand for?",
    options: ["Election Voting Mechanism", "Electronic Voting Machine", "Electoral Verification Module", "Electronic Verification Machine"],
    correct: 1,
    fact: "EVMs were first used in 1982 in the Parur Assembly Constituency of Kerala on a limited basis."
  },
  {
    level: 4,
    question: "What does the NOTA option on the EVM allow a voter to do?",
    options: ["Vote for a proxy candidate", "Register a vote for 'None of the Above'", "Cancel their voter registration", "Request a paper ballot"],
    correct: 1,
    fact: "NOTA was introduced in India in 2013 following a Supreme Court directive to give voters the right to reject all candidates."
  },
  {
    level: 5,
    question: "Who elects the President of India?",
    options: ["Direct vote by citizens", "Only the Lok Sabha MPs", "An Electoral College of elected MPs and MLAs", "The Prime Minister and Cabinet"],
    correct: 2,
    fact: "The Electoral College consists of the elected members of both houses of Parliament and the elected members of the Legislative Assemblies of States and UTs."
  },
  {
    level: 6,
    question: "What is the maximum strength of the Lok Sabha allowed by the Constitution?",
    options: ["500", "545", "550", "552"],
    correct: 2,
    fact: "The maximum strength of the Lok Sabha is 550 members (530 from States, 20 from UTs). It was 552 before the Anglo-Indian reserved seats were abolished."
  },
  {
    level: 7,
    question: "Which Constitutional Amendment added the Anti-Defection Law?",
    options: ["42nd Amendment", "44th Amendment", "52nd Amendment", "73rd Amendment"],
    correct: 2,
    fact: "The 52nd Amendment (1985) added the Tenth Schedule to prevent political defections driven by the lure of office or material benefits."
  },
  {
    level: 8,
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["The Prime Minister", "The President of India", "Chief Justice of India", "Parliament"],
    correct: 1,
    fact: "The President appoints the Chief Election Commissioner, currently advised by a committee comprising the PM, Leader of Opposition, and a Union Cabinet Minister."
  },
  {
    level: 9,
    question: "What is the security deposit for a candidate contesting a Lok Sabha election?",
    options: ["₹10,000", "₹15,000", "₹25,000", "₹50,000"],
    correct: 2,
    fact: "The security deposit is ₹25,000 for general candidates and ₹12,500 for SC/ST candidates. It is forfeited if the candidate fails to get 1/6th of valid votes."
  },
  {
    level: 10,
    question: "Under which Article of the Constitution is the Election Commission established?",
    options: ["Article 280", "Article 315", "Article 324", "Article 356"],
    correct: 2,
    fact: "Article 324 vests the superintendence, direction, and control of elections in the Election Commission."
  }
];

export default function QuizArena() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const question = QUIZ_QUESTIONS[currentLevel];

  const handleSelect = (idx) => {
    if (isAnswered) return;
    
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === question.correct) {
      setScore(s => s + 1);
      setXp(x => x + 50);
    }
  };

  const handleNext = () => {
    if (currentLevel < QUIZ_QUESTIONS.length - 1) {
      setCurrentLevel(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
    }
  };

  const restart = () => {
    setCurrentLevel(0);
    setScore(0);
    setXp(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="font-mono text-xs font-bold tracking-widest text-[#00FFA3] mb-4">CERTIFICATION COMPLETE</div>
        <h1 className="font-display text-5xl font-black text-white mb-2">YOU SCORED {score}/{QUIZ_QUESTIONS.length}</h1>
        <div className="text-2xl font-mono font-bold text-[#4DA3FF] mb-8">+{xp} XP EARNED</div>
        
        <div className="p-8 bg-card border border-[#00FFA3]/30 rounded-2xl max-w-md w-full mb-8 shadow-[0_0_30px_rgba(0,255,163,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FFA3]/10 rounded-full blur-3xl"></div>
          <div className="text-6xl mb-4">🎖️</div>
          <h2 className="font-sans text-2xl font-bold text-white mb-1">
            {score >= 9 ? 'Supreme Elector' : score >= 6 ? 'Informed Citizen' : 'Novice Voter'}
          </h2>
          <p className="text-muted text-sm">Badge unlocked and added to your profile.</p>
        </div>

        <button 
          onClick={restart}
          className="px-8 py-3 rounded bg-white/5 border border-white/20 text-white font-mono text-sm font-bold tracking-widest hover:bg-white/10 transition-all"
        >
          PLAY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto h-full flex flex-col relative z-10">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <div className="font-mono text-xs font-bold tracking-widest text-muted">LEVEL {question.level} OF 10</div>
          <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#4DA3FF]" style={{ width: `${(currentLevel / QUIZ_QUESTIONS.length) * 100}%` }}></div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-[#00FFA3] drop-shadow-[0_0_8px_rgba(0,255,163,0.5)]">{xp}</div>
          <div className="font-mono text-[10px] font-bold tracking-widest text-muted">TOTAL XP</div>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 leading-snug">
          {question.question}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((opt, idx) => {
            let btnClass = "border-white/10 bg-white/5 hover:bg-white/10 text-white";
            
            if (isAnswered) {
              if (idx === question.correct) {
                btnClass = "border-[#00FFA3] bg-[#00FFA3]/10 text-[#00FFA3] shadow-[0_0_20px_rgba(0,255,163,0.2)]";
              } else if (idx === selectedOption) {
                btnClass = "border-[#FF7A00] bg-[#FF7A00]/10 text-[#FF7A00]";
              } else {
                btnClass = "border-white/5 bg-transparent opacity-40 text-white";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`p-5 rounded-xl border text-left font-sans text-lg transition-all duration-300 ${btnClass}`}
              >
                <span className="font-mono text-xs tracking-widest mr-4 opacity-50">{String.fromCharCode(65 + idx)}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        <div className={`transition-all duration-500 overflow-hidden ${isAnswered ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`p-5 rounded-xl border flex items-start gap-4 ${selectedOption === question.correct ? 'bg-[#00FFA3]/5 border-[#00FFA3]/20' : 'bg-[#FF7A00]/5 border-[#FF7A00]/20'}`}>
            <div className={`text-2xl ${selectedOption === question.correct ? 'text-[#00FFA3]' : 'text-[#FF7A00]'}`}>
              {selectedOption === question.correct ? '✓' : '✕'}
            </div>
            <div>
              <div className="font-mono text-xs font-bold tracking-widest text-white mb-1 uppercase">
                {selectedOption === question.correct ? 'Correct Answer' : 'Incorrect'}
              </div>
              <p className="text-sm text-muted">{question.fact}</p>
            </div>
            <button 
              onClick={handleNext}
              className="ml-auto mt-2 px-6 py-2 rounded bg-white/10 border border-white/20 text-white font-mono text-xs font-bold tracking-widest hover:bg-white/20 transition-all whitespace-nowrap"
            >
              NEXT &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
