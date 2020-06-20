import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main-components/header/header.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { SidebarComponent } from './main-components/sidebar/sidebar.component';
import { TokenInterceptor } from './service/token.interceptor';
import { AuthService } from './service/auth.service';
import { ModuleGuard } from './service/module-guard.service';
import { AuthGuard } from './service/auth-guard.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state-management/index';
import { AuthEffects } from './state-management/userauth.effect'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('user_auth', reducers),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
    ModuleGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
