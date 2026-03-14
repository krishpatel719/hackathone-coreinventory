"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Dashboard() {
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

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-3xl font-semibold">
                        Inventory Dashboard
                    </h2>

                    <Input
                        placeholder="Search SKU / Product..."
                        className="w-72"
                    />

                </div>


                {/* KPI CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Products</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-indigo-600">
                            2450
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Low Stock</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-yellow-500">
                            12
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Receipts</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-blue-500">
                            5
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Deliveries</CardTitle>
                        </CardHeader>
                        <CardContent className="text-3xl font-bold text-red-500">
                            3
                        </CardContent>
                    </Card>

                </div>


                {/* FILTER SECTION */}
                <Card className="mb-10">

                    <CardHeader>
                        <CardTitle>Inventory Filters</CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <select className="border rounded p-2">
                            <option>Document Type</option>
                            <option>Receipts</option>
                            <option>Delivery</option>
                            <option>Internal Transfer</option>
                            <option>Adjustment</option>
                        </select>

                        <select className="border rounded p-2">
                            <option>Status</option>
                            <option>Draft</option>
                            <option>Waiting</option>
                            <option>Ready</option>
                            <option>Done</option>
                            <option>Canceled</option>
                        </select>

                        <select className="border rounded p-2">
                            <option>Warehouse</option>
                            <option>Main Warehouse</option>
                            <option>Production Floor</option>
                        </select>

                        <select className="border rounded p-2">
                            <option>Product Category</option>
                            <option>Raw Materials</option>
                            <option>Electronics</option>
                        </select>

                    </CardContent>

                </Card>


                {/* OPERATIONS */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">

                    <Card>

                        <CardHeader>
                            <CardTitle>Incoming Stock (Receipts)</CardTitle>
                        </CardHeader>

                        <CardContent>

                            <p className="text-gray-600 mb-4">
                                Receive goods from vendors and update stock automatically.
                            </p>

                            <Button className="bg-indigo-600 hover:bg-indigo-500">
                                Create Receipt
                            </Button>

                        </CardContent>

                    </Card>


                    <Card>

                        <CardHeader>
                            <CardTitle>Outgoing Stock (Delivery)</CardTitle>
                        </CardHeader>

                        <CardContent>

                            <p className="text-gray-600 mb-4">
                                Process deliveries and reduce inventory levels.
                            </p>

                            <Button className="bg-indigo-600 hover:bg-indigo-500">
                                Create Delivery
                            </Button>

                        </CardContent>

                    </Card>

                </div>


                {/* TRANSFER + ADJUSTMENT */}
                <div className="grid md:grid-cols-2 gap-6">

                    <Card>

                        <CardHeader>
                            <CardTitle>Internal Transfers</CardTitle>
                        </CardHeader>

                        <CardContent>

                            <p className="text-gray-600 mb-4">
                                Move stock between warehouses or racks.
                            </p>

                            <Button className="bg-indigo-600 hover:bg-indigo-500">
                                Transfer Stock
                            </Button>

                        </CardContent>

                    </Card>


                    <Card>

                        <CardHeader>
                            <CardTitle>Stock Adjustment</CardTitle>
                        </CardHeader>

                        <CardContent>

                            <p className="text-gray-600 mb-4">
                                Correct mismatches between recorded and physical stock.
                            </p>

                            <Button className="bg-indigo-600 hover:bg-indigo-500">
                                Adjust Inventory
                            </Button>

                        </CardContent>

                    </Card>

                </div>


            </main>

        </div>
    )
}