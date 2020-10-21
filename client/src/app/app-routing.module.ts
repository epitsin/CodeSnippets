import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { RouteGuard } from './core/guards/route.guard';
import { AllSnippetsComponent } from './snippets/all-snippets/all-snippets.component';
import { MySnippetsComponent } from './snippets/my-snippets/my-snippets.component';
import { SnippetDetailsComponent } from './snippets/snippet-details/snippet-details.component';

const routes: Routes = [
  { path: '', component: AllSnippetsComponent },
  { path: 'mine', component: MySnippetsComponent, canActivate: [RouteGuard] },
  { path: 'snippets/:id', component: SnippetDetailsComponent, canActivate: [RouteGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
