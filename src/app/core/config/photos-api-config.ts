import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export interface PhotosApiConfig {
  baseUrl: string;
  pageSize: number;
  latency: { min: number; max: number };
  imageSize: { thumbnail: number; full: number };
}

export const PHOTOS_API_CONFIG: InjectionToken<PhotosApiConfig> =
  new InjectionToken<PhotosApiConfig>('PHOTOS_API_CONFIG');

export function providePhotosApi(config: PhotosApiConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: PHOTOS_API_CONFIG, useValue: config }]);
}
