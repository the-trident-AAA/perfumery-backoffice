"use client";

import { AlertTriangle, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface StockWarningWrapperProps {
  children: ReactNode;
  hasWarning: boolean;
  warningTitle?: string;
  warningMessage?: string;
  warningDetails?: string;
  className?: string;
}

export default function StockWarningWrapper({
  children,
  hasWarning,
  warningTitle = "Stock insuficiente",
  warningMessage = "Disponibilidad limitada",
  warningDetails,
  className = "",
}: StockWarningWrapperProps) {
  return (
    <div
      className={`group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
        hasWarning
          ? "border-2 border-destructive bg-destructive/5"
          : "border-0 bg-muted"
      } ${className}`}
    >
      {/* Línea superior decorativa */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 z-20 ${
          hasWarning
            ? "bg-gradient-to-r from-destructive/60 via-destructive to-destructive/60"
            : "bg-gradient-to-r from-primary/60 via-primary to-primary/60"
        }`}
      />

      {/* Banner de advertencia */}
      {hasWarning && (
        <div className="relative z-20 bg-destructive/10 border-b border-destructive/20 px-4 py-2 flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 animate-pulse" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-destructive">
              {warningTitle}
            </p>
            <p className="text-xs text-muted-foreground">
              {warningMessage}
              {warningDetails && ` - ${warningDetails}`}
            </p>
          </div>
        </div>
      )}

      {/* Líneas laterales con efecto de flujo */}
      <div
        className={`absolute top-0 left-0 w-0.5 h-full z-10 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ${
          hasWarning
            ? "bg-gradient-to-b from-destructive/50 via-destructive/20 to-transparent"
            : "bg-gradient-to-b from-primary/50 via-primary/20 to-transparent"
        }`}
      />
      <div
        className={`absolute top-0 right-0 w-0.5 h-full z-10 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100 ${
          hasWarning
            ? "bg-gradient-to-b from-destructive/50 via-destructive/20 to-transparent"
            : "bg-gradient-to-b from-primary/50 via-primary/20 to-transparent"
        }`}
      />

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkles
          className={`absolute top-4 right-16 h-3 w-3 animate-pulse ${
            hasWarning ? "text-destructive/60" : "text-primary/60"
          }`}
        />
        <Sparkles
          className={`absolute bottom-4 left-8 h-2 w-2 animate-pulse delay-300 ${
            hasWarning ? "text-destructive/40" : "text-primary/40"
          }`}
        />
      </div>

      {/* Background gradient dinámico */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          hasWarning
            ? "bg-gradient-to-r from-destructive/5 via-transparent to-destructive/10"
            : "bg-gradient-to-r from-primary/5 via-transparent to-primary/10"
        }`}
      />

      {/* Contenido del card */}
      {children}
    </div>
  );
}
