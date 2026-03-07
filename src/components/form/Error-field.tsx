import { AnyFieldMeta } from '@tanstack/react-form-nextjs';
import { uniqBy } from 'lodash';
import { FieldError } from '@/components/ui/field';
import type { StandardSchemaV1Issue } from '@tanstack/react-form-nextjs';

type FieldErrorsProps = {
  meta: AnyFieldMeta;
  name: string;
};

function ErrorField({ meta }: FieldErrorsProps) {
  if (!meta.isTouched) return null;
  const uniqueErrors = uniqBy(
    meta.errors,
    (error: StandardSchemaV1Issue) => error.message,
  );
  return uniqueErrors.map((error: StandardSchemaV1Issue, index: number) => {
    return <FieldError key={index}>{error.message}</FieldError>;
  });
}

export default ErrorField;
