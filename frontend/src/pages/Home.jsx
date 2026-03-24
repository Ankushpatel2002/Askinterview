import { useState, useEffect, useRef } from "react";

const generateQuestion = async (field, usedQuestions = []) => {
  await new Promise(r => setTimeout(r, 800));
  const allQuestions = {
    python: [
      "Explain the difference between @staticmethod and @classmethod decorators. When would you use each?",
      "What is the GIL in Python and how does it affect multithreading performance?",
      "Explain Python's memory management and garbage collection mechanism.",
      "What are Python decorators? Write a simple logging decorator from scratch.",
      "Difference between deep copy and shallow copy in Python with examples.",
      "What are generators and how do they differ from regular functions?",
      "Explain list comprehension vs map/filter. When to use which?",
      "What is *args and **kwargs? Give practical examples of their usage.",
    ],
    django: [
      "How does Django's ORM handle N+1 query problems? Describe select_related vs prefetch_related.",
      "Explain Django middleware and how to write a custom middleware.",
      "What is the difference between ForeignKey, OneToOneField, and ManyToManyField?",
      "How does Django's authentication system work? Explain the request-response cycle.",
      "What are Django signals? Give a real-world use case.",
      "Explain Django REST Framework serializers and their validation process.",
      "How do you optimize database queries in Django for large datasets?",
      "What is Django's migration system and how does it track schema changes?",
    ],
    javascript: [
      "Explain event loop, call stack, and microtask queue in JavaScript.",
      "What is closure in JavaScript? Give a practical example.",
      "Explain the difference between var, let, and const with scope examples.",
      "What is event delegation and why is it useful in DOM manipulation?",
      "Explain Promises vs async/await. What are the advantages of each?",
      "What is prototypal inheritance in JavaScript?",
      "Explain the concept of hoisting in JavaScript with examples.",
      "What are WeakMap and WeakSet and when would you use them?",
    ],
    react: [
      "What is the difference between useMemo and useCallback? When should you use each?",
      "Explain React's reconciliation algorithm and how the virtual DOM works.",
      "What are React hooks rules and why do they exist?",
      "Explain the useReducer hook and when to prefer it over useState.",
      "What is React Context and what are its performance implications?",
      "How does React handle re-renders and how can you prevent unnecessary ones?",
      "Explain the difference between controlled and uncontrolled components.",
      "What is React.memo and when should you use it?",
    ],
  };

  const pool = allQuestions[field.toLowerCase()] || [
    `Explain a core concept in ${field} that demonstrates advanced understanding.`,
    `What are best practices in ${field} for large-scale applications?`,
    `Describe common pitfalls in ${field} and how to avoid them.`,
    `How do you handle error management in ${field}?`,
    `What are performance optimization techniques in ${field}?`,
  ];

  const unused = pool.filter(q => !usedQuestions.includes(q));
  const source = unused.length > 0 ? unused : pool;
  const question = source[Math.floor(Math.random() * source.length)];
  return { question };
};

const checkAnswer = async ({ question, answer, field, questionNumber }) => {
  await new Promise(r => setTimeout(r, 1000));
  const len = answer.trim().length;
  const score = len > 200 ? 88 + Math.floor(Math.random() * 10) :
                len > 100 ? 70 + Math.floor(Math.random() * 15) :
                            45 + Math.floor(Math.random() * 20);
  const passed = score >= 70;
  return {
    score,
    passed,
    result: `SCORE: ${score}/100   ${passed ? "✓ PASSED" : "✗ NEEDS WORK"}\n\n` +
      `STRENGTHS:\n→ ${len > 150 ? "Good detail and explanation depth" : "Attempted to answer the question"}\n` +
      `→ ${score > 80 ? "Strong technical terminology used" : "Basic concepts covered"}\n\n` +
      `IMPROVEMENTS:\n→ ${score < 90 ? "Expand on edge cases and exception handling" : "Consider adding real-world examples"}\n` +
      `→ ${score < 80 ? "Include code examples to demonstrate understanding" : "Mention performance considerations"}\n\n` +
      `VERDICT: ${passed ? "READY — Move to next question" : "REVIEW THIS TOPIC — Then continue"}`,
  };
};

