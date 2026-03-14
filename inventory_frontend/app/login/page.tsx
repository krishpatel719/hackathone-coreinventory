"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Login() {

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (res.ok) {
      router.push("/dashboard")
    } else {
      alert(data.error || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to ManageX
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <div>

            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
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

          <Button className="w-full bg-indigo-600 hover:bg-indigo-500">
            Login
          </Button>

        </form>

        <p className="text-sm text-center mt-4 text-slate-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  )
}