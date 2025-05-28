type ServerError = {
  extensions: { code: string };
  message: string;
  name: string;
  fieldName?: string;
  stack: string;
};

type ServerErrors = {
  errors: ServerError[];
};

export function parseServerErrors(err: any): ServerErrors | null {
  if (err?.response?.data?.errors) {
    return err.response.data;
  }
  return null;
}