const GlitchText = ({ text }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {text}
      {glitch && (
        <>
          <span style={{ position:"absolute",top:0,left:"2px",color:"#ff003c",clipPath:"polygon(0 30%,100% 30%,100% 50%,0 50%)",opacity:0.8 }}>{text}</span>
          <span style={{ position:"absolute",top:0,left:"-2px",color:"#00fff9",clipPath:"polygon(0 60%,100% 60%,100% 80%,0 80%)",opacity:0.8 }}>{text}</span>
        </>
      )}
    </span>
  );
};

const MatrixRain = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコ01ABCDEF<>{}[]()".split("");
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = y * 20 < 100 ? "#00ff99" : "#00ff4110";
        ctx.font = "14px monospace";
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 50);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed",top:0,left:0,zIndex:0,opacity:0.15,pointerEvents:"none" }} />;
};

const TypeWriter = ({ text, speed = 18 }) => {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  useEffect(() => { setDisplayed(""); setIdx(0); }, [text]);
  useEffect(() => {
    if (!text || idx >= text.length) return;
    const t = setTimeout(() => { setDisplayed(p => p + text[idx]); setIdx(i => i + 1); }, speed);
    return () => clearTimeout(t);
  }, [idx, text, speed]);
  return <span>{displayed}{idx < (text?.length || 0) ? <span style={{ animation:"blink 0.7s infinite" }}>█</span> : ""}</span>;
};

const ScanLine = () => (
  <div style={{
    position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1,
    background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,65,0.012) 2px,rgba(0,255,65,0.012) 4px)",
    pointerEvents:"none",
  }} />
);

const ProgressBar = ({ current, total }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:10, letterSpacing:3, color:"#00ff4160" }}>
      <span>SESSION PROGRESS</span>
      <span>Q{current}/{total} COMPLETED</span>
    </div>
    <div style={{ height:2, background:"#00ff4115", position:"relative" }}>
      <div style={{
        height:"100%",
        width:`${(current/total)*100}%`,
        background:"linear-gradient(90deg,#00ff41,#7fff7f)",
        boxShadow:"0 0 8px #00ff4160",
        transition:"width 0.8s ease",
      }} />
    </div>
    <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width:28, height:28,
          border:`1px solid ${i < current ? "#00ff41" : "#00ff4125"}`,
          background: i < current ? "rgba(0,255,65,0.15)" : "transparent",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:9, color: i < current ? "#00ff41" : "#00ff4130",
          fontFamily:"'Orbitron',monospace", fontWeight:700,
          transition:"all 0.4s",
          boxShadow: i < current ? "0 0 8px #00ff4140" : "none",
        }}>
          {i < current ? "✓" : i + 1}
        </div>
      ))}
    </div>
  </div>
);

const ScoreBadge = ({ score, passed }) => (
  <div style={{
    display:"inline-flex", alignItems:"center", gap:10,
    padding:"8px 20px",
    border:`1px solid ${passed ? "#00ff41" : "#ff4141"}`,
    background: passed ? "rgba(0,255,65,0.08)" : "rgba(255,65,65,0.08)",
    marginBottom:16,
  }}>
    <div style={{
      fontFamily:"'Orbitron',monospace", fontSize:28, fontWeight:900,
      color: passed ? "#00ff41" : "#ff6b6b",
      textShadow: passed ? "0 0 20px #00ff41" : "0 0 20px #ff4141",
    }}>{score}</div>
    <div>
      <div style={{ fontSize:9, letterSpacing:3, color: passed ? "#00ff4170" : "#ff6b6b80" }}>OUT OF 100</div>
      <div style={{ fontSize:11, letterSpacing:2, color: passed ? "#00ff41" : "#ff6b6b", fontWeight:700 }}>
        {passed ? "✓ PASSED" : "✗ NEEDS WORK"}
      </div>
    </div>
  </div>
);

