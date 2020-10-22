import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../core/models/user';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public title = 'Code Snippets';

  public currentUser: User;

  public isCurrentUserAdmin: boolean;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe((x) => this.currentUser = x);
    this.isCurrentUserAdmin = this.authenticationService.isCurrentUserAdmin;
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
