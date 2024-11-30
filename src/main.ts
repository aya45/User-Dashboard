import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';
import { userReducer } from './app/store/user.reducer';
import { UserEffects } from './app/store/user.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ user: userReducer }),
    provideEffects([UserEffects]),
    provideStoreDevtools(),
    provideAnimations()
  ]
}).catch(err => console.error(err));