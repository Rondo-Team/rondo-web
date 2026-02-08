export type FormActionState<T> = {
  errors?: Record<keyof T, string>;
  success?: boolean;
  message?: string;
};
