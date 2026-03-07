import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import {
  Home,
  BookOpen,
  Gamepad2,
  Menu,
  X,
  LogOut,
  Languages,
  Scroll,
  MapPin,
  Settings,
  Pencil,
  BarChart3,
  BookMarked } from
"lucide-react";
import PointsToast from "@/components/gamification/PointsToast";
import { Button } from "@/components/ui/button";

const navItems = [
{ name: "Ballina", page: "Home", icon: Home },
{ name: "Alfabeti", page: "Alphabet", icon: Languages },
{ name: "Kur'ani", page: "Quran", icon: BookOpen },
{ name: "Texhuidi", page: "Tajweed", icon: BookMarked },
{ name: "Umra & Haxhi", page: "UmraHajj", icon: MapPin },
{ name: "Lojëra", page: "Games", icon: Gamepad2 },
{ name: "Fikh Elementar", page: "FE", icon: BookOpen },
{ name: "Progresi", page: "Progress", icon: BarChart3 },
{ name: "Cilësimet", page: "Settings", icon: Settings },
{ name: "Fjalë Admin", page: "WordsAdmin", icon: Settings, adminOnly: true }];


export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEditMode, setAdminEditMode] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const authed = await base44.auth.isAuthenticated();
        setIsAuthenticated(authed);
        if (authed) {
          const u = await base44.auth.me();
          setUser(u);
          setIsAdmin(u?.role === "admin");
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    };
    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/40">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to={createPageUrl("Home")} className="flex items-center gap-2.5">
            <div className="bg-slate-400 rounded-xl w-9 h-9 gradient-primary flex items-center justify-center shadow-md">
              <Scroll className="bg-emerald-600 text-white lucide lucide-scroll w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-emerald-800 tracking-tight">Edukim Interaktiv</span>
              <p className="text-[10px] text-emerald-500 -mt-1 font-medium">Mëso & Luaj</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.filter((item) => !item.adminOnly || isAdmin).map((item) => {
              const Icon = item.icon;
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ?
                  "bg-emerald-600 text-white shadow-md shadow-emerald-200" :
                  "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"}`
                  }>

                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>);

            })}
  
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ?
            <div className="hidden sm:flex items-center gap-2">
                {isAdmin &&
              <Button
                size="sm"
                onClick={() => setAdminEditMode((m) => !m)}
                className={`rounded-xl text-xs font-bold gap-1.5 ${adminEditMode ? "bg-amber-500 hover:bg-amber-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}>

                    <Pencil className="w-3.5 h-3.5" />
                    {adminEditMode ? "Edit: ON" : "Edit"}
                  </Button>
              }
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
                  {user?.full_name?.[0] || "U"}
                </div>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => base44.auth.logout()}
                className="text-gray-500 hover:text-red-500">

                  <LogOut className="w-4 h-4" />
                </Button>
              </div> :

            <Button
              size="sm"
              onClick={() => base44.auth.redirectToLogin()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">

                Hyr / Regjistrohu
              </Button>
            }

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-emerald-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>

              {mobileOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen &&
        <div className="lg:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-md">
            <nav className="px-4 py-3 space-y-1">
              {navItems.filter((item) => !item.adminOnly || isAdmin).map((item) => {
              const Icon = item.icon;
              const isActive = currentPageName === item.page;
              return (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive ?
                  "bg-emerald-600 text-white" :
                  "text-gray-600 hover:bg-emerald-50"}`
                  }>

                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>);

            })}

            </nav>
          </div>
        }
      </header>

      {/* Admin edit mode banner */}
      {adminEditMode &&
      <div className="bg-amber-500 text-white text-center py-1.5 text-xs font-bold z-40 sticky top-16">
          ✏️ Modaliteti i Editimit është aktiv — Admini mund të ndryshojë çdo opsion
        </div>
      }

      {/* Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {React.isValidElement(children) ?
        React.cloneElement(children, { adminEditMode, isAdmin }) :
        children}
      </main>

      {/* Floating admin edit button */}
      {isAdmin && adminEditMode &&
      <div className="fixed bottom-6 right-6 z-50">
          <Link to={createPageUrl("Settings")}
        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-2xl shadow-2xl font-bold text-sm transition-all">
            ⚙️ Admin Panel
          </Link>
        </div>
      }
      <PointsToast />

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white/60 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2026 Edukim Interaktiv — Platformë edukative për alfabetin, texhuidin dhe Kuranin
          </p>
        </div>
      </footer>
    </div>);

}