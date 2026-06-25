export type FormActionState<T> = {
  errors?: Record<keyof T, string>;
  values?: Partial<Record<keyof T, string>>;
  success?: boolean;
  message?: string;
};
