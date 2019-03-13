import { HomeComponent } from './../pages/home/home.component';
import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule }          from '@angular/http';
import { AdminhomeComponent } from './adminhome/adminhome.component';


@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [
    AdminhomeComponent
  ],
    exports: [

    ],
    providers: [

    ]


})

export class AdminModule {}
