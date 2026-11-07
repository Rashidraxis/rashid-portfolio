import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { RenderMode, ServerRoute, provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';

const serverRoutes: ServerRoute[] = [{ path: '', renderMode: RenderMode.Prerender }];

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

export const serverAppConfig = mergeApplicationConfig(appConfig, serverConfig);
