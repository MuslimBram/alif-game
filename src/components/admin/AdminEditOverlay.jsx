import React from "react";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2, Settings } from "lucide-react";

/**
 * Reusable admin edit overlay panel.
 * Usage: <AdminEditOverlay show={adminEditMode && isAdmin} items={[...]} />
 * items: [{ label, href?, onClick?, icon? }]
 */
export default function AdminEditOverlay({ show, title = "Edito Faqen", items = [] }) {
  if (!show) return null;

  return (
    <div className="fixed top-24 left-4 z-50 bg-white border-2 border-amber-400 rounded-2xl shadow-xl p-3 min-w-[190px]">
      <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
        <Pencil className="w-3 h-3" /> {title}
      </p>
      <div className="space-y-1">
        {items.map((item, i) => {
          const content = (
            <span className="flex items-center gap-2 text-xs text-gray-700 hover:text-emerald-700 font-semibold py-1.5 px-2 rounded-lg hover:bg-emerald-50 transition-all w-full text-left">
              {item.icon || "▶"} {item.label}
            </span>
          );
          if (item.href) return <Link key={i} to={item.href}>{content}</Link>;
          if (item.onClick) return <button key={i} onClick={item.onClick} className="w-full">{content}</button>;
          return <div key={i}>{content}</div>;
        })}
        <Link to={createPageUrl("AdminPanel")}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 py-1.5 px-2 rounded-lg hover:bg-gray-50 mt-1 border-t border-gray-100 pt-2">
          <Settings className="w-3 h-3" /> Admin Panel →
        </Link>
      </div>
    </div>
  );
}