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

          <Link
            href="/dashboard/adjustment"
            className="block font-medium text-indigo-600"
          >
            Internal Transfers
          </Link>

           <Link href="/dashboard/adjustment" className="block hover:text-indigo-600">
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
              Internal Transfers
            </h1>

            <p className="text-gray-500 text-sm">
              Move stock between warehouses or storage locations
            </p>

          </div>

          <Button className="bg-indigo-600 hover:bg-indigo-500">
            + Create Transfer
          </Button>

        </div>


        {/* SEARCH + FILTER */}
        <div className="flex gap-4 mb-6 flex-wrap">

          <Input
            placeholder="Search transfer ID or product..."
            className="max-w-sm"
          />

          <select className="border rounded-md p-2 text-sm">
            <option>Status</option>
            <option>Draft</option>
            <option>Waiting</option>
            <option>Ready</option>
            <option>Done</option>
            <option>Canceled</option>
          </select>

          <select className="border rounded-md p-2 text-sm">
            <option>Source Warehouse</option>
            <option>Main Warehouse</option>
            <option>Production Floor</option>
          </select>

        </div>


        {/* TRANSFER TABLE */}
        <div className="bg-white shadow-sm border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600">

              <tr>

                <th className="p-4 text-left">Transfer ID</th>

                <th className="p-4 text-left">Product</th>

                <th className="p-4 text-left">From</th>

                <th className="p-4 text-left">To</th>

                <th className="p-4 text-left">Quantity</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Date</th>

                <th className="p-4 text-left">Actions</th>

              </tr>

            </thead>


            <tbody>

              {/* Transfer 1 */}
              <tr className="border-t">

                <td className="p-4 font-medium">
                  TRF-001
                </td>

                <td className="p-4">
                  Steel Rod
                </td>

                <td className="p-4">
                  Main Warehouse
                </td>

                <td className="p-4">
                  Production Floor
                </td>

                <td className="p-4">
                  50
                </td>

                <td className="p-4">

                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                    Waiting
                  </span>

                </td>

                <td className="p-4">
                  2026-03-14
                </td>

                <td className="p-4 flex gap-2">

                  <Button variant="outline" size="sm">
                    View
                  </Button>

                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-500"
                  >
                    Validate
                  </Button>

                </td>

              </tr>


              {/* Transfer 2 */}
              <tr className="border-t">

                <td className="p-4 font-medium">
                  TRF-002
                </td>

                <td className="p-4">
                  Iron Plate
                </td>

                <td className="p-4">
                  Rack A
                </td>

                <td className="p-4">
                  Rack B
                </td>

                <td className="p-4">
                  20
                </td>

                <td className="p-4">

                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                    Done
                  </span>

                </td>

                <td className="p-4">
                  2026-03-13
                </td>

                <td className="p-4 flex gap-2">

                  <Button variant="outline" size="sm">
                    View
                  </Button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>


        {/* TRANSFER PROCESS INFO */}
        <div className="mt-10 bg-white border rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-3">
            Transfer Workflow
          </h2>

          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">

            <li>Create internal transfer</li>

            <li>Select product and quantity</li>

            <li>Select source and destination location</li>

            <li>Validate transfer → movement recorded in stock ledger</li>

          </ol>

        </div>

      </main>

    </div>
  )
}