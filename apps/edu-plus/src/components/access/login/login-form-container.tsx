import { cn } from '@/lib/utils';
import { FieldDescription } from '@/components/ui/field';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

import LoginForm from './login-form';

export function LoginFormContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="grid overflow-hidden border border-border bg-card md:grid-cols-2">
        <LoginForm />
        {/* inverted instrument aside */}
        <div className="relative hidden flex-col justify-between bg-foreground p-8 text-primary-foreground md:flex">
          <div className="flex items-center gap-2">
            <div className="bg-primary-foreground p-1.5">
              <GraduationCap className="h-5 w-5 text-foreground" />
            </div>
            <span className="font-semibold">X Management System</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-primary-foreground/55">
              Control Room
            </p>
            <p className="mt-2 text-lg leading-snug">
              Students, faculty, courses, and finance — one operational console.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-px border border-primary-foreground/15 bg-primary-foreground/15 text-xs">
            {[
              ['Institutions', '320'],
              ['Students', '1.2M'],
              ['Uptime', '99.9%'],
            ].map(([label, value]) => (
              <div key={label} className="bg-foreground p-3">
                <div className="text-[10px] uppercase tracking-wide text-primary-foreground/55">
                  {label}
                </div>
                <div className="mt-2 font-semibold tabular-nums">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FieldDescription className="px-1 text-center text-xs">
        By clicking continue, you agree to our{' '}
        <Link href="#">Terms of Service</Link> and{' '}
        <Link href="#">Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
