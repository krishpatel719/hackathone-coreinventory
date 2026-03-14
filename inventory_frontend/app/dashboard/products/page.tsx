"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProductsPage() {

  const [showForm, setShowForm] = useState(false)

  const [products, setProducts] = useState<any[]>([])

  const [productData, setProductData] = useState({
    name: "",
    sku: "",
    category_id: "",
    unit: "",
    warehouse_id: "",
    quantity: ""
  })

  const fetchProducts = async () => {

    const res = await fetch("/api/dashboard/products/get-products")

    const data = await res.json()

    if (res.ok) {
      setProducts(data.products)
    }

  }

  useEffect(() => {
    fetchProducts()
  }, [])


  const handleAddProduct = async () => {

    const res = await fetch("/api/dashboard/products/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    })

    const data = await res.json()

    if (res.ok) {

      setShowForm(false)

      fetchProducts() // reload products

    } else {
      alert("Error adding product")
    }

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


      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        <div className="flex justify-between mb-8">

          <div>
            <h1 className="text-3xl font-semibold">Products</h1>
            <p className="text-gray-500 text-sm">
              Manage your inventory products
            </p>
          </div>

          <Button onClick={() => setShowForm(true)}>
            + Add Product
          </Button>

        </div>


        {/* PRODUCT TABLE */}
        <div className="bg-white border rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">SKU</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Unit</th>
                <th className="p-4 text-left">Stock</th>

              </tr>

            </thead>

            <tbody>

              {products.map((p, i) => (

                <tr key={i} className="border-t">

                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{p.sku}</td>
                  <td className="p-4">{p.category_id}</td>
                  <td className="p-4">{p.unit}</td>
                  <td className="p-4">{p.quantity}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>


      {/* ADD PRODUCT MODAL */}
      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-96">

            <h2 className="text-xl font-semibold mb-4">
              Add Product
            </h2>

            <Input
              placeholder="Name"
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />

            <Input
              className="mt-2"
              placeholder="SKU"
              onChange={(e) =>
                setProductData({ ...productData, sku: e.target.value })
              }
            />

            <Input
              className="mt-2"
              placeholder="Category ID"
              onChange={(e) =>
                setProductData({ ...productData, category_id: e.target.value })
              }
            />

            <Input
              className="mt-2"
              placeholder="Unit"
              onChange={(e) =>
                setProductData({ ...productData, unit: e.target.value })
              }
            />

            <Input
              className="mt-2"
              placeholder="Warehouse ID"
              onChange={(e) =>
                setProductData({ ...productData, warehouse_id: e.target.value })
              }
            />

            <Input
              className="mt-2"
              placeholder="Quantity"
              onChange={(e) =>
                setProductData({ ...productData, quantity: e.target.value })
              }
            />

            <div className="flex gap-3 mt-4">

              <Button onClick={handleAddProduct}>
                Add
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}