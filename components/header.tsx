'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IP</span>
            </div>
            <span className="font-semibold text-slate-900 text-lg hidden sm:block">
              Indicador Profissional
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/localizador" className="text-sm text-gray-600 hover:text-slate-900 transition font-medium">
              Localizador
            </Link>
            <Link href="/voluntario" className="text-sm text-gray-600 hover:text-slate-900 transition font-medium">
              Atendimento Voluntário
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-slate-900 transition font-medium">
              Blog
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm" className="rounded-full">
                Área do Profissional
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/localizador" 
                className="text-sm text-gray-600 hover:text-slate-900 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Localizador
              </Link>
              <Link 
                href="/voluntario" 
                className="text-sm text-gray-600 hover:text-slate-900 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Atendimento Voluntário
              </Link>
              <Link 
                href="/blog" 
                className="text-sm text-gray-600 hover:text-slate-900 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" size="sm" className="rounded-full w-full">
                  Área do Profissional
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
