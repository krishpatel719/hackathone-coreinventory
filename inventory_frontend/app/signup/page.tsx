"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Signup() {
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    loginId: "",
    email: "",
    contactNumber: "",
    password: "",
    rePassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function validate() {
    const { loginId, email, password, rePassword } = form

    if (loginId.length < 6 || loginId.length > 12)
      return "Login ID must be between 6 and 12 characters."

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email))
      return "Please enter a valid email address."

    // Password: min 8 chars, at least one lowercase, one uppercase, one special char
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
    if (!pwRegex.test(password))
      return "Password must be 8+ characters with uppercase, lowercase, and a special character."

    if (password !== rePassword)
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
      const res = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          login_id: form.loginId,
          email: form.email,
          contact_number: form.contactNumber,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        // Show backend error (e.g. duplicate login_id or email)
        setError(data?.message || "Signup failed. Please try again.")
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
          Create ManageX Account
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>

          <Input placeholder="First Name" value={form.firstName} onChange={set("firstName")} required />

          <Input placeholder="Last Name" value={form.lastName} onChange={set("lastName")} required />

          <div>
            <Input
              placeholder="Login ID (6–12 characters)"
              value={form.loginId}
              onChange={set("loginId")}
              minLength={6}
              maxLength={12}
              required
            />
            <p className="text-xs text-slate-500 mt-1 ml-1">Must be unique and 6–12 characters</p>
          </div>

          <Input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={set("email")}
            required
          />

          <Input
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={set("contactNumber")}
          />

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={set("password")}
              required
            />
            <p className="text-xs text-slate-500 mt-1 ml-1">
              8+ chars, uppercase, lowercase &amp; special character
            </p>
          </div>

          <Input
            type="password"
            placeholder="Re-Enter Password"
            value={form.rePassword}
            onChange={set("rePassword")}
            required
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

        </form>

        <p className="text-sm text-center mt-4 text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}
