import { HomeComponent } from './../pages/home/home.component';
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }  from '@angular/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserrolesComponent } from './userroles/userroles.component';
import { AdminGuardService } from '../services/authentication/admin-guard.service';
import { AuthService } from '../services/authentication/auth.service';
import { RouterModule } from '@angular/router';
import { UserroleassignmentComponent } from './userroleassignment/userroleassignment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserprofilesComponent } from './userprofiles/userprofiles.component';
import { PostjobvendorComponent } from './postjobvendor/postjobvendor.component';
import { CountryComponent } from './country/country.component';
import { CountryaddupdateComponent } from './country/countryaddupdate/countryaddupdate.component';
import { MatDialogModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,        
    ],
      declarations: [
      AdminhomeComponent,
      UserrolesComponent,
      UserroleassignmentComponent,
      UserprofilesComponent,
      PostjobvendorComponent,
      CountryComponent,
      CountryaddupdateComponent
    ],
    entryComponents: [CountryaddupdateComponent],
    exports: [

    ],
    providers: [
      AdminGuardService
    ]


})

export class AdminModule {}
