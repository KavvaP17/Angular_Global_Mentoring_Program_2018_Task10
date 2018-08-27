import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    public userFirstName: Observable<string>;

    constructor(private authService: AuthService,
                private router: Router,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.userFirstName = this.store
            .select((state: any) => {
               if (state.users.name) {
                   return state.users.name.first
               } 
               return '';
            });
    }

    public logout(): void {
        this.authService.logout();
        this.router.navigate(['/auth']); 
    }

}
