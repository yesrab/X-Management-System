"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/Theme/theme-toggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#hierarchy", label: "Structure" },
  { href: "#", label: "Contact" },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-body px-4 sm:px-6 lg:px-8">
      <div className="flex h-14 items-center justify-between gap-2 sm:h-16">
        {/* Logo */}
        <div className="flex min-w-0 shrink items-center gap-2 text-lg font-semibold sm:text-xl">
          <div className="shrink-0 bg-foreground p-1.5">
            <GraduationCap className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
          </div>
          <Link href="/" className="truncate">
            <span className="inline text-sm sm:hidden">X Management</span>
            <span className="hidden sm:inline md:text-lg lg:text-xl">X Management System</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden shrink-0 gap-6 text-sm font-medium md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: mobile menu + CTAs */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-body sm:w-[320px]">
              <SheetHeader className="border-b border-border">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 p-4">
                {navLinks.map(({ href, label }) => (
                  <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      {label}
                    </Button>
                  </Link>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-4">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Button asChild variant="ghost" size="sm" className="hidden h-9 text-sm md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="hidden h-9 px-4 text-sm md:inline-flex">
            <Link href="/signup">Get Started</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
