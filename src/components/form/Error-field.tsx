import { AnyFieldMeta } from '@tanstack/react-form-nextjs';
import { ZodError } from 'zod';

import { FieldError } from '@/components/ui/field';

type FieldErrorsProps = {
  meta: AnyFieldMeta;
};

function ErrorField({ meta }: FieldErrorsProps) {
  if (!meta.isTouched) return null;

  return meta.errors.map(({ message }: ZodError, index) => (
    <FieldError key={index}>{message}</FieldError>
  ));
}

export default ErrorField;
