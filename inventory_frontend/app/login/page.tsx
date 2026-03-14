"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Login() {
  const router = useRouter()

  const [loginId, setLoginId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function validate() {
    if (!loginId.trim()) return "Login ID is required."
    if (loginId.length < 6 || loginId.length > 12)
      return "Login ID must be between 6 and 12 characters."
    if (!password) return "Password is required."
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
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_id: loginId, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || "Invalid Login ID or Password")
      } else {
        if (data?.token) {
          localStorage.setItem("auth_token", data.token)
        }
        router.push("/dashboard")
      }
    } catch {
      setError("Invalid Login ID or Password")
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
          Login to ManageX
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          <Input
            placeholder="Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            minLength={6}
            maxLength={12}
            required
          />

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="text-right mt-2">
              <Link
                href="/login/forgot-password"
                className="text-sm text-indigo-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>

        </form>

        <p className="text-sm text-center mt-4 text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  )
}
