"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function Dashboard() {
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dash-page { display:flex;min-height:100vh;font-family:'Outfit',sans-serif;transition:background 0.4s ease; }
        .dash-page.dark  { background:#020817;color:white; }
        .dash-page.light { background:#eef2ff;color:#1e1b4b; }

        /* SIDEBAR */
        .sidebar { width:260px;min-height:100vh;padding:1.75rem 1.5rem;display:flex;flex-direction:column;border-right:1px solid;transition:all 0.4s;position:sticky;top:0;height:100vh;overflow-y:auto; }
        .dark  .sidebar { background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.08); }
        .light .sidebar { background:rgba(255,255,255,0.6);border-color:rgba(99,102,241,0.12);backdrop-filter:blur(12px); }

        .sidebar-logo { margin-bottom:2.5rem; }
        .nav-link { display:block;padding:0.5rem 0.75rem;border-radius:10px;text-decoration:none;font-size:0.9rem;transition:all 0.2s;margin-bottom:0.25rem; }
        .dark  .nav-link { color:rgba(255,255,255,0.55); }
        .dark  .nav-link:hover { color:white;background:rgba(255,255,255,0.06); }
        .dark  .nav-link.active { color:white;background:rgba(99,102,241,0.2);font-weight:600; }
        .light .nav-link { color:rgba(79,70,229,0.6); }
        .light .nav-link:hover { color:#4f46e5;background:rgba(99,102,241,0.08); }
        .light .nav-link.active { color:#4f46e5;background:rgba(99,102,241,0.12);font-weight:600; }

        .sidebar-footer { margin-top:auto;padding-top:1.5rem;border-top:1px solid; }
        .dark  .sidebar-footer { border-color:rgba(255,255,255,0.08); }
        .light .sidebar-footer { border-color:rgba(99,102,241,0.1); }
        .sidebar-footer-label { font-size:0.8rem;margin-bottom:0.5rem; }
        .dark  .sidebar-footer-label { color:rgba(255,255,255,0.35); }
        .light .sidebar-footer-label { color:rgba(79,70,229,0.5); }

        /* MAIN */
        .main-content { flex:1;padding:2.5rem;overflow-y:auto; }

        /* TOPBAR */
        .topbar { display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem; }
        .page-title { font-size:1.75rem;font-weight:600; }
        .dark  .page-title { color:white; }
        .light .page-title { color:#1e1b4b; }
        .topbar-right { display:flex;align-items:center;gap:0.75rem; }

        /* Theme toggle slider */
        .theme-slider { width:52px;height:26px;border-radius:999px;cursor:pointer;display:flex;align-items:center;padding:3px;transition:all 0.3s ease;border:1px solid; }
        .dark  .theme-slider { background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15); }
        .light .theme-slider { background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.25); }
        .theme-knob { width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;transition:all 0.3s ease;box-shadow:0 2px 6px rgba(0,0,0,0.2); }
        .dark  .theme-knob { background:white;transform:translateX(0px); }
        .light .theme-knob { background:linear-gradient(135deg,#6366f1,#8b5cf6);transform:translateX(26px); }

        /* GLASS CARD */
        .glass-card { border-radius:16px;padding:1.5rem;border:1px solid;transition:all 0.4s; }
        .dark  .glass-card { background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08);box-shadow:0 4px 24px rgba(0,0,0,0.2); }
        .light .glass-card { background:rgba(255,255,255,0.6);border-color:rgba(99,102,241,0.12);box-shadow:0 4px 24px rgba(99,102,241,0.08);backdrop-filter:blur(8px); }

        /* KPI CARDS */
        .kpi-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.25rem;margin-bottom:1.75rem; }
        .kpi-card { border-radius:16px;padding:1.25rem 1.5rem;border:1px solid;transition:all 0.3s; }
        .dark  .kpi-card { background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08); }
        .light .kpi-card { background:rgba(255,255,255,0.65);border-color:rgba(99,102,241,0.12);backdrop-filter:blur(8px); }
        .kpi-label { font-size:0.82rem;margin-bottom:0.5rem; }
        .dark  .kpi-label { color:rgba(255,255,255,0.45); }
        .light .kpi-label { color:rgba(79,70,229,0.6); }
        .kpi-value { font-size:2rem;font-weight:700; }

        /* INPUT */
        .glass-input { border-radius:10px!important;font-family:'Outfit',sans-serif!important;font-size:0.9rem!important;transition:all 0.3s ease;outline:none;padding:0.55rem 0.9rem!important; }
        .dark  .glass-input { background:rgba(255,255,255,0.06)!important;border:1px solid rgba(255,255,255,0.12)!important;color:white!important; }
        .dark  .glass-input::placeholder { color:rgba(255,255,255,0.3)!important; }
        .light .glass-input { background:rgba(255,255,255,0.7)!important;border:1px solid rgba(99,102,241,0.2)!important;color:#1e1b4b!important; }
        .light .glass-input::placeholder { color:rgba(79,70,229,0.35)!important; }

        /* SELECT */
        .glass-select { border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.9rem;padding:0.55rem 0.9rem;transition:all 0.3s;outline:none;cursor:pointer; }
        .dark  .glass-select { background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:white; }
        .light .glass-select { background:rgba(255,255,255,0.7);border:1px solid rgba(99,102,241,0.2);color:#1e1b4b; }

        /* BUTTON */
        .btn-primary { padding:0.55rem 1.25rem;border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:600;border:none;cursor:pointer;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;box-shadow:0 4px 16px rgba(99,102,241,0.3);transition:all 0.3s ease;position:relative;overflow:hidden; }
        .btn-primary:hover { transform:translateY(-1px);box-shadow:0 6px 20px rgba(99,102,241,0.45); }
        .btn-outline { padding:0.55rem 1.25rem;border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:500;cursor:pointer;background:transparent;transition:all 0.3s ease; }
        .dark  .btn-outline { border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7); }
        .dark  .btn-outline:hover { background:rgba(255,255,255,0.06); }
        .light .btn-outline { border:1px solid rgba(99,102,241,0.25);color:#4f46e5; }
        .light .btn-outline:hover { background:rgba(99,102,241,0.06); }

        /* SECTION TITLE */
        .section-title { font-size:1rem;font-weight:600;margin-bottom:1rem; }
        .dark  .section-title { color:white; }
        .light .section-title { color:#1e1b4b; }
        .section-desc { font-size:0.875rem;margin-bottom:1.25rem; }
        .dark  .section-desc { color:rgba(255,255,255,0.45); }
        .light .section-desc { color:rgba(79,70,229,0.6); }

        .two-col { display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.75rem; }
        @media(max-width:768px){ .two-col{grid-template-columns:1fr;} }

        /* ORB BG */
        .orb-bg { position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden; }
        .orb { position:absolute;border-radius:50%;filter:blur(80px);animation:floatOrb 12s ease-in-out infinite; }
        .dark  .orb-a { width:500px;height:500px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-150px;left:-100px;opacity:0.12;animation-delay:0s; }
        .dark  .orb-b { width:400px;height:400px;background:radial-gradient(circle,#8b5cf6,#7c3aed);bottom:-100px;right:-100px;opacity:0.1;animation-delay:-5s; }
        .light .orb-a { width:500px;height:500px;background:radial-gradient(circle,#a5b4fc,#818cf8);top:-150px;left:-100px;opacity:0.35;animation-delay:0s; }
        .light .orb-b { width:400px;height:400px;background:radial-gradient(circle,#c4b5fd,#a78bfa);bottom:-100px;right:-100px;opacity:0.3;animation-delay:-5s; }
        @keyframes floatOrb { 0%,100%{transform:translate(0,0);}50%{transform:translate(20px,-20px);} }
        .content { position:relative;z-index:1;display:flex;width:100%; }

        /* FILTER ROW */
        .filter-row { display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.5rem; }
      `}</style>

      <div className={`dash-page ${dark ? "dark" : "light"}`}>
        <div className="orb-bg">
          <div className="orb orb-a" /><div className="orb orb-b" />
        </div>

        <div className="content">
          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-logo">
              <Image src="/logo.png" alt="ManageX Logo" width={140} height={60} />
            </div>
            <nav>
              <Link href="/dashboard" className="nav-link active">Dashboard</Link>
              <Link href="/dashboard/products" className="nav-link">Products</Link>
              <Link href="/dashboard/receipts" className="nav-link">Receipts</Link>
              <Link href="/dashboard/delivery" className="nav-link">Delivery Orders</Link>
              <Link href="/dashboard/internal-transfers" className="nav-link">Internal Transfers</Link>
              <Link href="/dashboard/adjustment" className="nav-link">Inventory Adjustment</Link>
              <Link href="/dashboard/history" className="nav-link">Move History</Link>
              <Link href="/dashboard/settings" className="nav-link">Warehouse Settings</Link>
            </nav>
            <div className="sidebar-footer">
              <p className="sidebar-footer-label">Profile</p>
              <Link href="/dashboard/profile" className="nav-link">My Profile</Link>
              <Link href="/login" className="nav-link">Logout</Link>
            </div>
          </aside>

          {/* MAIN */}
          <main className="main-content">
            <div className="topbar">
              <h1 className="page-title">Inventory Dashboard</h1>
              <div className="topbar-right">
                <input className="glass-input" placeholder="Search SKU / Product..." style={{width:"220px"}} />
                <div className="theme-slider" onClick={toggleTheme}>
                  <div className="theme-knob">{dark ? "🌙" : "☀️"}</div>
                </div>
              </div>
            </div>

            {/* KPI */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <p className="kpi-label">Total Products</p>
                <p className="kpi-value" style={{color:"#818cf8"}}>2,450</p>
              </div>
              <div className="kpi-card">
                <p className="kpi-label">Low Stock</p>
                <p className="kpi-value" style={{color:"#facc15"}}>12</p>
              </div>
              <div className="kpi-card">
                <p className="kpi-label">Pending Receipts</p>
                <p className="kpi-value" style={{color:"#60a5fa"}}>5</p>
              </div>
              <div className="kpi-card">
                <p className="kpi-label">Pending Deliveries</p>
                <p className="kpi-value" style={{color:"#f87171"}}>3</p>
              </div>
            </div>

            {/* FILTERS */}
            <div className="glass-card" style={{marginBottom:"1.75rem"}}>
              <p className="section-title">Inventory Filters</p>
              <div className="filter-row">
                <select className="glass-select">
                  <option>Document Type</option>
                  <option>Receipts</option>
                  <option>Delivery</option>
                  <option>Internal Transfer</option>
                  <option>Adjustment</option>
                </select>
                <select className="glass-select">
                  <option>Status</option>
                  <option>Draft</option>
                  <option>Waiting</option>
                  <option>Ready</option>
                  <option>Done</option>
                  <option>Canceled</option>
                </select>
                <select className="glass-select">
                  <option>Warehouse</option>
                  <option>Main Warehouse</option>
                  <option>Production Floor</option>
                </select>
                <select className="glass-select">
                  <option>Product Category</option>
                  <option>Raw Materials</option>
                  <option>Electronics</option>
                </select>
              </div>
            </div>

            {/* OPERATIONS */}
            <div className="two-col">
              <div className="glass-card">
                <p className="section-title">📥 Incoming Stock (Receipts)</p>
                <p className="section-desc">Receive goods from vendors and update stock automatically.</p>
                <button className="btn-primary">Create Receipt</button>
              </div>
              <div className="glass-card">
                <p className="section-title">📤 Outgoing Stock (Delivery)</p>
                <p className="section-desc">Process deliveries and reduce inventory levels.</p>
                <button className="btn-primary">Create Delivery</button>
              </div>
            </div>

            <div className="two-col">
              <div className="glass-card">
                <p className="section-title">🔄 Internal Transfers</p>
                <p className="section-desc">Move stock between warehouses or racks.</p>
                <button className="btn-primary">Transfer Stock</button>
              </div>
              <div className="glass-card">
                <p className="section-title">⚖️ Stock Adjustment</p>
                <p className="section-desc">Correct mismatches between recorded and physical stock.</p>
                <button className="btn-primary">Adjust Inventory</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}