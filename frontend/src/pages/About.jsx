import { useState, useEffect } from "react";

const skills = [
  { name: "Python", level: 88 },
  { name: "Django REST Framework", level: 85 },
  { name: "React.js", level: 82 },
  { name: "JavaScript (ES6+)", level: 80 },
  { name: "SQL / PostgreSQL", level: 74 },
  { name: "AI / LLM Integration", level: 76 },
  { name: "Git & GitHub", level: 85 },
  { name: "REST API Design", level: 83 },
];

const socials = [
  {
    code: "GH",
    label: "GITHUB",
    handle: "Ankushpatel2002",
    sub: "github.com/Ankushpatel2002",
    link: "https://github.com/Ankushpatel2002",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    code: "LI",
    label: "LINKEDIN",
    handle: "Ankush Kumar Patel",
    sub: "linkedin.com/in/ankush-kumar-patel",
    link: "https://www.linkedin.com/in/ankush-kumar-patel-64a36b2b3",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    code: "IG",
    label: "INSTAGRAM",
    handle: "@anku_patel_32",
    sub: "instagram.com/anku_patel_32",
    link: "https://instagram.com/anku_patel_32",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    code: "EM",
    label: "EMAIL",
    handle: "ankukumarpatel87@gmail.com",
    sub: "Click to send email",
    link: "mailto:ankukumarpatel87@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 11.73l9.615-7.909h.749A1.636 1.636 0 0 1 24 5.457z"/>
      </svg>
    ),
  },
  {
    code: "PH",
    label: "MOBILE",
    handle: "+91 89599 82886",
    sub: "Click to call",
    link: "tel:+918959982886",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
];

const timeline = [
  { year: "2020", title: "STARTED CODING JOURNEY", desc: "Began learning Python and fell in love with programming. Started solving DSA problems daily." },
  { year: "2021", title: "WEB DEVELOPMENT", desc: "Explored full-stack development. Built first Django projects and learned React for frontend." },
  { year: "2022", title: "GITHUB: ANKUSHPATEL2002", desc: "Started pushing projects to GitHub. Contributed to open-source. Built REST APIs from scratch." },
  { year: "2023", title: "AI INTEGRATION", desc: "Dived into AI/LLM APIs. Integrated intelligent features into web applications." },
  { year: "2024", title: "INTERVIEW_OS LAUNCHED", desc: "Built this AI-powered interview simulator using Django REST + React to help developers ace technical interviews." },
];

const SkillBar = ({ name, level, delay }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, letterSpacing: 2, color: "#00ff4185" }}>{name}</span>
        <span style={{ fontSize: 10, color: "#00ff4160", fontFamily: "'Orbitron',monospace" }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: "#00ff4115", position: "relative" }}>
        <div style={{
          height: "100%", width: `${width}%`,
          background: "linear-gradient(90deg,#00ff41,#7fff7f)",
          boxShadow: "0 0 8px #00ff4150",
          transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
        }} />
        <div style={{
          position: "absolute", top: "50%",
          left: `${width}%`,
          transform: "translate(-50%,-50%)",
          width: 7, height: 7,
          background: "#00ff41",
          boxShadow: "0 0 8px #00ff41",
          transition: "left 1.4s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
};

const GlitchText = ({ text }) => {
  const [g, setG] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setG(true);
      setTimeout(() => setG(false), 120);
    }, 3000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {text}
      {g && <>
        <span style={{ position:"absolute",top:0,left:"2px",color:"#ff003c",clipPath:"polygon(0 25%,100% 25%,100% 50%,0 50%)",opacity:.9 }}>{text}</span>
        <span style={{ position:"absolute",top:0,left:"-2px",color:"#00fff9",clipPath:"polygon(0 60%,100% 60%,100% 80%,0 80%)",opacity:.9 }}>{text}</span>
      </>}
    </span>
  );
};

