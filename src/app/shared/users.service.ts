import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import { Http, Response } from '@angular/http';
import { USERS } from '../mock-users';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  users;

  getUsers() {
    // console.log(USERS); //

    // return USERS;

    return this.http.get(`https://jsonplaceholder.typicode.com/users`)
      .map((res: Response) => {
        // let body = res.json();
        return res.json() || {};
      })

    //...errors if any
    .catch( (error:any) => Observable.throw(error.json().error || 'Server error'));

    // return new Observable(observer => {
    //   // observer.next(USERS);
    //   setTimeout(() => {
    //     observer.next(USERS);
    //     observer.complete();
    //   }, 1000);
    // });

    // let subscription = this.data.subscribe(
    //     value => this.values.push(value),
    //     error => this.anyErrors = true,
    //     () => this.finished = true
    // );

  }

}
