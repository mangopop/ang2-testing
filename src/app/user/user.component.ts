import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../shared/users.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user:Observable<any>;

  constructor(private UsersService:UsersService){
  }

  ngOnInit() : void {
    this.user = this.UsersService.getUser(1);
    
    this.user.subscribe(
        data => console.log(data),
        err => console.error(err),
        () => console.log('done')
      );
  }

}
