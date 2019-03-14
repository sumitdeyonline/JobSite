import { HomeComponent } from './../pages/home/home.component';
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }  from '@angular/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserrolesComponent } from './userroles/userroles.component';
import { AdminGuardService } from '../services/authentication/admin-guard.service';
import { AuthService } from '../services/authentication/auth.service';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
    AdminhomeComponent,
    UserrolesComponent
  ],
    exports: [

    ],
    providers: [
      AdminGuardService
    ]


})

export class AdminModule {}
