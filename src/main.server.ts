import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { serverAppConfig } from './app/app.config.server';

export default (context: BootstrapContext) => bootstrapApplication(App, serverAppConfig, context);
