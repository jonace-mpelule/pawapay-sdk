import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import type { PawaPayResponse, RequestOptions } from "@/types/index.t.ts";

export default async function request<T, E>(
  apiInstance: AxiosInstance,
  config: AxiosRequestConfig,
  options?: RequestOptions,
): Promise<PawaPayResponse<T, E>> {
  try {
    const response = await apiInstance.request<T>({
      ...config,
      ...options,
    });
    return {
      success: true,
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
    return {
      success: false,
      error: {
        errorMessage: "Unknown error occurred",
      } as E,
      status: 500,
    };
  }
}
