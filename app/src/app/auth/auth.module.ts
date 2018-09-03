import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from '../core/store/auth/users.reducer';
import { UsersEffects } from '../core/store/auth/users.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent]
})
export class AuthModule { }
