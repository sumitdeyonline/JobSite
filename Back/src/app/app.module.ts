import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { DropdownDirective } from './dropdown.directive';
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { FooterComponent } from './template/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { routing } from './app.routing';
import { MidsearchComponent } from './pages/home/midsearch/midsearch.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpModule } from '@angular/http';
import { LogComponent } from './common/logger/log.component';
import { CallbackComponent } from './common/callback/callback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/authentication/auth.service';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupConfirmComponent } from './pages/signup/signup-confirm/signup-confirm.component';
import { SearchheaderComponent } from './template/searchheader/searchheader.component';
import { PostjobComponent } from './pages/postjob/postjob.component';
import { AuthGuardService } from './services/authentication/auth-guard.service';
import { ScopeGuardService } from './services/authentication/scope-guard.service';
import { PostjobService } from './services/firebase/postjob.service';
import { ListjobComponent } from './pages/listjob/listjob.component';
import { ToastrService } from 'ngx-toastr';
import { JobpoststatusComponent } from './pages/postjob/jobpoststatus/jobpoststatus.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { JobdetailsComponent } from './pages/jobdetails/jobdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    NavbarComponent,
    MidsearchComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    LoginComponent,
    LogComponent,
    CallbackComponent, SignupComponent, SignupConfirmComponent, SearchheaderComponent, PostjobComponent, ListjobComponent, JobpoststatusComponent, JobdetailsComponent
  ],

  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService,
    AuthGuardService,
    ScopeGuardService,
    PostjobService,
    AngularFirestore,
    ToastrService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
