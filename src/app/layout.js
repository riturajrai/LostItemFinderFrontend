"use client";

import { Inter, Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

// Inter font


// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"], // jo chahiye wo weight rakho
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideLayoutRoutes = ["/signup", "/login"];

  return (
    <html lang="en">
      <body
        className={` ${poppins.className} flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-[12px]`}
      >
        {/* Background gradients agar wapas chahiye to uncomment kar lena */}
        {/* <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-20 blur-3xl animate-pulse z-0" />
        <div className="absolute bottom-8 right-8 w-80 h-80 rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 opacity-20 blur-3xl animate-pulse z-0" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 opacity-15 blur-3xl animate-pulse z-0" /> */}

        {!hideLayoutRoutes.includes(pathname) && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!hideLayoutRoutes.includes(pathname) && <Footer />}
      </body>
    </html>
  );
};

