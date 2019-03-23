import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  accessToken: any[];
  constructor(private auth: AuthService) { 
    //console.log("NavBar Compoment ***");
  }

  ngOnInit() {
  }

}
