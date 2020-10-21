import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AuthenticationService } from './core/services/authentication.service';
import { RouteGuard } from './core/guards/route.guard';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './authentication/register/register.component';
import { SnippetDetailsComponent } from './snippets/snippet-details/snippet-details.component';
import { CreateSnippetComponent } from './snippets/create-snippet/create-snippet.component';
import { AllSnippetsComponent } from './snippets/all-snippets/all-snippets.component';
import { MySnippetsComponent } from './snippets/my-snippets/my-snippets.component';
import { SnippetListComponent } from './snippets/snippet-list/snippet-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SnippetListComponent,
    SnippetDetailsComponent,
    NavigationComponent,
    CreateSnippetComponent,
    AllSnippetsComponent,
    MySnippetsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  providers: [
    AuthenticationService,
    RouteGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
