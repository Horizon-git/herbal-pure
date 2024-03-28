/* eslint-disable no-console */
// import { InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { createClient } from './index';

export const apiClient = createClient();

// apiClient.interceptors.response.use(res => res.data);

// function onRequest(
//   request: InternalAxiosRequestConfig,
// ): InternalAxiosRequestConfig {
//   const accessToken = localStorage.getItem('accessToken');

//   if (accessToken) {
//     // eslint-disable-next-line no-param-reassign
//     request.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return request;
// }

// function onResponseSuccess(res: AxiosResponse): any {
//   return res;
// }

// async function onResponseError(error: AxiosError): Promise<any> {
//   const originalRequest = error.config;

//   if (error.response?.status !== 401) {
//     throw error;
//   }

//   try {
//     const data = await authService.refresh();

//     console.log(data);
//     // accessTokenService.save(accessToken);

//     return await apiClient.request(originalRequest as AxiosRequestConfig);
//   } catch (errorMessage) {
//     console.log(errorMessage);
//     throw errorMessage;
//   }
// }

// apiClient.interceptors.request.use(onRequest);
// apiClient.interceptors.response.use(onResponseSuccess, onResponseError);
