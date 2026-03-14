"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Your Password
        </h2>

        <p className="text-sm text-slate-400 text-center mb-6">
          Enter your email and set a new password to regain access to your account.
        </p>

        <form className="space-y-4">

          <Input
            type="email"
            placeholder="Email Address"
            required
          />

          <Input
            type="password"
            placeholder="New Password"
            required
          />

          <Input
            type="password"
            placeholder="Confirm New Password"
            required
          />

          <Button className="w-full bg-indigo-600 hover:bg-indigo-500">
            Reset Password
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