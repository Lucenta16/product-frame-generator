import Link from "next/link";
import {
  ArrowRight,
  Image as ImageIcon,
  Zap,
  Shield,
  CheckCircle,
  Sparkles,
  Download,
  Palette,
} from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <nav className="border-b border-slate-200/60 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <ImageIcon className="relative h-9 w-9 text-white bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Product Frame Generator
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <Link
                href="/dashboard"
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105">
                <span className="relative z-10">Open App</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden min-h-[85vh] flex items-center">
          {/* Background decorations */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>

          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-6 animate-fade-in">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">
                Trusted by 1000+ sellers worldwide
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Product Images
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your product photos with custom frames, badges, and
              marketplace-compliant sizing.
              <span className="font-semibold text-slate-900">
                {" "}
                Export in seconds.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
              <Link
                href="/dashboard"
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-base shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all hover:scale-105 w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Start Creating Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link
                href="#features"
                className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-bold text-base hover:border-slate-300 hover:bg-slate-50 transition-all hover:scale-105 w-full sm:w-auto">
                See How It Works
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">No Signup Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Open Source</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                succeed
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional tools designed for modern e-commerce sellers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="group relative bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: "0ms" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Process and export images in seconds with our optimized canvas
                  engine. No waiting, just results.
                </p>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Marketplace Ready
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Automatic sizing for Amazon, eBay, and more. Always compliant,
                  always perfect.
                </p>
              </div>
            </div>

            <div className="group relative bg-white p-8 rounded-3xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Custom Branding
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Add frames, borders, and badge overlays to make your products
                  stand out from the competition.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Built for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Every Marketplace
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Optimized presets for the world's largest e-commerce platforms
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="group relative bg-white border-2 border-blue-200 rounded-3xl p-10 hover:shadow-2xl hover:border-blue-400 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-black text-white">A</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">
                      Amazon
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-lg">
                        <strong className="text-slate-900">Standard:</strong>{" "}
                        1000x1000 (minimum zoom)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-lg">
                        <strong className="text-slate-900">HD:</strong>{" "}
                        2000x2000 (recommended)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-lg">
                        Perfect 1:1 aspect ratio
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="group relative bg-white border-2 border-blue-200 rounded-3xl p-10 hover:shadow-2xl hover:border-blue-400 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-black text-white">e</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">eBay</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-lg">
                        <strong className="text-slate-900">Standard:</strong>{" "}
                        1600x1600 (recommended)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-lg">
                        <strong className="text-slate-900">Lightweight:</strong>{" "}
                        1000x1000
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-lg">
                        Perfect 1:1 aspect ratio
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-[3rem] p-16 text-center text-white overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full mb-8">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  Limited Time Offer
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                Ready to Transform Your
                <br />
                Product Images?
              </h2>
              <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
                Join 1000+ sellers creating professional marketplace images in
                minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/sign-up"
                  className="group relative px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all hover:scale-105 shadow-2xl w-full sm:w-auto">
                  <span className="flex items-center gap-3 justify-center">
                    Get Started Free
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <div className="flex items-center gap-2 text-blue-100">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">No credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-50"></div>
                <ImageIcon className="relative h-8 w-8 text-white bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-xl" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                SellerVisuals
              </span>
            </div>
            <div className="text-center md:text-right text-slate-600">
              <p className="font-medium">
                &copy; 2024 SellerVisuals. All rights reserved.
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Professional product images for modern sellers
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
