"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface LoaderProps {
  logoSrc?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export function DashboardLoader({
  logoSrc = "/images/place-holder.jpg",
  primaryColor = "#3b82f6", // blue-500
  secondaryColor = "#93c5fd", // blue-300
}: LoaderProps) {
  return (
    <div className="flex h-[85vh] items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          {/* Logo container with pulsing effect */}
          <motion.div
            initial={{ opacity: 0.6, scale: 0.95 }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            {/* Logo placeholder - replace with your actual logo */}

            <Image
              src={logoSrc}
              alt="Logo"
              width={96}
              height={96}
              className="h-24 w-24 object-contain"
            />
          </motion.div>

          {/* Circular animated rings */}
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ backgroundColor: primaryColor }}
            className="absolute inset-0 rounded-full blur-md z-0"
          />
        </div>

        {/* Loading indicator */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundColor: i % 2 === 0 ? primaryColor : secondaryColor,
                }}
                className="w-3 h-3 rounded-full"
              />
            ))}
          </div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "95%"] }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
            }}
            style={{ backgroundColor: primaryColor }}
            className="h-1 rounded-full"
          >
            <div className="w-full max-w-[200px]" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-gray-600 dark:text-gray-300 font-medium"
          >
            Cargando...
          </motion.p>
        </div>
      </div>
    </div>
  );
}
