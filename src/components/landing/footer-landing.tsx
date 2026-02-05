import Link from "next/link";

export default function FooterLanding() {
  return (
    <footer className='border-t py-5 bg-muted/20 pr-5 pl-5'>
      <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
        <p className='text-sm text-muted-foreground'>
          © 2026 X Management Systems. Built with Next.js 16.
        </p>
        <div className='flex gap-6 text-sm text-muted-foreground'>
          <Link href='#' className='hover:text-foreground'>
            Terms
          </Link>
          <Link href='#' className='hover:text-foreground'>
            Privacy
          </Link>
          <Link href='#' className='hover:text-foreground'>
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
