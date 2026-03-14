"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Signup() {

  const router = useRouter()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    contact_number: "",
    password: ""
  })

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (res.ok) {
      alert("Signup successful")
       // Redirect to dashboard
      router.push("/dashboard")
    } else {
      alert("Signup failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create ManageX Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <Input
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
          />

          <Input
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
          />

          <Input
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <Input
            name="contact_number"
            placeholder="Contact Number"
            onChange={handleChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <Button className="w-full bg-indigo-600 hover:bg-indigo-500">
            Sign Up
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