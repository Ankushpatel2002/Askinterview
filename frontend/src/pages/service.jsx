import { useState, useEffect } from "react";

const features = [
  {
    icon: "⬡",
    code: "MOD_01",
    title: "AI QUESTION ENGINE",
    desc: "Dynamically generates real-world technical interview questions tailored to your chosen language or framework. No repetition. No fluff.",
    tags: ["Python", "Django", "React", "Node"],
    stat: "500+", statLabel: "Question Patterns",
  },
  {
    icon: "⬡",
    code: "MOD_02",
    title: "NEURAL EVALUATION",
    desc: "Your answers are analyzed by an AI engine that checks depth, accuracy, and clarity — just like a senior engineer would in a real interview.",
    tags: ["Instant Feedback", "Scoring", "Gap Analysis"],
    stat: "98%", statLabel: "Evaluation Accuracy",
  },
  {
    icon: "⬡",
    code: "MOD_03",
    title: "ADAPTIVE DIFFICULTY",
    desc: "The system tracks your performance and adjusts question complexity in real time — keeping you in the optimal challenge zone.",
    tags: ["Beginner", "Mid-level", "Senior"],
    stat: "3x", statLabel: "Faster Skill Growth",
  },
  {
    icon: "⬡",
    code: "MOD_04",
    title: "DOMAIN TARGETING",
    desc: "Focus on what matters. Select any tech stack and drill deep into that domain — from data structures to system design.",
    tags: ["DSA", "System Design", "Frameworks"],
    stat: "20+", statLabel: "Tech Domains",
  },
];

const steps = [
  { num: "01", title: "SELECT DOMAIN", desc: "Enter your target language or framework to initialize the session." },
  { num: "02", title: "RECEIVE QUERY", desc: "AI generates a high-signal interview question matched to your level." },
  { num: "03", title: "SUBMIT RESPONSE", desc: "Type your answer in the terminal interface — no time pressure." },
  { num: "04", title: "GET EVALUATED", desc: "Receive a detailed score, strengths, weaknesses, and improvement tips." },
];

const stats = [
  { value: "10K+", label: "CANDIDATES TRAINED" },
  { value: "500+", label: "QUESTION PATTERNS" },
  { value: "20+", label: "TECH DOMAINS" },
  { value: "98%", label: "SATISFACTION RATE" },
];

