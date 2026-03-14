"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Login() {
  const router = useRouter()
  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
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

  function validate() {
    if (!loginId.trim()) return "Login ID is required."
    if (loginId.length < 6 || loginId.length > 12) return "Login ID must be between 6 and 12 characters."
    if (!password) return "Password is required."
    return ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const validationError = validate()
    if (validationError) { setError(validationError); return }
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_id: loginId, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || "Invalid Login ID or Password")
      } else {
        if (data?.token) localStorage.setItem("auth_token", data.token)
        router.push("/dashboard")
      }
    } catch {
      setError("Invalid Login ID or Password")
    } finally {
      setLoading(false)
    }
  }

  const d = dark

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .glass-page { min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;font-family:'Outfit',sans-serif;transition:background 0.4s ease; }
        .glass-page.dark  { background:#020817; }
        .glass-page.light { background:#eef2ff; }
        .orb { position:absolute;border-radius:50%;filter:blur(80px);animation:floatOrb 10s ease-in-out infinite; }
        .dark  .orb-1 { width:500px;height:500px;background:radial-gradient(circle,#6366f1,#4f46e5);top:-150px;left:-150px;opacity:0.35;animation-delay:0s; }
        .dark  .orb-2 { width:400px;height:400px;background:radial-gradient(circle,#8b5cf6,#7c3aed);bottom:-120px;right:-100px;opacity:0.35;animation-delay:-4s; }
        .dark  .orb-3 { width:300px;height:300px;background:radial-gradient(circle,#06b6d4,#0891b2);top:40%;left:60%;opacity:0.18;animation-delay:-7s; }
        .light .orb-1 { width:500px;height:500px;background:radial-gradient(circle,#a5b4fc,#818cf8);top:-150px;left:-150px;opacity:0.45;animation-delay:0s; }
        .light .orb-2 { width:400px;height:400px;background:radial-gradient(circle,#c4b5fd,#a78bfa);bottom:-120px;right:-100px;opacity:0.4;animation-delay:-4s; }
        .light .orb-3 { width:300px;height:300px;background:radial-gradient(circle,#67e8f9,#22d3ee);top:40%;left:60%;opacity:0.25;animation-delay:-7s; }
        @keyframes floatOrb { 0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-30px) scale(1.05);}66%{transform:translate(-20px,20px) scale(0.97);} }
        .grid-overlay { position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px);background-size:50px 50px; }
        .theme-toggle { position:fixed;top:1.25rem;right:1.25rem;z-index:100;width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.25rem;transition:all 0.3s ease;box-shadow:0 4px 16px rgba(0,0,0,0.2); }
        .dark  .theme-toggle { background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12); }
        .light .theme-toggle { background:rgba(255,255,255,0.7);backdrop-filter:blur(12px);border:1px solid rgba(99,102,241,0.2); }
        .theme-toggle:hover { transform:scale(1.1) rotate(15deg); }
        .glass-card { position:relative;z-index:10;width:100%;max-width:440px;padding:2.5rem;border-radius:24px;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);animation:slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both;transition:background 0.4s ease,border 0.4s ease,box-shadow 0.4s ease; }
        .dark  .glass-card { background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);box-shadow:0 8px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.08); }
        .light .glass-card { background:rgba(255,255,255,0.55);border:1px solid rgba(99,102,241,0.15);box-shadow:0 8px 32px rgba(99,102,241,0.12),inset 0 1px 0 rgba(255,255,255,0.8); }
        @keyframes slideUp { from{opacity:0;transform:translateY(32px) scale(0.97);}to{opacity:1;transform:translateY(0) scale(1);} }
        .glass-title { font-size:1.6rem;font-weight:600;text-align:center;background-size:200% 200%;animation:shimmerText 3s ease-in-out infinite alternate;margin-bottom:1.5rem;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .dark  .glass-title { background-image:linear-gradient(135deg,#fff 0%,#a5b4fc 50%,#818cf8 100%); }
        .light .glass-title { background-image:linear-gradient(135deg,#1e1b4b 0%,#4f46e5 50%,#7c3aed 100%); }
        @keyframes shimmerText { 0%{background-position:0% 50%;}100%{background-position:100% 50%;} }
        .logo-wrap { display:flex;justify-content:center;margin-bottom:1.5rem;animation:fadeDown 0.5s ease 0.1s both;opacity:0; }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-16px);}to{opacity:1;transform:translateY(0);} }
        .glass-input-wrap { animation:fadeInLeft 0.4s ease both;opacity:0; }
        .glass-input-wrap:nth-child(1){animation-delay:0.2s;} .glass-input-wrap:nth-child(2){animation-delay:0.3s;} .glass-input-wrap:nth-child(3){animation-delay:0.4s;}
        @keyframes fadeInLeft { from{opacity:0;transform:translateX(-12px);}to{opacity:1;transform:translateX(0);} }
        .glass-input { width:100%;border-radius:12px!important;padding:0.65rem 1rem!important;font-family:'Outfit',sans-serif!important;font-size:0.925rem!important;transition:all 0.3s ease;outline:none; }
        .dark  .glass-input { background:rgba(255,255,255,0.06)!important;border:1px solid rgba(255,255,255,0.12)!important;color:white!important; }
        .dark  .glass-input::placeholder { color:rgba(255,255,255,0.35)!important; }
        .dark  .glass-input:focus { background:rgba(255,255,255,0.09)!important;border-color:rgba(99,102,241,0.6)!important;box-shadow:0 0 0 3px rgba(99,102,241,0.15)!important; }
        .light .glass-input { background:rgba(255,255,255,0.7)!important;border:1px solid rgba(99,102,241,0.2)!important;color:#1e1b4b!important; }
        .light .glass-input::placeholder { color:rgba(79,70,229,0.4)!important; }
        .light .glass-input:focus { background:rgba(255,255,255,0.9)!important;border-color:rgba(99,102,241,0.5)!important;box-shadow:0 0 0 3px rgba(99,102,241,0.1)!important; }
        .glass-btn { width:100%;padding:0.72rem;border-radius:12px;font-family:'Outfit',sans-serif;font-size:0.95rem;font-weight:600;letter-spacing:0.03em;border:none;cursor:pointer;position:relative;overflow:hidden;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;box-shadow:0 4px 24px rgba(99,102,241,0.35);transition:all 0.3s ease;animation:fadeInLeft 0.4s ease 0.5s both;opacity:0; }
        .glass-btn:hover { transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,0.5); }
        .glass-btn:disabled { opacity:0.6;cursor:not-allowed;transform:none; }
        .glass-btn::after { content:'';position:absolute;top:-50%;left:-60%;width:40%;height:200%;background:rgba(255,255,255,0.18);transform:skewX(-20deg);transition:left 0.5s ease; }
        .glass-btn:hover::after { left:130%; }
        .error-box { margin-bottom:1rem;padding:0.75rem 1rem;border-radius:12px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);color:#ef4444;font-size:0.85rem;text-align:center;animation:shake 0.4s ease; }
        @keyframes shake { 0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);} }
        .forgot-link { font-size:0.82rem;text-decoration:none;float:right;margin-top:0.4rem;transition:color 0.2s; }
        .dark  .forgot-link { color:#a5b4fc; } .dark  .forgot-link:hover { color:#c7d2fe; }
        .light .forgot-link { color:#4f46e5; } .light .forgot-link:hover { color:#7c3aed; }
        .footer-text { font-size:0.85rem;text-align:center;margin-top:1.25rem;animation:fadeInLeft 0.4s ease 0.6s both;opacity:0; }
        .dark  .footer-text { color:rgba(255,255,255,0.4); }
        .light .footer-text { color:rgba(79,70,229,0.6); }
        .dark  .footer-text a { color:#a5b4fc; } .dark  .footer-text a:hover { color:#e0e7ff; }
        .light .footer-text a { color:#4f46e5; } .light .footer-text a:hover { color:#7c3aed; }
        .footer-text a { text-decoration:none;transition:color 0.2s; }
        .divider-line { height:1px;margin:1.25rem 0;transition:background 0.4s; }
        .dark  .divider-line { background:rgba(255,255,255,0.07); }
        .light .divider-line { background:rgba(99,102,241,0.12); }
      `}</style>

      <div className={`glass-page ${d ? "dark" : "light"}`}>
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="grid-overlay" />

        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {d ? "☀️" : "🌙"}
        </button>

        <div className="glass-card">
          <div className="logo-wrap">
            <Image src="/logo.png" alt="ManageX Logo" width={160} height={72} />
          </div>

          <h2 className="glass-title">Login to ManageX</h2>

          {error && <div className="error-box">{error}</div>}

          <form style={{display:"flex",flexDirection:"column",gap:"1rem"}} onSubmit={handleSubmit}>
            <div className="glass-input-wrap">
              <input className="glass-input" placeholder="Login ID" value={loginId}
                onChange={(e) => setLoginId(e.target.value)} minLength={6} maxLength={12} required />
            </div>
            <div className="glass-input-wrap">
              <input className="glass-input" type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
              <div><Link href="/login/forgot-password" className="forgot-link">Forgot Password?</Link></div>
              <div style={{clear:"both"}} />
            </div>
            <div className="glass-input-wrap">
              <button type="submit" className="glass-btn" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="divider-line" />
          <p className="footer-text">
            Don&apos;t have an account?{" "}<Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  )
}