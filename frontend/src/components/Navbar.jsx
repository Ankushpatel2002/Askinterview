import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const GlitchText = ({ text }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {text}
      {glitch && (
        <>
          <span style={{ position:"absolute", top:0, left:"2px", color:"#ff003c", clipPath:"polygon(0 20%,100% 20%,100% 45%,0 45%)", opacity:0.9 }}>{text}</span>
          <span style={{ position:"absolute", top:0, left:"-2px", color:"#00fff9", clipPath:"polygon(0 60%,100% 60%,100% 80%,0 80%)", opacity:0.9 }}>{text}</span>
        </>
      )}
    </span>
  );
};

function Navbar() {
  const location = useLocation();
  const [time, setTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { to: "/", label: "HOME", code: "01" },
    { to: "/service", label: "SERVICE", code: "02" },
    { to: "/about", label: "ABOUT", code: "03" },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');
    @keyframes pulseGlow  { 0%,100%{box-shadow:0 0 6px #00ff4160,0 0 12px #00ff4130} 50%{box-shadow:0 0 14px #00ff4190,0 0 28px #00ff4150} }
    @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes slideDown  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scanline   { 0%{top:-10%} 100%{top:110%} }

    .nav-link {
      font-family: 'Orbitron', monospace;
      font-weight: 700;
      color: #00ff41cc;
      text-decoration: none;
      font-size: 13px;
      letter-spacing: 3px;
      padding: 10px 18px;
      position: relative;
      transition: color 0.2s, text-shadow 0.2s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .nav-link::before {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 2px;
      background: #00ff41;
      transition: width 0.3s ease;
      box-shadow: 0 0 8px #00ff41;
    }
    .nav-link:hover { color: #00ff41; text-shadow: 0 0 12px #00ff4180; }
    .nav-link:hover::before { width: 100%; }
    .nav-link.active { color: #00ff41; text-shadow: 0 0 14px #00ff4190, 0 0 28px #00ff4140; }
    .nav-link.active::before { width: 100%; }

    .nav-code {
      font-family: 'Share Tech Mono', monospace;
      font-size: 9px;
      font-weight: 400;
      opacity: 0.5;
      letter-spacing: 1px;
    }

    .hamburger-line {
      width: 22px; height: 2px;
      background: #00ff41;
      transition: all 0.3s ease;
      box-shadow: 0 0 4px #00ff4180;
    }

    .mobile-menu { animation: slideDown 0.25s ease; }

    .mobile-nav-link {
      font-family: 'Orbitron', monospace;
      font-weight: 700;
      color: #00ff41bb;
      text-decoration: none;
      font-size: 14px;
      letter-spacing: 4px;
      padding: 16px 28px;
      display: flex;
      align-items: center;
      gap: 14px;
      border-bottom: 1px solid #00ff4118;
      transition: all 0.2s;
    }
    .mobile-nav-link:hover {
      color: #00ff41;
      background: rgba(0,255,65,0.06);
      padding-left: 38px;
      text-shadow: 0 0 10px #00ff4170;
    }
    .mobile-nav-link.active {
      color: #00ff41;
      background: rgba(0,255,65,0.05);
      text-shadow: 0 0 14px #00ff4190;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .nav-clock   { display: none !important; }
      .nav-divider { display: none !important; }
    }
    @media (min-width: 769px) {
      .mobile-menu     { display: none !important; }
      .hamburger-btn   { display: none !important; }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <nav style={{
        position: "sticky", top: 0, zIndex: 1000,
        background: scrolled ? "rgba(0,4,0,0.97)" : "rgba(0,2,0,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #00ff4128",
        boxShadow: scrolled ? "0 4px 30px rgba(0,255,65,0.08)" : "none",
        transition: "all 0.3s ease",
        fontFamily: "'Share Tech Mono', monospace",
      }}>

        {/* Scan sweep */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px", pointerEvents: "none",
          background: "linear-gradient(90deg,transparent,#00ff4125,#00ff4155,#00ff4125,transparent)",
          animation: "scanline 5s linear infinite", zIndex: 2,
        }} />

        <div style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "0 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 66,
        }}>

          {/* ── LOGO ── */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{
              width: 34, height: 34,
              border: "1px solid #00ff41",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              animation: "pulseGlow 2.5s infinite",
              flexShrink: 0,
            }}>
              <div style={{ width: 10, height: 10, background: "#00ff41", boxShadow: "0 0 8px #00ff41" }} />
              <div style={{ position:"absolute", top:3, left:3, right:3, bottom:3, border:"1px solid #00ff4135" }} />
            </div>
            <span style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 13, fontWeight: 900,
              letterSpacing: 3, color: "#00ff41",
              textShadow: "0 0 12px #00ff4160",
              whiteSpace: "nowrap",
            }}>
              <GlitchText text="INTERVIEW_OS" />
            </span>
          </Link>

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {navLinks.map(({ to, label, code }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link${isActive ? " active" : ""}`}
                >
                  <span className="nav-code">{code}</span>
                  {label}
                  {isActive && (
                    <span style={{ fontSize: 11, animation:"blink 1s infinite", marginLeft:2, color:"#00ff41" }}>█</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* ── RIGHT: CLOCK + HAMBURGER ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <div className="nav-clock" style={{
              fontSize: 12,
              color: "#00ff4170",
              letterSpacing: 2,
              fontVariantNumeric: "tabular-nums",
              fontFamily: "'Share Tech Mono', monospace",
              whiteSpace: "nowrap",
            }}>
              {time}
            </div>
            <div className="nav-divider" style={{ width: 1, height: 22, background: "#00ff4125" }} />
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen(o => !o)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 6 }}
              aria-label="Toggle menu"
            >
              <div className="hamburger-line" style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <div className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "none" }} />
              <div className="hamburger-line" style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* ── MOBILE DROPDOWN MENU ── */}
        {menuOpen && (
          <div className="mobile-menu" style={{
            borderTop: "1px solid #00ff4120",
            background: "rgba(0,3,0,0.98)",
          }}>
            <div style={{ padding: "10px 0 20px" }}>
              <div style={{ padding: "8px 28px 14px", fontSize: 9, color: "#00ff4135", letterSpacing: 5, fontFamily:"'Share Tech Mono',monospace" }}>
                ── NAVIGATION_MAP ──
              </div>
              {navLinks.map(({ to, label, code }) => {
                const isActive = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`mobile-nav-link${isActive ? " active" : ""}`}
                  >
                    <span style={{ fontSize: 9, color: "#00ff4140", fontFamily:"'Share Tech Mono',monospace", fontWeight:400 }}>
                      {code}//
                    </span>
                    {label}
                    {isActive && (
                      <span style={{ marginLeft:"auto", fontSize:10, color:"#00ff41", animation:"blink 1s infinite", fontFamily:"'Share Tech Mono',monospace", fontWeight:400 }}>
                        █ CURRENT
                      </span>
                    )}
                  </Link>
                );
              })}
              <div style={{ padding: "14px 28px 4px", fontSize: 11, color: "#00ff4150", letterSpacing: 3, fontFamily:"'Share Tech Mono',monospace" }}>
                SYS_TIME :: {time}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;