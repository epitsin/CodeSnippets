import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './core/models/user';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