const CountUp = ({ target }) => {
  const [val, setVal] = useState(0);
  const num = parseInt(target);
  const suffix = target.replace(/[0-9]/g, "");
  useEffect(() => {
    if (isNaN(num)) return;
    let start = 0;
    const step = Math.ceil(num / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= num) { setVal(num); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, []);
  return <span>{isNaN(num) ? target : val + suffix}</span>;
};

export default function Service() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
    @keyframes pulseGlow { 0%,100%{box-shadow:0 0 8px #00ff4140,0 0 16px #00ff4120} 50%{box-shadow:0 0 20px #00ff4170,0 0 40px #00ff4130} }
    @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes scanH { 0%{left:-100%} 100%{left:100%} }
    @keyframes borderPulse { 0%,100%{border-color:#00ff4130} 50%{border-color:#00ff4170} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes gridScroll { from{background-position:0 0} to{background-position:0 60px} }
    .service-card {
      border: 1px solid #00ff4125;
      background: rgba(0,255,65,0.02);
      padding: 28px;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      cursor: default;
      animation: fadeInUp 0.6s ease both;
    }
    .service-card::before {
      content:'';
      position:absolute;
      top:0;left:-100%;
      width:100%;height:1px;
      background:linear-gradient(90deg,transparent,#00ff41,transparent);
      transition: left 0.4s ease;
    }
    .service-card:hover { border-color:#00ff4160; background:rgba(0,255,65,0.05); transform:translateY(-3px); box-shadow:0 8px 32px rgba(0,255,65,0.08); }
    .service-card:hover::before { left:100%; }
    .tag {
      font-family:'Share Tech Mono',monospace;
      font-size:10px;
      letter-spacing:2px;
      padding:3px 10px;
      border:1px solid #00ff4130;
      color:#00ff4170;
      background:rgba(0,255,65,0.04);
      transition: all 0.2s;
    }
    .tag:hover { border-color:#00ff41; color:#00ff41; background:rgba(0,255,65,0.08); }
    .step-item {
      display:flex;
      gap:20px;
      padding:18px 0;
      border-bottom:1px solid #00ff4115;
      transition: all 0.3s;
      cursor:default;
    }
    .step-item.active { padding-left:12px; border-bottom-color:#00ff4140; }
    .stat-box {
      border:1px solid #00ff4125;
      padding:24px 20px;
      text-align:center;
      background:rgba(0,255,65,0.02);
      animation: borderPulse 3s infinite;
      transition: all 0.3s;
    }
    .stat-box:hover { background:rgba(0,255,65,0.06); transform:scale(1.03); box-shadow:0 0 24px rgba(0,255,65,0.1); }
  `;

  return (
    <>
      <style>{css}</style>
      <div style={{
        minHeight: "100vh",
        background: "#000",
        color: "#00ff41",
        fontFamily: "'Share Tech Mono', monospace",
        backgroundImage: "linear-gradient(rgba(0,255,65,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.03) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        animation: "gridScroll 8s linear infinite",
      }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", padding: "64px 24px 100px" }}>

          {/* Hero Section */}
          <div style={{ textAlign: "center", marginBottom: 80, animation: "fadeInUp 0.6s ease" }}>
            <div style={{ fontSize: 10, letterSpacing: 6, color: "#00ff4150", marginBottom: 20 }}>
              // SYSTEM MODULE :: SERVICES.exe
            </div>
            <h1 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(30px, 6vw, 58px)",
              fontWeight: 900, letterSpacing: 3, lineHeight: 1.1, marginBottom: 24,
            }}>
              <span style={{ color: "#000", WebkitTextStroke: "1px #00ff41" }}>WHAT</span>
              {" "}WE<br />
              <span style={{ textShadow: "0 0 30px #00ff4180" }}>OFFER</span>
            </h1>
            <p style={{ fontSize: 13, color: "#00ff4170", letterSpacing: 2, maxWidth: 520, margin: "0 auto", lineHeight: 2 }}>
              A full-stack AI interview simulator engineered to turn raw developers into interview-ready engineers. Every session adapts. Every answer gets evaluated. No mercy.
            </p>
            <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              {["AI-POWERED", "REAL-TIME FEEDBACK", "ANY TECH STACK", "FREE TO USE"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 1, marginBottom: 80,
            border: "1px solid #00ff4120",
            background: "#00ff4110",
            animation: "fadeInUp 0.6s ease 0.1s both",
          }}>
            {stats.map(({ value, label }) => (
              <div key={label} className="stat-box" style={{ background: "#000" }}>
                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 28, fontWeight: 900, color: "#00ff41", textShadow: "0 0 20px #00ff4180" }}>
                  <CountUp target={value} />
                </div>
                <div style={{ fontSize: 9, letterSpacing: 3, color: "#00ff4160", marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Feature Cards */}
          <div style={{ marginBottom: 90 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, color: "#00ff4150", marginBottom: 32 }}>
              ┌─ CORE_MODULES ──────────────────────────<span style={{ animation: "blink 1s infinite" }}>█</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 1, background: "#00ff4110" }}>
              {features.map((f, i) => (
                <div
                  key={f.code}
                  className="service-card"
                  style={{ animationDelay: `${i * 0.1}s`, background: hoveredCard === i ? "rgba(0,255,65,0.05)" : "#000" }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 9, color: "#00ff4140", letterSpacing: 3, marginBottom: 6 }}>{f.code}</div>
                      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#00ff41" }}>{f.title}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, fontWeight: 900, color: hoveredCard === i ? "#00ff41" : "#00ff4160", textShadow: hoveredCard === i ? "0 0 20px #00ff41" : "none", transition: "all 0.3s" }}>{f.stat}</div>
                      <div style={{ fontSize: 9, color: "#00ff4140", letterSpacing: 1 }}>{f.statLabel}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: 12, color: "#00ff4180", lineHeight: 2, marginBottom: 20 }}>{f.desc}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {f.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>

                  {hoveredCard === i && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#00ff41,transparent)", animation: "scanH 1s ease" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 80, alignItems: "start" }} className="how-it-works">
            <div style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}>
              <div style={{ fontSize: 10, letterSpacing: 5, color: "#00ff4150", marginBottom: 24 }}>
                ┌─ PROTOCOL_SEQUENCE
              </div>
              <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(18px,3vw,28px)", fontWeight: 900, letterSpacing: 2, marginBottom: 32, lineHeight: 1.3 }}>
                HOW THE<br /><span style={{ color: "#000", WebkitTextStroke: "1px #00ff41" }}>SYSTEM</span> WORKS
              </h2>
              <div>
                {steps.map((s, i) => (
                  <div key={s.num} className={`step-item${activeStep === i ? " active" : ""}`}>
                    <div style={{
                      fontFamily: "'Orbitron',monospace", fontSize: 20, fontWeight: 900, minWidth: 44,
                      color: activeStep === i ? "#00ff41" : "#00ff4130",
                      textShadow: activeStep === i ? "0 0 16px #00ff41" : "none",
                      transition: "all 0.4s",
                    }}>{s.num}</div>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: 3, color: activeStep === i ? "#00ff41" : "#00ff4170", marginBottom: 4, transition: "color 0.3s" }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "#00ff4150", lineHeight: 1.8 }}>{s.desc}</div>
                    </div>
                    {activeStep === i && <div style={{ marginLeft: "auto", fontSize: 10, color: "#00ff41", animation: "blink 0.7s infinite", alignSelf: "center" }}>◈</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Preview */}
            <div style={{ border: "1px solid #00ff4130", background: "rgba(0,5,0,0.9)", animation: "fadeInUp 0.6s ease 0.4s both, float 4s ease-in-out infinite" }}>
              <div style={{ padding: "10px 16px", borderBottom: "1px solid #00ff4120", display: "flex", alignItems: "center", gap: 8, background: "rgba(0,255,65,0.04)" }}>
                {["#ff5f56","#ffbd2e","#27c93f"].map((c,i) => <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.7 }} />)}
                <span style={{ fontSize: 10, color: "#00ff4150", letterSpacing: 2, marginLeft: 8 }}>session_preview.sh</span>
              </div>
              <div style={{ padding: "20px 20px", fontSize: 12, lineHeight: 2.2, color: "#00ff4190" }}>
                <div><span style={{ color: "#00ff4150" }}>$</span> interview_os --domain python</div>
                <div style={{ color: "#00ff4150" }}>▸ Connecting to AI engine...</div>
                <div style={{ color: "#00ff4150" }}>▸ Loading question bank...</div>
                <div style={{ color: "#7fff7f", marginTop: 4 }}>✓ Session initialized</div>
                <div style={{ marginTop: 8, color: "#00ff41" }}><span style={{ color: "#00ff4150" }}>Q:</span> Explain Python's GIL and its impact on multithreading.</div>
                <div style={{ marginTop: 8, color: "#00ff4150" }}><span style={{ color: "#00ff4170" }}>A:</span> The GIL is a mutex that...</div>
                <div style={{ marginTop: 12, borderTop: "1px solid #00ff4120", paddingTop: 12 }}>
                  <div style={{ color: "#7fff7f" }}>✓ Score: 91/100 — PASSED</div>
                  <div style={{ color: "#00ff4150", fontSize: 11 }}>▸ Generating next question<span style={{ animation: "blink 0.7s infinite" }}>...</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            border: "1px solid #00ff4140",
            padding: "48px 40px",
            textAlign: "center",
            background: "rgba(0,255,65,0.03)",
            position: "relative",
            overflow: "hidden",
            animation: "fadeInUp 0.6s ease 0.5s both, borderPulse 3s infinite",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,255,65,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ fontSize: 10, letterSpacing: 5, color: "#00ff4160", marginBottom: 16 }}>// READY TO BEGIN?</div>
            <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(18px,3vw,30px)", fontWeight: 900, letterSpacing: 3, marginBottom: 16, color: "#00ff41", textShadow: "0 0 30px #00ff4160" }}>
              START YOUR SESSION
            </h3>
            <p style={{ fontSize: 12, color: "#00ff4170", letterSpacing: 2, marginBottom: 32, lineHeight: 2 }}>
              No signup. No setup. Just open the terminal and start training.
            </p>
            <a href="/" style={{
              fontFamily: "'Share Tech Mono',monospace",
              background: "#00ff41",
              color: "#000",
              padding: "14px 40px",
              fontSize: 13,
              letterSpacing: 3,
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.2s",
              boxShadow: "0 0 24px rgba(0,255,65,0.4)",
            }}
              onMouseEnter={e => { e.target.style.background="#7fff7f"; e.target.style.boxShadow="0 0 40px rgba(0,255,65,0.6)"; }}
              onMouseLeave={e => { e.target.style.background="#00ff41"; e.target.style.boxShadow="0 0 24px rgba(0,255,65,0.4)"; }}
            >
              ▸ LAUNCH INTERVIEW_OS
            </a>
          </div>

        </div>
      </div>
    </>
  );
}