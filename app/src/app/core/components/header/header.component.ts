import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  public isAuthenticated;

  constructor(private authService : AuthService) { }

  ngOnInit() { 
    this.isAuthenticated = this.authService.isAuthenticatedSubject;
  }

}
