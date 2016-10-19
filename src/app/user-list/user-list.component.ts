import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users; //type it
  errorMessage: string;

  constructor(private UsersService:UsersService,private router: Router){
  }

  gotoUser(user) {
    //go to url
    this.router.navigate(['/user', user.id]);
    console.log(user);
  }

  ngOnInit() : void {
    this.users = this.UsersService.getUsers();    
  }

}
