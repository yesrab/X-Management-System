import Link from "next/link";

export default function FooterLanding() {
  return (
    <footer className="border-t border-border bg-body px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-xs text-muted-foreground">
          © 2026 X Management System — Built with Next.js 16.
        </p>
        <div className="flex gap-6 text-xs uppercase tracking-wide text-muted-foreground">
          <Link href="#" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
