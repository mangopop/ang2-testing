import { Component, OnInit } from '@angular/core';
import { UsersService } from './shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  users;

  constructor(private UsersService:UsersService){
  }

  goGetUsers(): void {
    this.users = this.UsersService.getUsers();
    
  }

  ngOnInit(){
    this.goGetUsers();
  }
}
