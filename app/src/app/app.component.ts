import { Component, OnInit } from '@angular/core';
import { InitIconsService } from './core/services/init-icons/init-icons.service';
import { AuthService } from './auth/services/auth/auth.service';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isAuthenticated;
  public isLoading;

  constructor(private initIconsService: InitIconsService,
              private authService: AuthService,
              private loadingService: LoadingService) {}

  ngOnInit() {
    this.initIconsService.init();
    this.isAuthenticated = this.authService.isAuthenticatedSubject;
    this.isLoading = this.loadingService.isLoading;
  }

}
