import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public isAuthenticated;
  public isAuthenticated$;

  constructor(private authService : AuthService,
              private store: Store<AppState>) { }

  ngOnInit() { 
    // this.isAuthenticated = this.authService.isAuthenticatedSubject;
    this.isAuthenticated = this.authService.isAuthenticated$;
  }

}
