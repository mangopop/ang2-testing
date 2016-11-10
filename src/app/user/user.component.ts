import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UsersService } from '../shared/users.service';
import { User } from '../model/user';
import {ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user$:Observable<any>;
  private id;

  constructor(private UsersService:UsersService, private route:ActivatedRoute){
    // this.id = route.params.map((p:any) => p.id); //egghead method    
  }

  ngOnInit() : void {

    this.route.params.subscribe((params:Params) => { //why doesn't map work on params? forEach can replace subscribe here
      let id = +params['id'];
      this.user$ = this.UsersService.getUser(id);    
    });
        
    this.user$.subscribe(
        data => console.log(data.name),
        err => console.error(err),
        () => console.log('done')
      );
  }

}
