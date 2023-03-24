import { IColumn, IRequestError, ITask } from "../@types/common";

export function apiErrorParser(error: IRequestError) {
  if (!error) return;
  if ("data" in error && "message" in error.data)
    return `${error.data.message}`;
  return "api.errors.default";
}

export function logout() {
  localStorage.removeItem("TOKEN_AUTH_LOCALSTORAGE");
}

export function boardInfoParser(data: string) {
  const [title, description] = data.split("|");
  return [title, description];
}

export function sortDataByOrder(data: IColumn[] | ITask[] | undefined) {
  if (data) {
    data = [...data];
    return data.sort((a, b) => a.order - b.order);
  }
  return null;
}