export default function About() {
  const [typed, setTyped] = useState("");
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredTimeline, setHoveredTimeline] = useState(null);
  const [copied, setCopied] = useState(false);

  const intro = "> INITIALIZING PROFILE...\n> NAME    :: Ankush Kumar Patel\n> ROLE    :: Full-Stack Developer\n> STACK   :: Python · Django · React\n> STATUS  :: Available for Hire\n> MISSION :: Build. Ship. Repeat.";

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i < intro.length) setTyped(intro.slice(0, ++i));
      else clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("ankukumarpatel87@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
    @keyframes fadeInUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes pulseGlow   { 0%,100%{box-shadow:0 0 8px #00ff4140,0 0 16px #00ff4115} 50%{box-shadow:0 0 22px #00ff4180,0 0 44px #00ff4130} }
    @keyframes borderPulse { 0%,100%{border-color:#00ff4128} 50%{border-color:#00ff4165} }
    @keyframes float       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes orbit       { from{transform:rotate(0deg) translateX(58px) rotate(0deg)} to{transform:rotate(360deg) translateX(58px) rotate(-360deg)} }
    @keyframes gridScroll  { from{background-position:0 0} to{background-position:0 60px} }
    @keyframes scanH       { 0%{left:-100%} 100%{left:110%} }

    .social-card {
      border: 1px solid #00ff4120;
      background: #000;
      padding: 18px 22px;
      display: flex;
      align-items: center;
      gap: 18px;
      text-decoration: none;
      color: #00ff4165;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    .social-card::before {
      content:'';
      position:absolute;
      top:0; left:-100%;
      width:100%; height:100%;
      background:linear-gradient(90deg,transparent,rgba(0,255,65,0.07),transparent);
      transition: left 0.45s;
    }
    .social-card:hover { border-color:#00ff4155; background:rgba(0,255,65,0.05); color:#00ff41; transform:translateX(8px); }
    .social-card:hover::before { left:100%; }

    .timeline-item {
      display: flex;
      gap: 24px;
      padding: 20px 0;
      border-bottom: 1px solid #00ff4112;
      transition: all 0.3s;
      cursor: default;
    }
    .timeline-item:hover { padding-left: 10px; border-bottom-color: #00ff4140; }
    .timeline-item:last-child { border-bottom: none; }

    .copy-btn {
      font-family: 'Share Tech Mono', monospace;
      background: transparent;
      border: 1px solid #00ff4130;
      color: #00ff4170;
      padding: 5px 14px;
      font-size: 10px;
      letter-spacing: 2px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .copy-btn:hover { border-color:#00ff41; color:#00ff41; background:rgba(0,255,65,0.06); }

    /* ══ RESPONSIVE ══ */
    @media (max-width: 768px) {
      .hero-grid {
        grid-template-columns: 1fr !important;
      }
      .skills-grid {
        grid-template-columns: 1fr !important;
        gap: 40px !important;
      }
      .project-grid {
        grid-template-columns: 1fr !important;
      }
      .project-grid > div {
        border-right: none !important;
        border-bottom: 1px solid #00ff4112;
      }
      .project-grid > div:last-child {
        border-bottom: none !important;
      }
    }

    @media (max-width: 600px) {
      .about-container {
        padding: 32px 16px 80px !important;
      }
      .header-label {
        font-size: 9px !important;
        letter-spacing: 3px !important;
        margin-bottom: 36px !important;
      }
      .footer-quote {
        padding: 28px 18px !important;
      }
      .terminal-bio {
        font-size: 11px !important;
      }
    }

    @media (max-width: 480px) {
      .social-card:hover {
        transform: none !important;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div style={{
        minHeight: "100vh",
        background: "#000",
        color: "#00ff41",
        fontFamily: "'Share Tech Mono', monospace",
        backgroundImage: "linear-gradient(rgba(0,255,65,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,65,0.022) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        animation: "gridScroll 10s linear infinite",
      }}>
        <div className="about-container" style={{ maxWidth: 1060, margin: "0 auto", padding: "60px 24px 100px" }}>

          <div className="header-label" style={{ fontSize: 10, letterSpacing: 6, color: "#00ff4145", marginBottom: 64, animation: "fadeInUp 0.5s ease" }}>
            // SYSTEM MODULE :: ABOUT.exe — DEVELOPER_PROFILE_LOADED
          </div>

          {/* SECTION 1 — HERO */}
          <div className="hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 48, marginBottom: 80,
            alignItems: "start",
            animation: "fadeInUp 0.6s ease",
          }}>
            {/* Avatar Column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <div style={{ position: "relative", animation: "float 5s ease-in-out infinite" }}>
                <div style={{ position:"absolute", inset:-24, border:"1px dashed #00ff4120", borderRadius:"50%" }} />
                <div style={{ position:"absolute", inset:-24, animation:"orbit 9s linear infinite" }}>
                  <div style={{ width:9,height:9,background:"#00ff41",borderRadius:"50%",boxShadow:"0 0 10px #00ff41",marginTop:-4,marginLeft:-4 }} />
                </div>
                <div style={{
                  width: 148, height: 148,
                  border: "2px solid #00ff4165",
                  background: "rgba(0,255,65,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                  animation: "pulseGlow 3s infinite",
                }}>
                  <span style={{ fontFamily:"'Orbitron',monospace", fontSize:52, fontWeight:900, color:"#00ff41", textShadow:"0 0 30px #00ff41" }}>AK</span>
                  <div style={{ position:"absolute", inset:5, border:"1px solid #00ff4120" }} />
                  <div style={{ position:"absolute", top:-1, left:"25%", right:"25%", height:2, background:"#00ff41", boxShadow:"0 0 8px #00ff41" }} />
                  <div style={{ position:"absolute", bottom:-1, left:"25%", right:"25%", height:2, background:"#00ff41", boxShadow:"0 0 8px #00ff41" }} />
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily:"'Orbitron',monospace", fontSize:15, fontWeight:900, letterSpacing:3, color:"#00ff41", marginBottom:5 }}>
                  <GlitchText text="ANKUSH KUMAR" />
                </div>
                <div style={{ fontFamily:"'Orbitron',monospace", fontSize:13, letterSpacing:3, color:"#00ff4175" }}>PATEL</div>
                <div style={{ marginTop:10, fontSize:9, letterSpacing:3, color:"#00ff4145", borderTop:"1px solid #00ff4118", paddingTop:10 }}>
                  FULL-STACK · AI ENGINEER
                </div>
              </div>

              <div style={{
                border:"1px solid #00ff4130", padding:"8px 18px",
                fontSize:9, letterSpacing:3,
                display:"flex", alignItems:"center", gap:8,
                animation:"borderPulse 2.5s infinite",
                width:"100%", justifyContent:"center",
              }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:"#00ff41",animation:"pulseGlow 1.5s infinite" }} />
                AVAILABLE FOR HIRE
              </div>

              {[
                { label: "LOCATION", val: "India 🇮🇳" },
                { label: "PHONE", val: "+91 89599 82886" },
                { label: "EXPERIENCE", val: "4+ Years" },
              ].map(({ label, val }) => (
                <div key={label} style={{ width:"100%", borderBottom:"1px solid #00ff4112", paddingBottom:10, paddingTop:2 }}>
                  <div style={{ fontSize:9, color:"#00ff4140", letterSpacing:3, marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:12, color:"#00ff4185" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Terminal Bio */}
            <div style={{ border:"1px solid #00ff4128", background:"rgba(0,4,0,0.92)", animation:"fadeInUp 0.6s ease 0.12s both" }}>
              <div style={{ padding:"9px 16px", borderBottom:"1px solid #00ff4118", display:"flex", alignItems:"center", gap:8, background:"rgba(0,255,65,0.03)" }}>
                {["#ff5f56","#ffbd2e","#27c93f"].map((c,i) => (
                  <div key={i} style={{ width:10,height:10,borderRadius:"50%",background:c,opacity:.75 }} />
                ))}
                <span style={{ fontSize:10,color:"#00ff4145",letterSpacing:2,marginLeft:8 }}>profile.sh — zsh</span>
              </div>
              <div style={{ padding:"22px 22px 10px" }}>
                <pre className="terminal-bio" style={{ fontSize:13, lineHeight:2.3, color:"#7fff7f", whiteSpace:"pre-wrap", margin:0 }}>
                  {typed}<span style={{ animation:"blink 0.7s infinite" }}>█</span>
                </pre>
              </div>
              <div style={{ padding:"10px 22px 22px", borderTop:"1px solid #00ff4112", marginTop:8 }}>
                <div style={{ fontSize:10, color:"#00ff4145", letterSpacing:3, marginBottom:14, marginTop:10 }}>// BIO</div>
                <p style={{ fontSize:12, color:"#00ff4175", lineHeight:2.1, marginBottom:16 }}>
                  Hey! I'm <span style={{ color:"#00ff41" }}>Ankush Kumar Patel</span> — a passionate Full-Stack Developer from India who loves turning complex problems into clean, efficient code.
                </p>
                <p style={{ fontSize:12, color:"#00ff4175", lineHeight:2.1, marginBottom:16 }}>
                  I specialize in building intelligent web applications using <span style={{ color:"#00ff41" }}>Python · Django REST Framework · React.js</span>. I created this AI Interview Simulator to help developers worldwide prepare smarter and land their dream jobs.
                </p>
                <p style={{ fontSize:12, color:"#00ff4175", lineHeight:2.1 }}>
                  When I'm not coding, I'm exploring new AI tools, contributing to open source, and leveling up my system design skills. Always building. Always learning.
                </p>
                <div style={{ marginTop:20, padding:"12px 16px", border:"1px solid #00ff4120", background:"rgba(0,255,65,0.02)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                  <div>
                    <div style={{ fontSize:9, color:"#00ff4140", letterSpacing:3, marginBottom:4 }}>EMAIL</div>
                    <div style={{ fontSize:12, color:"#00ff4185" }}>ankukumarpatel87@gmail.com</div>
                  </div>
                  <button className="copy-btn" onClick={copyEmail}>
                    {copied ? "✓ COPIED" : "COPY"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2 — SKILLS + TIMELINE */}
          <div className="skills-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, marginBottom:80, animation:"fadeInUp 0.6s ease 0.2s both" }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:5, color:"#00ff4145", marginBottom:22 }}>┌─ SKILL_MATRIX</div>
              <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:18, fontWeight:900, letterSpacing:2, marginBottom:28, color:"#00ff41" }}>
                TECH ARSENAL
              </h2>
              {skills.map((s, i) => (
                <SkillBar key={s.name} {...s} delay={200 + i * 110} />
              ))}
            </div>
            <div>
              <div style={{ fontSize:10, letterSpacing:5, color:"#00ff4145", marginBottom:22 }}>┌─ DEV_TIMELINE</div>
              <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:18, fontWeight:900, letterSpacing:2, marginBottom:28, color:"#00ff41" }}>
                MY JOURNEY
              </h2>
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className="timeline-item"
                  onMouseEnter={() => setHoveredTimeline(i)}
                  onMouseLeave={() => setHoveredTimeline(null)}
                >
                  <div style={{
                    fontFamily:"'Orbitron',monospace", fontSize:18, fontWeight:900,
                    minWidth:52, color: hoveredTimeline===i ? "#00ff41" : "#00ff4130",
                    textShadow: hoveredTimeline===i ? "0 0 14px #00ff41" : "none",
                    transition:"all 0.3s", lineHeight:1,
                  }}>{t.year}</div>
                  <div>
                    <div style={{ fontSize:10, letterSpacing:2, color: hoveredTimeline===i ? "#00ff41" : "#00ff4170", marginBottom:5, transition:"color 0.3s" }}>
                      {t.title}
                    </div>
                    <div style={{ fontSize:11, color:"#00ff4150", lineHeight:1.9 }}>{t.desc}</div>
                  </div>
                  {hoveredTimeline===i && (
                    <div style={{ marginLeft:"auto", fontSize:14, color:"#00ff41", animation:"blink 0.8s infinite", alignSelf:"center", flexShrink:0 }}>◈</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3 — CONTACT NODES */}
          <div style={{ marginBottom:80, animation:"fadeInUp 0.6s ease 0.3s both" }}>
            <div style={{ fontSize:10, letterSpacing:5, color:"#00ff4145", marginBottom:22 }}>┌─ CONTACT_NODES</div>
            <h2 style={{ fontFamily:"'Orbitron',monospace", fontSize:18, fontWeight:900, letterSpacing:2, marginBottom:28, color:"#00ff41" }}>
              REACH ME AT
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:1, background:"#00ff410e" }}>
              {socials.map((s, i) => (
                <a
                  key={s.code}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  onMouseEnter={() => setHoveredSocial(i)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div style={{
                    width:42, height:42,
                    border:"1px solid #00ff4130",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color: hoveredSocial===i ? "#00ff41" : "#00ff4155",
                    background: hoveredSocial===i ? "rgba(0,255,65,0.08)" : "transparent",
                    transition:"all 0.25s", flexShrink:0,
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:9, letterSpacing:4, color:"#00ff4140", marginBottom:4 }}>
                      {s.code} // {s.label}
                    </div>
                    <div style={{ fontSize:12, letterSpacing:1, color: hoveredSocial===i ? "#00ff41" : "#00ff4180", transition:"color 0.2s", marginBottom:2 }}>
                      {s.handle}
                    </div>
                    <div style={{ fontSize:10, color:"#00ff4135" }}>{s.sub}</div>
                  </div>
                  <div style={{ fontSize:16, opacity: hoveredSocial===i ? 1 : 0, transition:"opacity 0.2s, transform 0.2s", transform: hoveredSocial===i ? "translateX(0)" : "translateX(-6px)", color:"#00ff41", flexShrink:0 }}>
                    →
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* SECTION 4 — PROJECT HIGHLIGHT */}
          <div style={{ marginBottom:80, animation:"fadeInUp 0.6s ease 0.35s both" }}>
            <div style={{ fontSize:10, letterSpacing:5, color:"#00ff4145", marginBottom:22 }}>┌─ FEATURED_PROJECT</div>
            <div style={{ border:"1px solid #00ff4128", background:"rgba(0,255,65,0.02)", overflow:"hidden", animation:"borderPulse 4s infinite" }}>
              <div style={{ padding:"12px 22px", borderBottom:"1px solid #00ff4118", background:"rgba(0,255,65,0.04)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:8,height:8,borderRadius:"50%",background:"#00ff41",animation:"pulseGlow 2s infinite" }} />
                  <span style={{ fontFamily:"'Orbitron',monospace", fontSize:12, letterSpacing:2 }}>INTERVIEW_OS</span>
                </div>
                <span style={{ fontSize:9, color:"#00ff4150", letterSpacing:2 }}>STATUS :: LIVE</span>
              </div>
              <div className="project-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0 }}>
                {[
                  { label:"WHAT IT DOES", text:"AI-powered platform that generates technical interview questions and evaluates answers in real time using LLM intelligence." },
                  { label:"TECH STACK", text:"Django REST Framework handles the backend AI pipeline. React.js delivers the hacker-grade terminal frontend experience." },
                  { label:"WHY I BUILT IT", text:"Technical interview prep shouldn't cost thousands. This gives every developer free access to senior-level AI feedback." },
                ].map(({ label, text }, i) => (
                  <div key={label} style={{ padding:"22px 22px", borderRight: i<2 ? "1px solid #00ff4112" : "none" }}>
                    <div style={{ fontSize:9, color:"#00ff4145", letterSpacing:3, marginBottom:12 }}>{label}</div>
                    <p style={{ fontSize:12, color:"#00ff4170", lineHeight:2 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 5 — FOOTER QUOTE */}
          <div className="footer-quote" style={{
            border:"1px solid #00ff4125", padding:"40px 36px", textAlign:"center",
            background:"rgba(0,255,65,0.02)", position:"relative", overflow:"hidden",
            animation:"borderPulse 4s infinite, fadeInUp 0.6s ease 0.4s both",
          }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,rgba(0,255,65,0.05) 0%,transparent 70%)", pointerEvents:"none" }} />
            <div style={{ fontSize:9, color:"#00ff4135", letterSpacing:5, marginBottom:16 }}>// DEVELOPER_PHILOSOPHY</div>
            <p style={{ fontFamily:"'Orbitron',monospace", fontSize:"clamp(13px,2vw,18px)", color:"#00ff4175", letterSpacing:2, lineHeight:1.9, fontStyle:"italic" }}>
              "Don't just write code that works.<br />Write code that teaches the next developer something."
            </p>
            <div style={{ marginTop:18, fontSize:10, color:"#00ff4145", letterSpacing:4 }}>— ANKUSH KUMAR PATEL</div>
            <div style={{ marginTop:6, fontSize:9, color:"#00ff4130", letterSpacing:3 }}>FULL-STACK DEVELOPER · INDIA</div>
          </div>

        </div>
      </div>
    </>
  );
}