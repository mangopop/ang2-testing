import { Injectable } from '@angular/core';
//import 'rxjs/Rx';
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../model/user';

@Injectable()
export class UsersService {
  
  private apiUrl = 'http://5820b5bbbd15bb110052e48c.mockapi.io/api/v1/users/';

  private extractData(res: Response) {
    let body = res.json();
    return res.json().data || { };
  }

  private handleError(){

  }


  constructor(private http: Http) { }

  addUser(name:string):Observable<User>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl,{name}, options)
            .map((res: Response) => {
        // return res.json().filter(data => data.id === 1) || {}; for extracting 1 user from list
        return res.json() || {};
      })
      .catch( (error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUser(id:number): Observable<any>{
        return this.http.get(this.apiUrl+id)
      .map((res: Response) => {
        // return res.json().filter(data => data.id === 1) || {}; for extracting 1 user from list
        return res.json() || {};
      })
      .startWith({name:'Loading...'})
      .catch( (error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUsers() {
    return this.http.get(this.apiUrl)
      .map((res: Response) => {
        // let body = res.json();
        return res.json() || {};
      })

    // ...errors if any
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
