"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create ManageX Account
        </h2>

        <form className="space-y-4">

          <Input placeholder="First Name" />

          <Input placeholder="Last Name" />

          <Input placeholder="Username" />

          <Input type="email" placeholder="Email Address" />

          <Input placeholder="Contact Number" />

          <Input type="password" placeholder="Password" />

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