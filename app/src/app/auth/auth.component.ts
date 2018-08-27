import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import * as usersActions from '../core/store/auth/users.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public userLogin = '';
  public userPassword = '';
  public hide = true;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
  }

  login() {
    this.store.dispatch(new usersActions.UserLogin({
      login: this.userLogin,
      password: this.userPassword
    }));
    this.authService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['/courses']);
      }
    })
  }
}
