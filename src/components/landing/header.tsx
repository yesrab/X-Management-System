"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 sm:px-6 lg:px-8'>
      <div className='flex h-14 sm:h-16 items-center justify-between gap-2'>
        {/* Logo - allow shrink on small screens */}
        <div className='flex min-w-0 shrink items-center gap-2 font-bold text-lg sm:text-xl tracking-tight'>
          <div className='bg-primary p-1.5 rounded-lg shrink-0'>
            <GraduationCap className='h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground' />
          </div>
          <Link href='/' className='truncate'>
            <span className='inline sm:hidden text-sm'>X Management</span>
            <span className='hidden sm:inline md:text-lg lg:text-xl'>X Management System</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className='hidden md:flex gap-6 text-sm font-medium shrink-0'>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className='hover:text-primary transition-colors whitespace-nowrap'>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: mobile menu + CTAs */}
        <div className='flex items-center gap-2 sm:gap-4 shrink-0'>
          {/* Mobile menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='md:hidden h-9 w-9'
                aria-label='Open menu'>
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[280px] sm:w-[320px]'>
              <SheetHeader className='flex flex-row items-center gap-4 pr-12'>
                <div className='flex items-center gap-2'>Menu</div>
                <SheetTitle className='sr-only'>Menu</SheetTitle>
              </SheetHeader>
              <nav className='flex flex-col gap-1 pt-4'>
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className='rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted hover:text-primary transition-colors'>
                    <Button variant='outline' className='w-full'>
                      {label}
                    </Button>
                  </Link>
                ))}
                <ButtonGroup>
                  <Link
                    className='rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted hover:text-primary transition-colors'
                    onClick={() => setMenuOpen(false)}
                    href='/login'>
                    <Button variant='outline'>Login</Button>
                  </Link>
                  <Link
                    className='rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted hover:text-primary transition-colors'
                    onClick={() => setMenuOpen(false)}
                    href='/signup'>
                    <Button>Get Started</Button>
                  </Link>
                </ButtonGroup>
              </nav>
            </SheetContent>
          </Sheet>
          <Button variant='ghost' size='sm' className='hidden md:inline-flex h-8 sm:h-9 text-sm'>
            Login
          </Button>
          <Button size='sm' className='hidden md:inline-flex h-8 sm:h-9 text-sm px-3 sm:px-4'>
            Get Started
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
