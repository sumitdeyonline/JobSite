import { Router, RouterModule  } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminGuardService } from '../services/authentication/admin-guard.service';
import { UserrolesComponent } from './userroles/userroles.component';
import { UserroleassignmentComponent } from './userroleassignment/userroleassignment.component';


export const adminRouting = RouterModule.forChild([
    {
        path: 'postsadminhome',
        component: AdminhomeComponent,
        canActivate: [AdminGuardService]
     },
     {
      path: 'userroles',
      component: UserrolesComponent,
      canActivate: [AdminGuardService]
    },
    {
      path: 'userroleassignment',
      component: UserroleassignmentComponent,
      canActivate: [AdminGuardService]
    },
]);
