import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    public user;

    constructor(private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        this.authService.getUserInfo()
            .subscribe((user) => {
                this.user = user;
            });
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth']); 
    }

}
