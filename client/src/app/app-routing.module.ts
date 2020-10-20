import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { SnippetDetailsComponent } from './snippets/snippet-details/snippet-details.component';
import { SnippetListComponent } from './snippets/snippet-list/snippet-list.component';

const routes: Routes = [
  { path: '', component: SnippetListComponent },//, canActivate: [AuthGuard] },
  { path: 'snippets/:id', component: SnippetDetailsComponent },
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
