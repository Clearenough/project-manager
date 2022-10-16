import { IRequestError } from "../@types/common";

export function apiErrorParser(error: IRequestError) {
  if (!error) return;
  if ('data' in error && 'message' in error.data)
    return `${error.data.message}`;
  return ('api.errors.default');
} 