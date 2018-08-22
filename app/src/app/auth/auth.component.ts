import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public userLogin = '';
  public userPassword = '';
  public hide = true;

  private loginSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.userLogin && this.userPassword) {
      this.loginSub = this.authService.login(this.userLogin, this.userPassword)
        .subscribe((res) => {
          if (res) {
            this.router.navigate(['/courses']);
          }
        });
    }
  }

  ngOnDestroy() {
    if ( this.loginSub ) {
      this.loginSub.unsubscribe();
    }
  }

}
