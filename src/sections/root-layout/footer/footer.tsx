import React from "react";

export default function Footer() {
  return (
    <footer className="mx-auto w-full py-6 text-center bg-neutral-50 border-t text-sm">
      <p>
        © {new Date().getFullYear()} Tridente. Todos los derechos reservados.
      </p>
    </footer>
  );
}
