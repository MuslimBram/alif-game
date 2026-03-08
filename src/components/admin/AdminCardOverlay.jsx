import React from "react";
import { GripVertical, Pencil } from "lucide-react";

/**
 * AdminCardOverlay - shfaq drag handle + buton edit mbi çdo kartë/seksion kur adminEditMode=true
 * 
 * Props:
 *   show: boolean - nëse duhet shfaqur (adminEditMode && isAdmin)
 *   onEdit: function - çfarë bën butoni edit (opsionale)
 *   editHref: string - link drejtpërdrejt (opsionale, alternativi i onEdit)
 *   dragHandleProps: object - props nga @hello-pangea/dnd (opsionale)
 *   label: string - etiketa e seksionit (opsionale, shfaqet në hover)
 *   children: ReactNode - kartën/seksionin që mbështjell
 *   className: string - klasa shtesë për wrapper
 */
export default function AdminCardOverlay({ 
  show, 
  onEdit, 
  editHref, 
  dragHandleProps, 
  label,
  children,
  className = ""
}) {
  if (!show) return <>{children}</>;

  return (
    <div className={`relative group ${className}`}>
      {children}
      
      {/* Overlay border kur hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/0 group-hover:border-amber-400/80 pointer-events-none transition-all duration-200 z-10" />

      {/* Top-left: Drag handle */}
      {dragHandleProps && (
        <div
          {...dragHandleProps}
          className="absolute top-2 left-2 z-20 bg-amber-500 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing shadow-lg"
          title="Tërhiq për të rirenditur"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      {/* Top-right: Edit button */}
      {(onEdit || editHref) && (
        editHref ? (
          <a
            href={editHref}
            className="absolute top-2 right-2 z-20 bg-amber-500 hover:bg-amber-600 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center gap-1 text-xs font-semibold"
            title={label ? `Edito: ${label}` : "Edito"}
          >
            <Pencil className="w-3.5 h-3.5" />
            {label && <span className="hidden sm:inline">{label}</span>}
          </a>
        ) : (
          <button
            onClick={onEdit}
            className="absolute top-2 right-2 z-20 bg-amber-500 hover:bg-amber-600 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg flex items-center gap-1 text-xs font-semibold"
            title={label ? `Edito: ${label}` : "Edito"}
          >
            <Pencil className="w-3.5 h-3.5" />
            {label && <span className="hidden sm:inline">{label}</span>}
          </button>
        )
      )}
    </div>
  );
}