"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function InternalTransfersPage() {
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
        * { box-sizing:border-box;margin:0;padding:0; }
        .dash-page{display:flex;min-height:100vh;font-family:'Outfit',sans-serif;transition:background 0.4s ease;}
        .dash-page.dark{background:#020817;color:white;} .dash-page.light{background:#eef2ff;color:#1e1b4b;}
        .sidebar{width:260px;min-height:100vh;padding:1.75rem 1.5rem;display:flex;flex-direction:column;border-right:1px solid;transition:all 0.4s;position:sticky;top:0;height:100vh;overflow-y:auto;}
        .dark  .sidebar{background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.08);}
        .light .sidebar{background:rgba(255,255,255,0.6);border-color:rgba(99,102,241,0.12);backdrop-filter:blur(12px);}
        .sidebar-logo{margin-bottom:2.5rem;}
        .nav-link{display:block;padding:0.5rem 0.75rem;border-radius:10px;text-decoration:none;font-size:0.9rem;transition:all 0.2s;margin-bottom:0.25rem;}
        .dark  .nav-link{color:rgba(255,255,255,0.55);} .dark  .nav-link:hover{color:white;background:rgba(255,255,255,0.06);} .dark  .nav-link.active{color:white;background:rgba(99,102,241,0.2);font-weight:600;}
        .light .nav-link{color:rgba(79,70,229,0.6);} .light .nav-link:hover{color:#4f46e5;background:rgba(99,102,241,0.08);} .light .nav-link.active{color:#4f46e5;background:rgba(99,102,241,0.12);font-weight:600;}
        .sidebar-footer{margin-top:auto;padding-top:1.5rem;border-top:1px solid;}
        .dark  .sidebar-footer{border-color:rgba(255,255,255,0.08);} .light .sidebar-footer{border-color:rgba(99,102,241,0.1);}
        .sidebar-footer-label{font-size:0.8rem;margin-bottom:0.5rem;}
        .dark  .sidebar-footer-label{color:rgba(255,255,255,0.35);} .light .sidebar-footer-label{color:rgba(79,70,229,0.5);}
        .main-content{flex:1;padding:2.5rem;overflow-y:auto;}
        .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;}
        .page-title{font-size:1.75rem;font-weight:600;}
        .dark  .page-title{color:white;} .light .page-title{color:#1e1b4b;}
        .page-subtitle{font-size:0.875rem;margin-top:0.25rem;}
        .dark  .page-subtitle{color:rgba(255,255,255,0.4);} .light .page-subtitle{color:rgba(79,70,229,0.55);}
        .topbar-right{display:flex;align-items:center;gap:0.75rem;}
        .theme-slider{width:52px;height:26px;border-radius:999px;cursor:pointer;display:flex;align-items:center;padding:3px;transition:all 0.3s ease;border:1px solid;}
        .dark  .theme-slider{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.15);}
        .light .theme-slider{background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.25);}
        .theme-knob{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;transition:all 0.3s ease;box-shadow:0 2px 6px rgba(0,0,0,0.2);}
        .dark  .theme-knob{background:white;transform:translateX(0px);} .light .theme-knob{background:linear-gradient(135deg,#6366f1,#8b5cf6);transform:translateX(26px);}
        .glass-card{border-radius:16px;padding:1.5rem;border:1px solid;transition:all 0.4s;margin-bottom:1.5rem;}
        .dark  .glass-card{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.08);box-shadow:0 4px 24px rgba(0,0,0,0.2);}
        .light .glass-card{background:rgba(255,255,255,0.6);border-color:rgba(99,102,241,0.12);box-shadow:0 4px 24px rgba(99,102,241,0.08);backdrop-filter:blur(8px);}
        .glass-input{border-radius:10px!important;font-family:'Outfit',sans-serif!important;font-size:0.9rem!important;transition:all 0.3s ease;outline:none;padding:0.55rem 0.9rem!important;}
        .dark  .glass-input{background:rgba(255,255,255,0.06)!important;border:1px solid rgba(255,255,255,0.12)!important;color:white!important;}
        .dark  .glass-input::placeholder{color:rgba(255,255,255,0.3)!important;}
        .light .glass-input{background:rgba(255,255,255,0.7)!important;border:1px solid rgba(99,102,241,0.2)!important;color:#1e1b4b!important;}
        .light .glass-input::placeholder{color:rgba(79,70,229,0.35)!important;}
        .glass-select{border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.9rem;padding:0.55rem 0.9rem;transition:all 0.3s;outline:none;cursor:pointer;}
        .dark  .glass-select{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:white;}
        .light .glass-select{background:rgba(255,255,255,0.7);border:1px solid rgba(99,102,241,0.2);color:#1e1b4b;}
        .btn-primary{padding:0.55rem 1.25rem;border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.9rem;font-weight:600;border:none;cursor:pointer;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;box-shadow:0 4px 16px rgba(99,102,241,0.3);transition:all 0.3s ease;}
        .btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(99,102,241,0.45);}
        .btn-sm{padding:0.35rem 0.85rem;border-radius:8px;font-family:'Outfit',sans-serif;font-size:0.8rem;font-weight:500;border:none;cursor:pointer;transition:all 0.2s;}
        .btn-outline-sm{padding:0.35rem 0.85rem;border-radius:8px;font-family:'Outfit',sans-serif;font-size:0.8rem;font-weight:500;cursor:pointer;background:transparent;transition:all 0.2s;}
        .dark  .btn-outline-sm{border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);}
        .light .btn-outline-sm{border:1px solid rgba(99,102,241,0.25);color:#4f46e5;}
        .filter-row{display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.5rem;}
        .table-wrap{border-radius:16px;border:1px solid;overflow:hidden;transition:all 0.4s;}
        .dark  .table-wrap{background:rgba(255,255,255,0.03);border-color:rgba(255,255,255,0.08);}
        .light .table-wrap{background:rgba(255,255,255,0.6);border-color:rgba(99,102,241,0.12);backdrop-filter:blur(8px);}
        table{width:100%;border-collapse:collapse;}
        thead tr{border-bottom:1px solid;}
        .dark  thead tr{border-color:rgba(255,255,255,0.08);} .light thead tr{border-color:rgba(99,102,241,0.1);}
        th{padding:0.85rem 1rem;text-align:left;font-size:0.8rem;font-weight:600;letter-spacing:0.04em;}
        .dark  th{color:rgba(255,255,255,0.4);} .light th{color:rgba(79,70,229,0.5);}
        td{padding:0.85rem 1rem;font-size:0.875rem;}
        .dark  td{color:rgba(255,255,255,0.8);} .light td{color:#1e1b4b;}
        tbody tr{border-bottom:1px solid;transition:background 0.2s;}
        .dark  tbody tr{border-color:rgba(255,255,255,0.05);} .dark  tbody tr:hover{background:rgba(255,255,255,0.03);}
        .light tbody tr{border-color:rgba(99,102,241,0.06);} .light tbody tr:hover{background:rgba(99,102,241,0.03);}
        tbody tr:last-child{border-bottom:none;}
        .badge{padding:0.2rem 0.65rem;border-radius:999px;font-size:0.75rem;font-weight:500;}
        .badge-yellow{background:rgba(250,204,21,0.15);color:#facc15;}
        .badge-green{background:rgba(74,222,128,0.15);color:#4ade80;}
        .section-title{font-size:1rem;font-weight:600;margin-bottom:0.75rem;}
        .dark  .section-title{color:white;} .light .section-title{color:#1e1b4b;}
        .workflow ol{padding-left:1.25rem;}
        .workflow li{font-size:0.875rem;margin-bottom:0.4rem;}
        .dark  .workflow li{color:rgba(255,255,255,0.5);} .light .workflow li{color:rgba(79,70,229,0.6);}
        .orb-bg{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
        .orb{position:absolute;border-radius:50%;filter:blur(80px);animation:floatOrb 12s ease-in-out infinite;}
        .dark  .orb-a{width:500px;height:500px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-150px;left:-100px;opacity:0.12;}
        .dark  .orb-b{width:400px;height:400px;background:radial-gradient(circle,#8b5cf6,#7c3aed);bottom:-100px;right:-100px;opacity:0.1;animation-delay:-5s;}
        .light .orb-a{width:500px;height:500px;background:radial-gradient(circle,#a5b4fc,#818cf8);top:-150px;left:-100px;opacity:0.35;}
        .light .orb-b{width:400px;height:400px;background:radial-gradient(circle,#c4b5fd,#a78bfa);bottom:-100px;right:-100px;opacity:0.3;animation-delay:-5s;}
        @keyframes floatOrb{0%,100%{transform:translate(0,0);}50%{transform:translate(20px,-20px);}}
        .content{position:relative;z-index:1;display:flex;width:100%;}
      `}</style>

      <div className={`dash-page ${dark ? "dark" : "light"}`}>
        <div className="orb-bg"><div className="orb orb-a" /><div className="orb orb-b" /></div>
        <div className="content">
          <aside className="sidebar">
            <div className="sidebar-logo"><Image src="/logo.png" alt="ManageX Logo" width={140} height={60} /></div>
            <nav>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/dashboard/products" className="nav-link">Products</Link>
              <Link href="/dashboard/receipts" className="nav-link">Receipts</Link>
              <Link href="/dashboard/delivery" className="nav-link">Delivery Orders</Link>
              <Link href="/dashboard/internal-transfers" className="nav-link active">Internal Transfers</Link>
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

          <main className="main-content">
            <div className="topbar">
              <div>
                <h1 className="page-title">Internal Transfers</h1>
                <p className="page-subtitle">Move stock between warehouses or storage locations</p>
              </div>
              <div className="topbar-right">
                <button className="btn-primary">+ Create Transfer</button>
                <div className="theme-slider" onClick={toggleTheme}>
                  <div className="theme-knob">{dark ? "🌙" : "☀️"}</div>
                </div>
              </div>
            </div>

            <div className="filter-row">
              <input className="glass-input" placeholder="Search transfer ID or product..." style={{width:"260px"}} />
              <select className="glass-select"><option>Status</option><option>Draft</option><option>Waiting</option><option>Ready</option><option>Done</option><option>Canceled</option></select>
              <select className="glass-select"><option>Source Warehouse</option><option>Main Warehouse</option><option>Production Floor</option></select>
            </div>

            <div className="table-wrap">
              <table>
                <thead><tr><th>Transfer ID</th><th>Product</th><th>From</th><th>To</th><th>Quantity</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr>
                    <td style={{fontWeight:600}}>TRF-001</td>
                    <td>Steel Rod</td><td>Main Warehouse</td><td>Production Floor</td><td>50</td>
                    <td><span className="badge badge-yellow">Waiting</span></td>
                    <td>2026-03-14</td>
                    <td style={{display:"flex",gap:"0.5rem"}}>
                      <button className="btn-outline-sm">View</button>
                      <button className="btn-sm" style={{background:"linear-gradient(135deg,#059669,#10b981)",color:"white"}}>Validate</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:600}}>TRF-002</td>
                    <td>Iron Plate</td><td>Rack A</td><td>Rack B</td><td>20</td>
                    <td><span className="badge badge-green">Done</span></td>
                    <td>2026-03-13</td>
                    <td><button className="btn-outline-sm">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="glass-card workflow">
              <p className="section-title">Transfer Workflow</p>
              <ol><li>Create internal transfer</li><li>Select product and quantity</li><li>Select source and destination location</li><li>Validate transfer → movement recorded in stock ledger</li></ol>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}