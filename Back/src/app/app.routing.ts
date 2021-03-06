
import { Router, RouterModule  }     from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PostjobComponent } from './pages/postjob/postjob.component';
import { AuthGuardService as AuthGuard } from './services/authentication/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from './services/authentication/scope-guard.service';
import { ListjobComponent } from './pages/listjob/listjob.component';
import { JobpoststatusComponent } from './pages/postjob/jobpoststatus/jobpoststatus.component';
import { JobdetailsComponent } from './pages/jobdetails/jobdetails.component';

export const routing = RouterModule.forRoot([



    {
        path: 'login',
        component: LoginComponent
    },
    /*{
        path: 'postjob',
        component: PostjobComponent,
        canActivate: [AuthGuard]
    },  */

    {
        path: 'postjob',
        component: PostjobComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}

    },
    {
      path: 'jobpoststatus',
      component: JobpoststatusComponent,
      canActivate: [ScopeGuard] ,
      data: { expectedScopes: ['write:messages']}
    },
    {
        path: 'jobdetails/:id',
        component: JobdetailsComponent,
        canActivate: [ScopeGuard] ,
        data: { expectedScopes: ['write:messages']}    
      },
    

    {
        path: 'listjob',
        component: ListjobComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    }


]);
