"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface LoginFormProps {
  logoText: string
  imageSrc: string
}

export default function LoginForm({ logoText, imageSrc }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    console.log("Login attempt with:", { email, password })
  }

  return (
    <div className="flex w-full h-screen">
      {/* Lado izquierdo - Formulario */}
      <div className="w-full md:w-1/2 flex flex-col p-10">
        <div className="flex items-center mb-16">
          <div className="bg-black text-white p-2 rounded mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="9" x2="15" y1="9" y2="9" />
              <line x1="9" x2="15" y1="15" y2="15" />
            </svg>
          </div>
          <span className="text-xl font-medium">{logoText}</span>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2">Login to your account</h1>
          <p className="text-gray-500 mb-8">Enter your email below to login to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <a href="#" className="text-gray-600 hover:underline text-sm">
                  Forgot your password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Lado derecho - Imagen */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
        <Image src={imageSrc || "public/images/place-holder.jpg"} alt="Login image" fill className="object-cover" priority />
      </div>
    </div>
  )
}
