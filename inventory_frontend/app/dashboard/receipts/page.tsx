"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ReceiptsPage() {

  const [showForm, setShowForm] = useState(false)

  const [receipts, setReceipts] = useState<any[]>([])

  const [formData, setFormData] = useState({
    supplier_name: "",
    warehouse_id: "",
    product_id: "",
    quantity: ""
  })

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const fetchReceipts = async () => {

    const res = await fetch("/api/dashboard/receipts/get-receipts")
    const data = await res.json()

    setReceipts(data.receipts || [])
  }

  useEffect(() => {
    fetchReceipts()
  }, [])

  const handleSubmit = async (e: any) => {

    e.preventDefault()

    const res = await fetch("/api/dashboard/receipts/add-receipt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()

    alert(data.message || data.error)

    setShowForm(false)

    fetchReceipts()   // refresh table
  }

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col">

                <h1 className="text-2xl font-bold mb-10 text-indigo-600">
                    ManageX
                </h1>


                <nav className="space-y-4 text-gray-700">

                    <Link
                        href="/dashboard"
                        className="block font-medium hover:text-indigo-600"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/dashboard/products"
                        className="block hover:text-indigo-600"
                    >
                        Products
                    </Link>

                    <Link
                        href="/dashboard/receipts"
                        className="block hover:text-indigo-600"
                    >
                        Receipts
                    </Link>

                    <Link
                        href="/dashboard/delivery"
                        className="block hover:text-indigo-600"
                    >
                        Delivery Orders
                    </Link>

                    <Link
                        href="/dashboard/internal-transfers"
                        className="block hover:text-indigo-600"
                    >
                        Internal Transfers
                    </Link>

                    <Link
                        href="/dashboard/adjustment"
                        className="block hover:text-indigo-600"
                    >
                        Inventory Adjustment
                    </Link>

                    <Link
                        href="/dashboard/history"
                        className="block hover:text-indigo-600"
                    >
                        Move History
                    </Link>

                    <Link
                        href="/dashboard/settings"
                        className="block hover:text-indigo-600"
                    >
                        Warehouse Settings
                    </Link>

                </nav>

                <div className="mt-auto pt-10 border-t">

                    <p className="text-sm text-gray-600">Profile</p>

                    <div className="mt-2 space-y-2 text-sm">
                        <a className="block hover:text-indigo-600">My Profile</a>
                        <a className="block hover:text-indigo-600">Logout</a>
                    </div>

                </div>

            </aside>


      {/* MAIN */}
      <main className="flex-1 p-10">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-semibold">
              Receipts (Incoming Goods)
            </h1>
          </div>

          <Button
            className="bg-indigo-600"
            onClick={() => setShowForm(true)}
          >
            + Create Receipt
          </Button>

        </div>


        {/* FORM */}
        {showForm && (

          <div className="bg-white border rounded-xl p-6 mb-6">

            <form onSubmit={handleSubmit} className="space-y-4">

              <Input
                name="supplier_name"
                placeholder="Supplier Name"
                onChange={handleChange}
                required
              />

              <Input
                name="warehouse_id"
                placeholder="Warehouse ID"
                onChange={handleChange}
                required
              />

              <Input
                name="product_id"
                placeholder="Product ID"
                onChange={handleChange}
                required
              />

              <Input
                name="quantity"
                type="number"
                placeholder="Quantity"
                onChange={handleChange}
                required
              />

              <div className="flex gap-3">

                <Button type="submit" className="bg-green-600">
                  Save Receipt
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>

              </div>

            </form>

          </div>

        )}


        {/* RECEIPTS TABLE */}
        <div className="bg-white shadow-sm border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-4 text-left">Receipt ID</th>
                <th className="p-4 text-left">Supplier</th>
                <th className="p-4 text-left">Warehouse</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Created</th>
              </tr>

            </thead>

            <tbody>

              {receipts.map((r) => (

                <tr key={r.id} className="border-t">

                  <td className="p-4 font-medium">
                    RCPT-{r.id}
                  </td>

                  <td className="p-4">
                    {r.supplier_name}
                  </td>

                  <td className="p-4">
                    {r.warehouse_name}
                  </td>

                  <td className="p-4">
                    {r.status}
                  </td>

                  <td className="p-4">
                    {r.created_at}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  )
}