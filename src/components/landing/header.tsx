import Link from "next/link";
import { Boxes } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "@/components/Theme/theme-toggle";

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 pr-5 pl-5'>
      <div className='flex h-16 items-center justify-between '>
        {/* Header logo section */}
        <div className='flex items-center gap-2 font-bold text-xl tracking-tight'>
          <div className='bg-primary p-1.5 rounded-lg'>
            <Boxes className='h-6 w-6 text-primary-foreground' />
          </div>
          <Link href='/'>
            <span>X Management System</span>
          </Link>
        </div>
        {/* Header navigation section */}
        <nav className='hidden md:flex gap-6 text-sm font-medium'>
          <Link href='#features' className='hover:text-primary transition-colors'>
            Features
          </Link>
          <Link href='#hierarchy' className='hover:text-primary transition-colors'>
            Hierarchy
          </Link>
          <Link href='#inventory' className='hover:text-primary transition-colors'>
            Inventory
          </Link>
        </nav>
        {/* Header CTA section */}
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='sm'>
            Login
          </Button>
          <Button size='sm'>Get Started</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
