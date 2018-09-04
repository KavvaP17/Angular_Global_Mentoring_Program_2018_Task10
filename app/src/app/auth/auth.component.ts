import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../core/store/app.state';
import * as usersActions from '../core/store/auth/users.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public showErrorMessage = false;
  public hide = true;
  public authForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>,
              private fb: FormBuilder) { }
  ngOnInit() {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(this.authForm);
    this.store.dispatch(new usersActions.UserLogin({
      login: this.authForm.value.login,
      password: this.authForm.value.password
    }));
    this.authService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.showErrorMessage = false;
        this.router.navigate(['/courses']);
      } else {
        this.showErrorMessage = true;
      }
    });
  }
}
