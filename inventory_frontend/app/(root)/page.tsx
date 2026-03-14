import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-tight">ManageX</h1>

        <div className="hidden md:flex gap-8 text-slate-300">
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
          <a href="#" className="hover:text-white transition">Pricing</a>
        </div>

        <Button className="bg-indigo-600 hover:bg-indigo-500">
          Get Started
        </Button>
      </nav>


      {/* HERO SECTION */}
      <section className="px-8 py-28 text-center max-w-6xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Smart Inventory <br />
          <span className="text-indigo-500">
            Management Platform
          </span>
        </h1>

        <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
          ManageX helps businesses track products, manage warehouses,
          monitor stock movements, and streamline inventory operations
          in real time.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">

          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Start Managing
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 bg-transparent text-white hover:bg-slate-800"
            >
            View Demo
          </Button>

        </div>

      </section>


      {/* FEATURES SECTION */}
      <section className="px-8 py-24 max-w-7xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Powerful Inventory Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <Card className="bg-slate-900 border border-slate-800 hover:border-indigo-500 transition">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Product Management
              </CardTitle>
            </CardHeader>

            <CardContent className="text-slate-400 text-sm">
              Create and organize products with SKUs, categories,
              and real-time stock visibility across warehouses.
            </CardContent>
          </Card>


          <Card className="bg-slate-900 border border-slate-800 hover:border-indigo-500 transition">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Warehouse Tracking
              </CardTitle>
            </CardHeader>

            <CardContent className="text-slate-400 text-sm">
              Track stock movement between warehouses, racks,
              and production locations with complete traceability.
            </CardContent>
          </Card>


          <Card className="bg-slate-900 border border-slate-800 hover:border-indigo-500 transition">
            <CardHeader>
              <CardTitle className="text-white text-lg">
                Smart Analytics
              </CardTitle>
            </CardHeader>

            <CardContent className="text-slate-400 text-sm">
              Monitor inventory insights, low-stock alerts,
              and operational metrics in real-time dashboards.
            </CardContent>
          </Card>

        </div>

      </section>



      {/* DASHBOARD PREVIEW */}
      <section className="px-8 py-24 bg-slate-900 border-y border-slate-800">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-4xl font-semibold mb-6">
              Complete Inventory Control
            </h2>

            <p className="text-slate-400 mb-6">
              ManageX centralizes all inventory operations into one intuitive
              dashboard. Track product movements, manage stock levels,
              and monitor warehouse activity without spreadsheets
              or manual logs.
            </p>

            <Button className="bg-indigo-600 hover:bg-indigo-500">
              Explore Dashboard
            </Button>

          </div>


          {/* Dashboard Preview Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-lg">

            <p className="text-slate-400 text-sm mb-4">
              Dashboard Preview
            </p>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-400">Total Products</span>
                <span className="text-white font-semibold">2,450</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Low Stock Alerts</span>
                <span className="text-yellow-400 font-semibold">12</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Pending Deliveries</span>
                <span className="text-indigo-400 font-semibold">5</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Internal Transfers</span>
                <span className="text-green-400 font-semibold">7</span>
              </div>

            </div>

          </div>

        </div>

      </section>



      {/* CTA */}
      <section className="text-center px-8 py-24 max-w-4xl mx-auto">

        <h2 className="text-4xl font-semibold mb-6">
          Start Managing Your Inventory Today
        </h2>

        <p className="text-slate-400 mb-10">
          Replace spreadsheets and manual stock tracking with
          ManageX — a modern inventory management platform built
          for efficiency and scalability.
        </p>

        <Button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-500"
        >
          Get Started with ManageX
        </Button>

      </section>



      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">

        © {new Date().getFullYear()} ManageX. All rights reserved.

      </footer>

    </main>
  )
}