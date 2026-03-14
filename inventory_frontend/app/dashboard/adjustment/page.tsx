"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdjustmentPage() {
  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col">

        <h1 className="text-2xl font-bold mb-10 text-indigo-600">
          ManageX
        </h1>

        <nav className="space-y-4 text-gray-700">

          <Link href="/dashboard" className="block hover:text-indigo-600">
            Dashboard
          </Link>

          <Link href="/dashboard/products" className="block hover:text-indigo-600">
            Products
          </Link>

          <Link href="/dashboard/receipts" className="block hover:text-indigo-600">
            Receipts
          </Link>

          <Link href="/dashboard/delivery" className="block hover:text-indigo-600">
            Delivery Orders
          </Link>

          <Link href="/dashboard/transfer" className="block hover:text-indigo-600">
            Internal Transfers
          </Link>

          <Link
            href="/dashboard/adjustment"
            className="block font-medium text-indigo-600"
          >
            Inventory Adjustment
          </Link>

          <Link href="/dashboard/history" className="block hover:text-indigo-600">
            Move History
          </Link>

          <Link href="/dashboard/settings" className="block hover:text-indigo-600">
            Warehouse Settings
          </Link>

        </nav>

        <div className="mt-auto pt-10 border-t">

          <p className="text-sm text-gray-600">Profile</p>

          <div className="mt-2 space-y-2 text-sm">

            <Link href="/dashboard/profile" className="block hover:text-indigo-600">
              My Profile
            </Link>

            <Link href="/login" className="block hover:text-indigo-600">
              Logout
            </Link>

          </div>

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        {/* PAGE HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-semibold text-gray-800">
              Inventory Adjustment
            </h1>

            <p className="text-gray-500 text-sm">
              Correct mismatches between recorded stock and physical inventory
            </p>

          </div>

        </div>


        {/* ADJUSTMENT FORM */}
        <div className="bg-white border shadow-sm rounded-xl p-6 mb-8">

          <h2 className="text-lg font-semibold mb-4">
            Create Stock Adjustment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <select className="border rounded-md p-2 text-sm">
              <option>Select Product</option>
              <option>Steel Rod</option>
              <option>Iron Plate</option>
            </select>

            <select className="border rounded-md p-2 text-sm">
              <option>Select Warehouse</option>
              <option>Main Warehouse</option>
              <option>Production Floor</option>
            </select>

            <Input placeholder="Recorded Quantity" />

            <Input placeholder="Counted Quantity" />

          </div>

          <div className="mt-4">

            <Input placeholder="Reason (damage, loss, correction...)" />

          </div>

          <div className="mt-6">

            <Button className="bg-indigo-600 hover:bg-indigo-500">
              Apply Adjustment
            </Button>

          </div>

        </div>


        {/* ADJUSTMENT HISTORY TABLE */}
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600">

              <tr>

                <th className="p-4 text-left">Adjustment ID</th>

                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-left">Warehouse</th>

                <th className="p-4 text-left">Recorded Qty</th>

                <th className="p-4 text-left">Counted Qty</th>

                <th className="p-4 text-left">Difference</th>

                <th className="p-4 text-left">Reason</th>

                <th className="p-4 text-left">Date</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t">

                <td className="p-4 font-medium">
                  ADJ-001
                </td>

                <td className="p-4">
                  Steel Rod
                </td>

                <td className="p-4">
                  Main Warehouse
                </td>

                <td className="p-4">
                  100
                </td>

                <td className="p-4">
                  97
                </td>

                <td className="p-4 text-red-600 font-semibold">
                  -3
                </td>

                <td className="p-4">
                  Damaged items
                </td>

                <td className="p-4">
                  2026-03-14
                </td>

              </tr>


              <tr className="border-t">

                <td className="p-4 font-medium">
                  ADJ-002
                </td>

                <td className="p-4">
                  Iron Plate
                </td>

                <td className="p-4">
                  Production Floor
                </td>

                <td className="p-4">
                  50
                </td>

                <td className="p-4">
                  55
                </td>

                <td className="p-4 text-green-600 font-semibold">
                  +5
                </td>

                <td className="p-4">
                  Stock recount
                </td>

                <td className="p-4">
                  2026-03-13
                </td>

              </tr>

            </tbody>

          </table>

        </div>


        {/* PROCESS EXPLANATION */}
        <div className="mt-10 bg-white border rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-3">
            Adjustment Workflow
          </h2>

          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">

            <li>Select product and warehouse</li>

            <li>Enter recorded stock and counted stock</li>

            <li>System calculates the difference</li>

            <li>Adjustment is applied and logged in stock ledger</li>

          </ol>

        </div>

      </main>

    </div>
  )
}