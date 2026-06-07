import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { GraduationCap } from 'lucide-react';

import OAuthButtons from './oAuth-buttons';

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <div className="grid overflow-hidden border border-border bg-card md:grid-cols-2">
        <form className="p-6 md:p-8">
          <FieldGroup>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase tracking-wide text-signal-red">
                New account
              </p>
              <h1 className="text-2xl font-semibold">Create your account</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account.
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" required />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email.
              </FieldDescription>
            </Field>
            <Field>
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password">Confirm</FieldLabel>
                  <Input id="confirm-password" type="password" required />
                </Field>
              </Field>
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>
            <Field>
              <Button type="submit">Create Account</Button>
            </Field>
            <OAuthButtons type="signup" />
          </FieldGroup>
        </form>

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
              One platform for schools, colleges, and universities.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-px border border-primary-foreground/15 bg-primary-foreground/15 text-xs">
            {[
              ['Institutions', '320'],
              ['Students', '1.2M'],
              ['Modules', '09'],
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
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