export default function Home() {
  const TOTAL_QUESTIONS = 5;

  const [field, setField] = useState("python");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loadingQ, setLoadingQ] = useState(false);
  const [loadingA, setLoadingA] = useState(false);
  const [bootText, setBootText] = useState("");
  const [booted, setBooted] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 8).toUpperCase());
  const [questionNumber, setQuestionNumber] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [scores, setScores] = useState([]);
  const [countdown, setCountdown] = useState(null);

  const resultRef = useRef(null);

  const bootLines = [
    "INITIALIZING NEURAL INTERFACE...",
    "LOADING QUESTION BANK...",
    "CONNECTING TO AI ENGINE...",
    "ALL SYSTEMS ONLINE",
    "ACCESS GRANTED — WELCOME, CANDIDATE",
  ];

  useEffect(() => {
    let i = 0;
    const showLine = () => {
      if (i < bootLines.length) {
        setBootText(p => p + (i > 0 ? "\n" : "") + "> " + bootLines[i]);
        i++;
        setTimeout(showLine, 380);
      } else {
        setTimeout(() => setBooted(true), 500);
      }
    };
    setTimeout(showLine, 300);
  }, []);

  const startSession = async () => {
    setSessionStarted(true);
    setLoadingQ(true);
    setQuestionNumber(1);
    setUsedQuestions([]);
    setScores([]);
    setResult(null);
    setAnswer("");
    const data = await generateQuestion(field, []);
    setQuestion(data.question);
    setUsedQuestions([data.question]);
    setLoadingQ(false);
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setLoadingA(true);
    const data = await checkAnswer({ question, answer, field, questionNumber });
    setResult(data);
    setScores(prev => [...prev, data.score]);
    setLoadingA(false);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior:"smooth", block:"center" }), 100);

    if (questionNumber < TOTAL_QUESTIONS) {
      let count = 20;
      setCountdown(count);
      const timer = setInterval(() => {
        count--;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(timer);
          setCountdown(null);
          loadNextQuestion(data);
        }
      }, 1000);
    } else {
      setCountdown(null);
    }
  };

  const loadNextQuestion = async (latestResult) => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      setSessionComplete(true);
      return;
    }
    setLoadingQ(true);
    setResult(null);
    setAnswer("");
    const nextNum = questionNumber + 1;
    setQuestionNumber(nextNum);
    const data = await generateQuestion(field, usedQuestions);
    setQuestion(data.question);
    setUsedQuestions(prev => [...prev, data.question]);
    setLoadingQ(false);
    window.scrollTo({ top: 0, behavior:"smooth" });
  };

  const skipToNext = () => {
    setCountdown(null);
    if (questionNumber >= TOTAL_QUESTIONS) {
      setSessionComplete(true);
    } else {
      loadNextQuestion(result);
    }
  };

  const restartSession = () => {
    setSessionStarted(false);
    setQuestion("");
    setAnswer("");
    setResult(null);
    setQuestionNumber(0);
    setUsedQuestions([]);
    setScores([]);
    setSessionComplete(false);
    setCountdown(null);
  };

  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) : 0;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
    * { box-sizing: border-box; }
    @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes flicker     { 0%,100%{opacity:1} 93%{opacity:0.96} 95%{opacity:0.88} }
    @keyframes scandown    { 0%{top:-4px} 100%{top:100%} }
    @keyframes pulseGlow   { 0%,100%{box-shadow:0 0 10px #00ff4140,0 0 20px #00ff4115} 50%{box-shadow:0 0 22px #00ff4170,0 0 44px #00ff4130} }
    @keyframes fadeInUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes bootFade    { from{opacity:0} to{opacity:1} }
    @keyframes borderPulse { 0%,100%{border-color:#00ff4128} 50%{border-color:#00ff4165} }
    @keyframes countPulse  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
    @keyframes spin        { to{transform:rotate(360deg)} }
    @keyframes slideIn     { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }

    .hacker-btn {
      font-family: 'Orbitron', monospace;
      font-weight: 700;
      background: transparent;
      border: 1px solid #00ff41;
      color: #00ff41;
      padding: 12px 28px;
      cursor: pointer;
      font-size: 12px;
      letter-spacing: 3px;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
      transition: all 0.25s;
      white-space: nowrap;
    }
    .hacker-btn::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg,transparent,rgba(0,255,65,0.15),transparent);
      transition: left 0.4s;
    }
    .hacker-btn:hover::before { left: 100%; }
    .hacker-btn:hover { background:rgba(0,255,65,0.08); box-shadow:0 0 20px rgba(0,255,65,0.3); color:#7fff7f; }
    .hacker-btn:disabled { opacity:0.3; cursor:not-allowed; pointer-events:none; }
    .hacker-btn.primary { background:rgba(0,255,65,0.06); font-size:13px; padding:14px 36px; }

    .hacker-input {
      background: rgba(0,255,65,0.03);
      border: 1px solid #00ff4130;
      border-bottom-color: #00ff41;
      color: #00ff41;
      font-family: 'Share Tech Mono', monospace;
      font-size: 14px;
      padding: 12px 14px;
      outline: none;
      transition: all 0.3s;
      width: 100%;
      line-height: 1.7;
    }
    .hacker-input:focus {
      border-color: #00ff41;
      background: rgba(0,255,65,0.05);
      box-shadow: 0 0 14px rgba(0,255,65,0.12);
    }
    .hacker-input::placeholder { color:#00ff4140; font-size:13px; }

    .spinner {
      width:14px; height:14px;
      border:2px solid #00ff4125;
      border-top-color:#00ff41;
      border-radius:50%;
      display:inline-block;
      animation:spin 0.8s linear infinite;
      vertical-align:middle;
      margin-right:8px;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 600px) {
      .domain-row   { flex-direction: column !important; }
      .domain-row button { width: 100% !important; }
      .result-controls { flex-direction: column !important; align-items: flex-start !important; }
      .result-controls button { width: 100% !important; }
      .submit-row   { flex-direction: column !important; align-items: stretch !important; }
      .submit-row button { width: 100% !important; }
      .status-bar   { flex-direction: column !important; gap: 2px !important; font-size: 8px !important; }
      .session-end-row { flex-direction: column !important; align-items: flex-start !important; }
      .session-end-row button { width: 100% !important; }
    }
  `;

  // ── Boot Screen ──────────────────────────────────────────────────────────────
  if (!booted) {
    return (
      <>
        <style>{css}</style>
        <MatrixRain />
        <ScanLine />
        <div style={{ position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at center,#001a0055 0%,#000 70%)",zIndex:10,padding:"20px" }}>
          <div style={{ fontFamily:"'Share Tech Mono',monospace",color:"#00ff41",maxWidth:480,width:"100%",padding:"40px 32px",animation:"bootFade 0.5s ease" }}>
            <div style={{ fontSize:10,color:"#00ff4165",marginBottom:24,letterSpacing:4 }}>■ INTERVIEW_OS — BOOT SEQUENCE</div>
            <pre style={{ fontSize:14,lineHeight:2.2,whiteSpace:"pre-wrap",margin:0 }}>
              {bootText}<span style={{ animation:"blink 0.7s infinite" }}>█</span>
            </pre>
          </div>
        </div>
      </>
    );
  }

  // ── Session Complete Screen ──────────────────────────────────────────────────
  if (sessionComplete) {
    return (
      <>
        <style>{css}</style>
        <MatrixRain />
        <ScanLine />
        <div style={{ minHeight:"100vh",background:"#000",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,position:"relative",fontFamily:"'Share Tech Mono',monospace",color:"#00ff41",padding:"20px" }}>
          <div style={{ maxWidth:560,width:"100%",padding:"40px 24px",textAlign:"center",animation:"fadeInUp 0.6s ease" }}>
            <div style={{ fontSize:10,letterSpacing:5,color:"#00ff4155",marginBottom:20 }}>// SESSION_COMPLETE</div>
            <h2 style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(22px,5vw,42px)",fontWeight:900,letterSpacing:3,marginBottom:8 }}>
              <GlitchText text="MISSION" />
              <br />
              <span style={{ color:"#000",WebkitTextStroke:"1px #00ff41" }}>COMPLETE</span>
            </h2>
            <div style={{ margin:"32px 0",padding:"24px",border:"1px solid #00ff4130",background:"rgba(0,255,65,0.03)",animation:"borderPulse 3s infinite" }}>
              <div style={{ fontSize:10,letterSpacing:4,color:"#00ff4155",marginBottom:12 }}>FINAL SCORE</div>
              <div style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(40px,10vw,56px)",fontWeight:900,color:"#00ff41",textShadow:"0 0 30px #00ff4180",lineHeight:1 }}>{avgScore}</div>
              <div style={{ fontSize:11,color:"#00ff4165",letterSpacing:3,marginTop:8 }}>AVERAGE ACROSS {TOTAL_QUESTIONS} QUESTIONS</div>
              <div style={{ display:"flex",justifyContent:"center",gap:8,marginTop:20,flexWrap:"wrap" }}>
                {scores.map((s, i) => (
                  <div key={i} style={{ padding:"6px 14px",border:`1px solid ${s>=70?"#00ff4150":"#ff6b6b50"}`,fontSize:11,color:s>=70?"#00ff41":"#ff6b6b",fontFamily:"'Orbitron',monospace",fontWeight:700 }}>
                    Q{i+1}: {s}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontSize:13,color:"#00ff4170",lineHeight:2,marginBottom:32 }}>
              {avgScore >= 85 ? "Outstanding performance. You are interview-ready." :
               avgScore >= 70 ? "Good work. Review weak areas and practice more." :
               "Keep practicing. Focus on fundamentals and code examples."}
            </div>
            <button className="hacker-btn primary" onClick={restartSession} style={{ width:"100%" }}>
              ▸ START NEW SESSION
            </button>
          </div>
        </div>
      </>
    );
  }

  // ── Main UI ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <MatrixRain />
      <ScanLine />

      <div style={{ position:"fixed",left:0,right:0,height:"2px",zIndex:5,pointerEvents:"none",background:"linear-gradient(90deg,transparent,#00ff4120,#00ff4150,#00ff4120,transparent)",animation:"scandown 7s linear infinite" }} />

      <div style={{ minHeight:"100vh",background:"#000",fontFamily:"'Share Tech Mono',monospace",color:"#00ff41",position:"relative",zIndex:2,animation:"flicker 9s infinite" }}>

        {/* Status Bar */}
        <div className="status-bar" style={{ borderBottom:"1px solid #00ff4118",padding:"6px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(0,5,0,0.95)",fontSize:9,color:"#00ff4140",letterSpacing:2 }}>
          <span>INTERVIEW_OS v4.2 — AI ENGINE ONLINE</span>
          <span>SESSION::{sessionId}</span>
        </div>

        <div style={{ maxWidth:820,margin:"0 auto",padding:"36px 16px 100px" }}>

          {/* Hero */}
          <div style={{ textAlign:"center",marginBottom:40,animation:"fadeInUp 0.6s ease" }}>
            <div style={{ fontSize:10,letterSpacing:6,color:"#00ff4150",marginBottom:16 }}>// NEURAL INTERVIEW SIMULATOR</div>
            <h1 style={{ fontFamily:"'Orbitron',monospace",fontSize:"clamp(24px,6vw,50px)",fontWeight:900,letterSpacing:4,lineHeight:1.15,marginBottom:0 }}>
              <GlitchText text="CRACK THE" />
              <br />
              <span style={{ color:"#000",WebkitTextStroke:"1px #00ff41" }}>ALGORITHM</span>
            </h1>
          </div>

          {/* Domain Input */}
          {!sessionStarted && (
            <div style={{ marginBottom:40,animation:"fadeInUp 0.6s ease 0.1s both" }}>
              <div style={{ fontSize:10,color:"#00ff4165",letterSpacing:3,marginBottom:10 }}>┌─ SELECT_DOMAIN</div>
              <div className="domain-row" style={{ display:"flex",gap:12,alignItems:"stretch" }}>
                <div style={{ flex:1,position:"relative" }}>
                  <span style={{ position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:"#00ff4150",fontSize:15,pointerEvents:"none" }}>$</span>
                  <input
                    className="hacker-input"
                    style={{ paddingLeft:30 }}
                    value={field}
                    onChange={e => setField(e.target.value)}
                    placeholder="python / django / javascript / react"
                    onKeyDown={e => e.key === "Enter" && !sessionStarted && startSession()}
                  />
                </div>
                <button className="hacker-btn primary" onClick={startSession}>
                  ▸ START SESSION
                </button>
              </div>
              <div style={{ fontSize:9,color:"#00ff4130",letterSpacing:2,marginTop:8,paddingLeft:4 }}>
                └─ {TOTAL_QUESTIONS} QUESTIONS PER SESSION · PRESS ENTER TO BEGIN
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {sessionStarted && !sessionComplete && (
            <div style={{ animation:"fadeInUp 0.5s ease" }}>
              <ProgressBar current={result ? questionNumber : questionNumber - 1} total={TOTAL_QUESTIONS} />
            </div>
          )}

          {/* Loading Question */}
          {loadingQ && (
            <div style={{ textAlign:"center",padding:"48px 0",animation:"fadeInUp 0.4s ease" }}>
              <div style={{ fontSize:12,letterSpacing:4,color:"#00ff4165" }}>
                <span className="spinner" />
                GENERATING QUESTION {questionNumber}/{TOTAL_QUESTIONS}...
              </div>
            </div>
          )}

          {/* Question Panel */}
          {question && !loadingQ && (
            <div style={{ marginBottom:24,border:"1px solid #00ff4130",background:"rgba(0,255,65,0.02)",animation:"fadeInUp 0.45s ease,borderPulse 4s infinite" }}>
              <div style={{ padding:"10px 16px",borderBottom:"1px solid #00ff4118",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(0,255,65,0.04)",flexWrap:"wrap",gap:8 }}>
                <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:"#00ff41",animation:"pulseGlow 2s infinite",flexShrink:0 }} />
                  <span style={{ fontSize:10,letterSpacing:3,color:"#00ff4175",fontFamily:"'Orbitron',monospace",fontWeight:700 }}>
                    QUESTION {questionNumber} of {TOTAL_QUESTIONS}
                  </span>
                </div>
                <span style={{ fontSize:9,color:"#00ff4145",letterSpacing:2 }}>DOMAIN::{field.toUpperCase()}</span>
              </div>
              <div style={{ padding:"20px 18px",lineHeight:1.9,fontSize:"clamp(13px,2vw,15px)",color:"#7fff7f",letterSpacing:0.5 }}>
                <TypeWriter text={question} speed={16} />
              </div>
            </div>
          )}

          {/* Answer Box */}
          {question && !loadingQ && !result && (
            <div style={{ marginBottom:24,animation:"fadeInUp 0.45s ease 0.1s both" }}>
              <div style={{ fontSize:10,color:"#00ff4165",letterSpacing:3,marginBottom:10 }}>┌─ YOUR_ANSWER</div>
              <div style={{ border:"1px solid #00ff4128",background:"rgba(0,3,0,0.88)" }}>
                <div style={{ padding:"8px 16px",borderBottom:"1px solid #00ff4115",fontSize:10,color:"#00ff4140",display:"flex",gap:12,background:"rgba(0,255,65,0.03)",flexWrap:"wrap" }}>
                  <span>answer.txt</span>
                  <span style={{ color:"#00ff4125" }}>|</span>
                  <span>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
                  <span style={{ color:"#00ff4125" }}>|</span>
                  <span>{answer.length} chars</span>
                </div>
                <textarea
                  className="hacker-input"
                  rows={7}
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder={"// Type your answer here...\n// Be specific. Cover edge cases. Use examples."}
                  style={{ border:"none",resize:"vertical",minHeight:150,display:"block",lineHeight:1.8 }}
                />
              </div>
              <div className="submit-row" style={{ marginTop:14,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
                <div style={{ fontSize:9,color:"#00ff4130",letterSpacing:2 }}>└─ MORE DETAIL = HIGHER SCORE</div>
                <button className="hacker-btn primary" onClick={submitAnswer} disabled={loadingA || !answer.trim()}>
                  {loadingA ? <><span className="spinner" />EVALUATING...</> : "▸ SUBMIT ANSWER"}
                </button>
              </div>
            </div>
          )}

          {/* Evaluating */}
          {loadingA && (
            <div style={{ textAlign:"center",padding:"32px 0",animation:"fadeInUp 0.4s ease" }}>
              <div style={{ fontSize:12,letterSpacing:4,color:"#00ff4165" }}>
                <span className="spinner" />AI IS EVALUATING YOUR ANSWER...
              </div>
            </div>
          )}

          {/* Result Panel */}
          {result && !loadingA && (
            <div ref={resultRef} style={{ marginBottom:24,animation:"fadeInUp 0.5s ease" }}>
              <div style={{ border:"1px solid #00ff4140",background:"rgba(0,255,65,0.025)" }}>
                <div style={{ padding:"10px 16px",borderBottom:"1px solid #00ff4125",background:"rgba(0,255,65,0.05)",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap" }}>
                  <div style={{ width:7,height:7,borderRadius:"50%",background:"#00ff41",animation:"pulseGlow 1.5s infinite",flexShrink:0 }} />
                  <span style={{ fontSize:10,letterSpacing:3,color:"#00ff41",fontFamily:"'Orbitron',monospace",fontWeight:700 }}>EVALUATION RESULT</span>
                  <span style={{ marginLeft:"auto",fontSize:9,color:"#00ff4150",animation:"blink 1s infinite" }}>◈ COMPLETE</span>
                </div>
                <div style={{ padding:"20px 18px" }}>
                  <ScoreBadge score={result.score} passed={result.passed} />
                  <pre style={{ fontSize:"clamp(11px,2vw,13px)",lineHeight:2.1,color:"#a0ffb0",whiteSpace:"pre-wrap",fontFamily:"'Share Tech Mono',monospace",margin:0,marginTop:12 }}>
                    <TypeWriter text={result.result} speed={10} />
                  </pre>
                </div>

                {/* Next Question Controls */}
                <div className="result-controls" style={{ padding:"16px 18px",borderTop:"1px solid #00ff4118",background:"rgba(0,255,65,0.02)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
                  {questionNumber < TOTAL_QUESTIONS ? (
                    <>
                      <div style={{ fontSize:11,color:"#00ff4165",letterSpacing:2 }}>
                        {countdown !== null ? (
                          <span>
                            NEXT IN{" "}
                            <span style={{ fontFamily:"'Orbitron',monospace",fontWeight:900,fontSize:16,color:"#00ff41",animation:"countPulse 1s infinite",display:"inline-block" }}>
                              {countdown}s
                            </span>
                          </span>
                        ) : (
                          <span style={{ color:"#00ff4145" }}>READY FOR NEXT</span>
                        )}
                      </div>
                      <button className="hacker-btn" onClick={skipToNext}>
                        ▸ NEXT QUESTION →
                      </button>
                    </>
                  ) : (
                    <div className="session-end-row" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",flexWrap:"wrap",gap:12 }}>
                      <div style={{ fontSize:11,color:"#00ff4165",letterSpacing:2 }}>ALL {TOTAL_QUESTIONS} QUESTIONS DONE</div>
                      <button className="hacker-btn primary" onClick={() => setSessionComplete(true)}>
                        ▸ VIEW FINAL SCORE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop:60,textAlign:"center",fontSize:9,color:"#00ff4220",letterSpacing:3 }}>
            INTERVIEW_OS v4.2 — AI EVALUATION ENGINE — {TOTAL_QUESTIONS} QUESTIONS PER SESSION
          </div>

        </div>
      </div>
    </>
  );
}