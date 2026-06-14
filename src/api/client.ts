import axios, { AxiosError } from "axios";
import type { ApiErrorShape } from "../types/common";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorShape>;
    return (
      axiosError.response?.data?.detail ??
      axiosError.response?.data?.message ??
      axiosError.message ??
      "No se pudo completar la solicitud."
    );
  }
  return error instanceof Error ? error.message : "Ocurrió un error inesperado.";
};
