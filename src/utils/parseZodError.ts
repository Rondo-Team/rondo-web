import { ZodError } from "zod";

export function parseZodError(error: ZodError) {
  const flattenedErrors = error.flatten().fieldErrors;

  const errors: Record<string, string> = {};
  Object.entries(flattenedErrors).forEach(([key, val]) => {
    if (Array.isArray(val) && val.length > 0) {
      errors[key] = val[0];
    }
  });

  return errors;
}
