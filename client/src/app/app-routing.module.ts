import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { RouteGuard } from './core/guards/route.guard';
import { TagReportsComponent } from './reports/tag-reports/tag-reports.component';
import { AllSnippetsComponent } from './snippets/all-snippets/all-snippets.component';
import { CreateSnippetComponent } from './snippets/create-snippet/create-snippet.component';
import { MySnippetsComponent } from './snippets/my-snippets/my-snippets.component';
import { SnippetDetailsComponent } from './snippets/snippet-details/snippet-details.component';

const routes: Routes = [
  { path: '', component: AllSnippetsComponent },
  { path: 'snippets', component: AllSnippetsComponent },
  // /new and /mine should be before /:id because they are more specific
  { path: 'snippets/mine', component: MySnippetsComponent, canActivate: [RouteGuard] },
  { path: 'snippets/new', component: CreateSnippetComponent, canActivate: [RouteGuard] },
  { path: 'snippets/:id', component: SnippetDetailsComponent, canActivate: [RouteGuard] },
  { path: 'reports', component: TagReportsComponent, canActivate: [RouteGuard] },
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
