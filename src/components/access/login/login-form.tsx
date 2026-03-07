'use client';
import { useActionState } from 'react';
import {
  initialFormState,
  mergeForm,
  useForm,
  useTransform,
} from '@tanstack/react-form-nextjs';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import ErrorField from '@/components/form/Error-field';

import { loginAction, validateLoginForm } from '@/app/(access)/login/action';
import { loginSchema } from '@/components/access/login/login-form-options';
import { formOpts } from './login-form-options';
import OAuthButtons from '../oAuth-buttons';

export default function LoginForm() {
  const [state, action, pending] = useActionState(
    loginAction,
    initialFormState,
  );
  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
    validators: {
      onSubmit: loginSchema,
      onSubmitAsync: async ({ value }) => {
        const { isError, data } = await validateLoginForm(value, true);
        if (isError) {
          return data;
        }
        return undefined;
      },
    },
  });

  return (
    <form
      action={action as never}
      onSubmit={() => form.handleSubmit()}
      className='p-6 md:p-8'
    >
      <FieldGroup>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Welcome back</h1>
          <p className='text-muted-foreground text-balance'>
            Login to your EDU+ account
          </p>
        </div>
        <form.Field name='email' defaultValue=''>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder='john@example.com'
                  type='email'
                  aria-invalid={isInvalid}
                  required
                />
                <ErrorField name={field.name} meta={field.state.meta} />
              </Field>
            );
          }}
        </form.Field>
        <form.Field name='password' defaultValue=''>
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field>
                <div className='flex items-center'>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <a
                    href='#'
                    className='ml-auto text-sm underline-offset-2 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  name={field.name}
                  value={field.state.value}
                  id={field.name}
                  onBlur={field.handleBlur}
                  type='password'
                  required
                  aria-invalid={isInvalid}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <ErrorField name={field.name} meta={field.state.meta} />
              </Field>
            );
          }}
        </form.Field>
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
            formState.isPristine,
          ]}
        >
          {([canSubmit, isSubmitting, isPristine]) => (
            <Field>
              <Button
                className='hover:cursor-grab'
                type='submit'
                disabled={!canSubmit || isPristine}
              >
                {isSubmitting || pending ? (
                  <Spinner data-icon='inline-start' />
                ) : (
                  'Login'
                )}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <OAuthButtons />
      </FieldGroup>
    </form>
  );
}
