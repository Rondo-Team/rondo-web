import { ZodType as Schema } from "zod";

export const validateFormData = <T extends Schema>(
  schema: T,
  formData: FormData,
  message?: string,
): [values: T["_output"], errors: object | undefined] => {
  const rawValues = Object.fromEntries(formData);

  // Empty fields to undefined
  const values = Object.fromEntries(
    Object.entries(rawValues).map(([key, value]) => [
      key,
      value === "" ? undefined : value,
    ]),
  );

  const validatedFields = schema.safeParse(values);
  const validationErrors = validatedFields.error?.flatten().fieldErrors;

  if (validationErrors) {
    return [undefined, { ...validationErrors, message }];
  }

  return [validatedFields.data, undefined];
};
