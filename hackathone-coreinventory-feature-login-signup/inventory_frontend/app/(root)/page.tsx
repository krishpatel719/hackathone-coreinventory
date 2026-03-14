"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved) setDark(saved === "dark")
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  const d = dark

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .home-page { font-family: 'Outfit', sans-serif; transition: background 0.4s ease, color 0.4s ease; min-height: 100vh; }
        .home-page.dark  { background: #020817; color: white; }
        .home-page.light { background: #eef2ff; color: #1e1b4b; }

        /* NAVBAR */
        .navbar { display:flex;align-items:center;justify-content:space-between;padding:1.25rem 2rem;border-bottom:1px solid;transition:border-color 0.4s; }
        .dark  .navbar { border-color: #1e293b; }
        .light .navbar { border-color: rgba(99,102,241,0.15); background: rgba(255,255,255,0.4); backdrop-filter: blur(12px); }

        .nav-links { display:flex;gap:2rem;font-size:0.95rem; }
        .dark  .nav-links a { color: #94a3b8; } .dark  .nav-links a:hover { color: white; }
        .light .nav-links a { color: #4f46e5; } .light .nav-links a:hover { color: #1e1b4b; }
        .nav-links a { text-decoration:none;transition:color 0.2s; }

        /* Theme toggle */
        .theme-toggle { width:42px;height:42px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.2rem;transition:all 0.3s ease;box-shadow:0 4px 16px rgba(0,0,0,0.15); }
        .dark  .theme-toggle { background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12); }
        .light .theme-toggle { background:rgba(255,255,255,0.8);border:1px solid rgba(99,102,241,0.2); }
        .theme-toggle:hover { transform:scale(1.1) rotate(15deg); }

        /* HERO */
        .hero { padding:7rem 2rem;text-align:center;max-width:72rem;margin:0 auto; }
        .hero h1 { font-size:clamp(2.5rem,6vw,4rem);font-weight:700;line-height:1.15;margin-bottom:1.5rem; }
        .dark  .hero h1 { color: white; }
        .light .hero h1 { color: #1e1b4b; }
        .hero-accent { color: #6366f1; }
        .hero p { font-size:1.1rem;max-width:42rem;margin:0 auto 2.5rem; }
        .dark  .hero p { color: #94a3b8; }
        .light .hero p { color: #4f46e5; opacity: 0.7; }
        .hero-btns { display:flex;justify-content:center;gap:1rem;flex-wrap:wrap; }

        /* Buttons */
        .btn-primary { padding:0.75rem 1.75rem;border-radius:12px;font-family:'Outfit',sans-serif;font-size:0.95rem;font-weight:600;border:none;cursor:pointer;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;box-shadow:0 4px 20px rgba(99,102,241,0.35);transition:all 0.3s ease;text-decoration:none;display:inline-block; }
        .btn-primary:hover { transform:translateY(-2px);box-shadow:0 8px 28px rgba(99,102,241,0.5); }
        .btn-outline { padding:0.75rem 1.75rem;border-radius:12px;font-family:'Outfit',sans-serif;font-size:0.95rem;font-weight:600;cursor:pointer;background:transparent;transition:all 0.3s ease;text-decoration:none;display:inline-block; }
        .dark  .btn-outline { border:1px solid #475569;color:white; } .dark  .btn-outline:hover { background:#1e293b; }
        .light .btn-outline { border:1px solid rgba(99,102,241,0.3);color:#4f46e5; } .light .btn-outline:hover { background:rgba(99,102,241,0.08); }

        /* FEATURES */
        .features { padding:6rem 2rem;max-width:80rem;margin:0 auto; }
        .section-title { font-size:2rem;font-weight:600;text-align:center;margin-bottom:4rem; }
        .cards-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem; }
        .feat-card { border-radius:16px;padding:2rem;transition:all 0.3s ease;border:1px solid; }
        .dark  .feat-card { background:#0f172a;border-color:#1e293b; } .dark  .feat-card:hover { border-color:#6366f1; }
        .light .feat-card { background:rgba(255,255,255,0.6);border-color:rgba(99,102,241,0.15);backdrop-filter:blur(8px); } .light .feat-card:hover { border-color:#6366f1;box-shadow:0 8px 24px rgba(99,102,241,0.1); }
        .feat-card h3 { font-size:1.1rem;font-weight:600;margin-bottom:0.75rem; }
        .dark  .feat-card h3 { color:white; } .light .feat-card h3 { color:#1e1b4b; }
        .feat-card p { font-size:0.9rem;line-height:1.6; }
        .dark  .feat-card p { color:#94a3b8; } .light .feat-card p { color:#4f46e5;opacity:0.7; }
        .feat-icon { font-size:2rem;margin-bottom:1rem; }

        /* DASHBOARD PREVIEW */
        .preview-section { padding:6rem 2rem;border-top:1px solid;border-bottom:1px solid;transition:border-color 0.4s,background 0.4s; }
        .dark  .preview-section { background:#0f172a;border-color:#1e293b; }
        .light .preview-section { background:rgba(238,242,255,0.8);border-color:rgba(99,102,241,0.1); }
        .preview-inner { max-width:72rem;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center; }
        @media(max-width:768px){ .preview-inner{grid-template-columns:1fr;} }
        .preview-inner h2 { font-size:2.25rem;font-weight:600;margin-bottom:1.25rem; }
        .preview-inner p { font-size:1rem;line-height:1.7;margin-bottom:1.5rem; }
        .dark  .preview-inner p { color:#94a3b8; } .light .preview-inner p { color:#4f46e5;opacity:0.7; }
        .preview-card { border-radius:16px;padding:2rem;border:1px solid;transition:all 0.4s; }
        .dark  .preview-card { background:#020817;border-color:#1e293b; }
        .light .preview-card { background:rgba(255,255,255,0.7);border-color:rgba(99,102,241,0.15);backdrop-filter:blur(8px); }
        .preview-card p.label { font-size:0.85rem;margin-bottom:1rem; }
        .dark  .preview-card p.label { color:#64748b; } .light .preview-card p.label { color:#6366f1;opacity:0.7; }
        .stat-row { display:flex;justify-content:space-between;padding:0.6rem 0;border-bottom:1px solid; }
        .dark  .stat-row { border-color:#1e293b; } .light .stat-row { border-color:rgba(99,102,241,0.08); }
        .stat-row:last-child { border-bottom:none; }
        .stat-label { font-size:0.9rem; }
        .dark  .stat-label { color:#94a3b8; } .light .stat-label { color:#4f46e5;opacity:0.7; }
        .stat-val { font-size:0.9rem;font-weight:600; }

        /* CTA */
        .cta-section { text-align:center;padding:6rem 2rem;max-width:56rem;margin:0 auto; }
        .cta-section h2 { font-size:2.25rem;font-weight:600;margin-bottom:1.25rem; }
        .cta-section p { font-size:1rem;margin-bottom:2.5rem; }
        .dark  .cta-section p { color:#94a3b8; } .light .cta-section p { color:#4f46e5;opacity:0.7; }

        /* FOOTER */
        .footer { border-top:1px solid;padding:2rem;text-align:center;font-size:0.875rem;transition:all 0.4s; }
        .dark  .footer { border-color:#1e293b;color:#475569; }
        .light .footer { border-color:rgba(99,102,241,0.1);color:#818cf8; }

        /* Orbs for light mode flair */
        .orb-bg { position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden; }
        .orb { position:absolute;border-radius:50%;filter:blur(80px);animation:floatOrb 12s ease-in-out infinite; }
        .dark  .orb-a { width:600px;height:600px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-200px;left:-200px;opacity:0.15;animation-delay:0s; }
        .dark  .orb-b { width:500px;height:500px;background:radial-gradient(circle,#8b5cf6,#7c3aed);bottom:-150px;right:-150px;opacity:0.12;animation-delay:-5s; }
        .light .orb-a { width:600px;height:600px;background:radial-gradient(circle,#a5b4fc,#818cf8);top:-200px;left:-200px;opacity:0.4;animation-delay:0s; }
        .light .orb-b { width:500px;height:500px;background:radial-gradient(circle,#c4b5fd,#a78bfa);bottom:-150px;right:-150px;opacity:0.35;animation-delay:-5s; }
        @keyframes floatOrb { 0%,100%{transform:translate(0,0);}50%{transform:translate(30px,-30px);} }

        .content { position:relative;z-index:1; }
      `}</style>

      <div className={`home-page ${d ? "dark" : "light"}`}>
        <div className="orb-bg">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
        </div>

        <div className="content">

          {/* NAVBAR */}
          <nav className="navbar">
            <div style={{width:"48px",height:"48px",borderRadius:"50%",overflow:"hidden",border:"1px solid #475569"}}>
              <Image src="/logo.png" alt="ManageX Logo" width={48} height={48} style={{objectFit:"cover",width:"100%",height:"100%"}} />
            </div>

            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="/dashboard">Dashboard</a>
              <a href="#cta">Pricing</a>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
              <div onClick={toggleTheme} style={{
                  width: "56px", height: "28px", borderRadius: "999px", cursor: "pointer",
                  background: dark ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.2)",
                  border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(99,102,241,0.3)",
                  display: "flex", alignItems: "center", padding: "3px",
                  transition: "all 0.3s ease", position: "relative"
                }}>
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: dark ? "white" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    transform: dark ? "translateX(0px)" : "translateX(28px)",
                    transition: "transform 0.3s ease, background 0.3s ease",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
                  }}>
                    {dark ? "🌙" : "☀️"}
                  </div>
                </div>
              <Link href="/login" className="btn-primary">Get Started</Link>
            </div>
          </nav>

          {/* HERO */}
          <section className="hero">
            <h1>
              Smart Inventory <br />
              <span className="hero-accent">Management Platform</span>
            </h1>
            <p>
              ManageX helps businesses track products, manage warehouses,
              monitor stock movements, and streamline inventory operations in real time.
            </p>
            <div className="hero-btns">
              <Link href="/login" className="btn-primary">Start Managing</Link>
              <Link href="/dashboard" className="btn-outline">View Demo</Link>
            </div>
          </section>

          {/* FEATURES */}
          <section id="features" className="features">
            <h2 className="section-title">Powerful Inventory Features</h2>
            <div className="cards-grid">
              <div className="feat-card">
                <div className="feat-icon">📦</div>
                <h3>Product Management</h3>
                <p>Create and organize products with SKUs, categories, and real-time stock visibility across warehouses.</p>
              </div>
              <div className="feat-card">
                <div className="feat-icon">🏭</div>
                <h3>Warehouse Tracking</h3>
                <p>Track stock movement between warehouses, racks, and production locations with complete traceability.</p>
              </div>
              <div className="feat-card">
                <div className="feat-icon">📊</div>
                <h3>Smart Analytics</h3>
                <p>Monitor inventory insights, low-stock alerts, and operational metrics in real-time dashboards.</p>
              </div>
            </div>
          </section>

          {/* DASHBOARD PREVIEW */}
          <section className="preview-section">
            <div className="preview-inner">
              <div>
                <h2>Complete Inventory Control</h2>
                <p>
                  ManageX centralizes all inventory operations into one intuitive dashboard.
                  Track product movements, manage stock levels, and monitor warehouse activity
                  without spreadsheets or manual logs.
                </p>
                <Link href="/dashboard" className="btn-primary">Explore Dashboard</Link>
              </div>
              <div className="preview-card">
                <p className="label">Dashboard Preview</p>
                <div>
                  <div className="stat-row">
                    <span className="stat-label">Total Products</span>
                    <span className="stat-val" style={{color:"white"}}>2,450</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Low Stock Alerts</span>
                    <span className="stat-val" style={{color:"#facc15"}}>12</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Pending Deliveries</span>
                    <span className="stat-val" style={{color:"#818cf8"}}>5</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Internal Transfers</span>
                    <span className="stat-val" style={{color:"#4ade80"}}>7</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section id="cta" className="cta-section">
            <h2>Start Managing Your Inventory Today</h2>
            <p>
              Replace spreadsheets and manual stock tracking with ManageX —
              a modern inventory management platform built for efficiency and scalability.
            </p>
            <Link href="/signup" className="btn-primary">Get Started with ManageX</Link>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            © {new Date().getFullYear()} ManageX. All rights reserved.
          </footer>

        </div>
      </div>
    </>
  )
}