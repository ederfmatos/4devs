export { brasilApiClient } from './httpClient';

import type {
  CepApi,
  CnpjApi,
  DominiosApi,
  FeriadosApi,
  CambioApi,
} from '@/types';
import { BrasilApiService } from './brasilApi';

const brasilApi = new BrasilApiService();

export const cepService: CepApi = brasilApi;
export const cnpjService: CnpjApi = brasilApi;
export const dominiosService: DominiosApi = brasilApi;
export const feriadosService: FeriadosApi = brasilApi;
export const cambioService: CambioApi = brasilApi;
