import { cn } from '@/lib/utils';
import { FieldDescription } from '@/components/ui/field';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

import LoginForm from './login-form';

export function LoginFormContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <LoginForm />
          <div className='bg-muted relative hidden md:block'>
            <Image
              src='/access-page/loginAdvert.png'
              alt='login advert'
              width={500}
              height={500}
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        By clicking continue, you agree to our{' '}
        <Link href='#'>Terms of Service</Link> and{' '}
        <Link href='#'>Privacy Policy</Link>.
      </FieldDescription>
    </div>
  );
}
