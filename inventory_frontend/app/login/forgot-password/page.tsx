"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ForgotPassword() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function validate() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email))
      return "Please enter a valid email address."

    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
    if (!pwRegex.test(newPassword))
      return "Password must be 8+ characters with uppercase, lowercase, and a special character."

    if (newPassword !== confirmPassword)
      return "Passwords do not match."

    return ""
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/api/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, new_password: newPassword }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || "Failed to reset password. Please try again.")
      } else {
        router.push("/login")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800">

      <div className="flex justify-center mb-6">
        <Image src="/logo.png" alt="ManageX Logo" width={180} height={80} />
      </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Your Password
        </h2>

        <p className="text-sm text-slate-400 text-center mb-6">
          Enter your email and set a new password to regain access to your account.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <p className="text-xs text-slate-500 mt-1 ml-1">
              8+ chars, uppercase, lowercase &amp; special character
            </p>
          </div>

          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>

        </form>

        <p className="text-sm text-center mt-6 text-slate-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:underline"
          >
            Back to Login
          </Link>
        </p>

      </div>

    </div>
  )
}
