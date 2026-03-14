"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductsPage() {
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

          <Link href="/dashboard/products" className="block font-medium text-indigo-600">
            Products
          </Link>

          <Link href="/dashboard/receipts" className="block hover:text-indigo-600">
            Receipts
          </Link>

          <Link href="/dashboard/delivery" className="block hover:text-indigo-600">
            Delivery Orders
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
              Products
            </h1>

            <p className="text-gray-500 text-sm">
              Manage your inventory products and stock availability
            </p>
          </div>

          <Button className="bg-indigo-600 hover:bg-indigo-500">
            + Add Product
          </Button>

        </div>


        {/* SEARCH + FILTERS */}
        <div className="flex flex-wrap gap-4 mb-6">

          <Input
            placeholder="Search by product name or SKU..."
            className="max-w-sm"
          />

          <select className="border rounded-md p-2 text-sm">
            <option>All Categories</option>
            <option>Raw Materials</option>
            <option>Electronics</option>
            <option>Components</option>
          </select>

          <select className="border rounded-md p-2 text-sm">
            <option>Warehouse</option>
            <option>Main Warehouse</option>
            <option>Production Floor</option>
          </select>

        </div>


        {/* PRODUCT TABLE */}
        <div className="bg-white shadow-sm border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600">

              <tr>
                <th className="p-4 text-left">Product Name</th>
                <th className="p-4 text-left">SKU</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Unit</th>
                <th className="p-4 text-left">Warehouse</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Reorder Level</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>

            </thead>


            <tbody>

              {/* ROW 1 */}
              <tr className="border-t">

                <td className="p-4 font-medium">Steel Rod</td>

                <td className="p-4">STL-001</td>

                <td className="p-4">Raw Materials</td>

                <td className="p-4">Kg</td>

                <td className="p-4">Main Warehouse</td>

                <td className="p-4 text-green-600 font-semibold">100</td>

                <td className="p-4">20</td>

                <td className="p-4">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                    In Stock
                  </span>
                </td>

                <td className="p-4 flex gap-2">

                  <Button variant="outline" size="sm">
                    Edit
                  </Button>

                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>

                </td>

              </tr>


              {/* ROW 2 */}
              <tr className="border-t">

                <td className="p-4 font-medium">Iron Plate</td>

                <td className="p-4">IRN-002</td>

                <td className="p-4">Raw Materials</td>

                <td className="p-4">Units</td>

                <td className="p-4">Production Floor</td>

                <td className="p-4 text-yellow-600 font-semibold">12</td>

                <td className="p-4">20</td>

                <td className="p-4">
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                    Low Stock
                  </span>
                </td>

                <td className="p-4 flex gap-2">

                  <Button variant="outline" size="sm">
                    Edit
                  </Button>

                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>
  )
}