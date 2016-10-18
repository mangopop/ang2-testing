/* tslint:disable:no-unused-variable */

declare var it, expect, describe, beforeEach;
import { async, fakeAsync, ComponentFixture, TestBed, getTestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user-list/user-list.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { UsersService } from './shared/users.service';
import { HttpModule } from '@angular/http';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let el: HTMLElement;
let app;
let compiled;
let userService: UsersService;
let spy: jasmine.Spy;//


let users = [
  { firstname: 'Test', lastname: 'User' },
  { firstname: 'Test2', lastname: 'User2' }
]

// WHAT NEEDS TESTING 
// relies on service to pass to component.
// so does it call service?
// do we need to know the service works? we can tell it to used mock data and see if that is applied to the component object
// that should be enough

describe('App: TestExperiments', () => {

  beforeEach(() => {

    //mocking the getUsers function satisfies the goGetUsers call
    // let usersServiceStub = {
    //   users: [
    //     { firstname: 'Test', lastname: 'User'},
    //     { firstname: 'Test2', lastname: 'User2'}
    //   ],
    //   getUsers: () => {
    //     return this.users;
    //   }
    // };

    TestBed.configureTestingModule({
      declarations: [
        // *** MUST ADD MANUALLY *** //
        AppComponent,
        HeaderComponent,
        UserListComponent
      ],
      imports: [HttpModule], //need this to test service
      providers: [UsersService]
       // could spy on this
      // providers: [ {provide: UsersService, useValue: usersServiceStub } ] //non-async
    });

    // option 1: UserService from the root injector
    // let usersService = TestBed.get(UsersService);

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;

    //option 2: this should always work// UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UsersService);

    //async:  Setup spy on the `getUsers` method
    spy = spyOn(userService, 'getUsers')
      .and.returnValue(Observable.of(users));//need to return observable for pipe


    // de = fixture.debugElement.query(By.css('.users'));
    // el = de.nativeElement;
    
  });

  // TESTs
  // ------------------------------------- //

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));

  // ----------------------------------------------------------//
  // ---------- test mock service with mock data --------------//
  // ----------------------------------------------------------//

  it('should check UserService to exist', () => {
    expect(UsersService).toBeTruthy();
  });

  it('should not show quote before OnInit', () => {
    expect(app.users).toEqual(undefined);
    expect(spy.calls.any()).toBe(false, 'getUsers not yet called');
  });



//static content test
  // it('should have users after getUsers (async)', fakeAsync(() => {
  //   fixture.detectChanges();
  //   tick();                  // wait for async getQuote
  //   fixture.detectChanges(); // update view with quote
  //   expect(app.users).toEqual(Observable.of(users));

  //   //option 2, may only work for promises
  //   // fixture.whenStable().then(() => { // wait for async getQuote
  //   //   fixture.detectChanges();        // update view with quote
  //   //   console.log(app.users);
  //   //   expect(app.users).toEqual(users);
  //   // });
  // }));



});
