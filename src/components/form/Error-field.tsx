import { AnyFieldMeta } from '@tanstack/react-form-nextjs';
import { ZodError } from 'zod';
import { uniqBy } from 'lodash';
import { FieldError } from '@/components/ui/field';
import type { StandardSchemaV1Issue } from '@tanstack/react-form-nextjs';

type FieldErrorsProps = {
  meta: AnyFieldMeta;
  name: string;
};

function ErrorField({ meta, name }: FieldErrorsProps) {
  if (!meta.isTouched) return null;
  const uniqueErrors = uniqBy(
    meta.errors,
    (error: StandardSchemaV1Issue) => error.message,
  );
  return uniqueErrors.map(({ message }: any, index: number) => (
    <FieldError key={index}>{message}</FieldError>
  ));
}

export default ErrorField;
