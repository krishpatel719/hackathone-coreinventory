"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to ManageX
        </h2>

        <form className="space-y-4">

          <Input type="email" placeholder="Email Address" />

          <div>
            <Input type="password" placeholder="Password" />

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