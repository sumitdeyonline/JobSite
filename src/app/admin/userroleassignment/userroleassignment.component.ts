import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/firebase/userprofile/userprofile.service';
import { UserRole } from 'src/app/services/firebase/userprofile/userrole.model';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRoleAssignmentModel } from './userroleassignment.model';
import { UserDetails } from 'src/app/services/firebase/userdetails/userdetails.model';
import { UserdetailsService } from 'src/app/services/firebase/userdetails/userdetails.service';

@Component({
  selector: 'userroleassignment',
  templateUrl: './userroleassignment.component.html',
  styleUrls: ['./userroleassignment.component.css']
})
export class UserroleassignmentComponent implements OnInit {

  UserRole: UserRole[];
  userDetails: UserDetails[];
  userAssignment = new UserRoleAssignmentModel();
  uaform;

  constructor(private uProfile: UserprofileService, private udetails: UserdetailsService, private auth: AuthService, fb: FormBuilder) {
    this.uaform = fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required]
    })
    this.getRoles();
  }

  ngOnInit() {
  }


  getRoles() {
    this.uProfile.getUserAllRoles().subscribe(urole => {
      this.UserRole = urole;
      console.log("User Role :::::::: => "+this.UserRole.length);
    });
  }

  roleSearch(roleSearch) {
    console.log("Username :: "+roleSearch.username);
    console.log("Role :: "+roleSearch.role);

    this.udetails.getUserDetails(roleSearch.username).subscribe(udtl=> {
      this.userDetails = udtl;
      console.log(" Length :::: "+this.userDetails.length);


      if (this.userDetails.length > 0) {
        console.log("User Role ::: "+this.userDetails[0].userRole);


      } else {
        console.log("User not found");
      }

    })
  }

}
