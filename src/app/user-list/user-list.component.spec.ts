/* tslint:disable:no-unused-variable */
declare var it, expect, describe, beforeEach;

import { TestBed, async, tick, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { By } from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DebugElement }    from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

let comp: UserListComponent;
let userEl;
let userEl2;
let expectedUser;
let fixture: ComponentFixture<UserListComponent>;
let de: DebugElement;
let el: HTMLElement;
let app;
let compiled;
let userService: UsersService;
let spy: jasmine.Spy;//

let users = [
  { name: 'Test', lastname: 'User' },
  { name: 'Test2', lastname: 'User2' }
];

// WHAT ARE WE testing
// a list is shown with some mock data
// relies on service to pass to component.
// so does it call service?
// do we need to know the service works? we can tell it to used mock data and see if that is applied to the component object
// TODO: the router go to the user address
// TODO: the gotoUser on click sends a user

class RouterStub {
  navigateByUrl(url: string) { return url; }
}

describe('Component: UserList', () => {
  // async beforeEach
  beforeEach(() => {

    // mocking the getUsers function satisfies the goGetUsers call
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
      declarations: [UserListComponent],
      imports: [HttpModule], //need this to test service
      providers: [
        UsersService,
        { provide: Router, useClass: RouterStub }
      ]
      // could spy on this
      // providers: [ {provide: UsersService, useValue: usersServiceStub } ] //non-async
    });
    // option 1: UserService from the root injector
    // let usersService = TestBed.get(UsersService);

    fixture = TestBed.createComponent(UserListComponent);
    compiled = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;
    comp = fixture.componentInstance;
    userEl = fixture.debugElement.query(By.css('.users')); // find user element
    // option 2: this should always work// UserService actually injected into the component
    userService = fixture.debugElement.injector.get(UsersService);

    // async:  Setup spy on the `getUsers` method
    spy = spyOn(userService, 'getUsers')
      .and.returnValue(Observable.of(users) );//need to return observable for pipe

    // de = fixture.debugElement.query(By.css('.users'));
    // el = de.nativeElement;
    // .compileComponents(); // compile template and css


    // userEl2  = fixture.debugElement.query(By.css('.user')); // find user element
    // console.log(userEl2);

    // pretend that it was wired to something that supplied a user
    expectedUser = Observable.of(users);

    comp.users = expectedUser;

  });

  // tests
  // -------------------------------------------- *

  it('should create an instance', () => {
    // let component = new UserListComponent();
    expect(app).toBeTruthy();
  });

  it('should check UserService to exist', () => {
    expect(UsersService).toBeTruthy();
  });

  it('should not call service before OnInit', () => {
    // could also test to check no html has appeared
    // ie this li should not exist
    userEl = fixture.debugElement.query(By.css('.users'));
    expect(userEl).toBe(null, 'no element create by ngFor');
    expect(spy.calls.any()).toBe(false, 'getUsers not yet called');
  });

  it('should still not show users after component initialized', () => {
    fixture.detectChanges();
    // IMPORTANT!! getUser service is async => still has not returned with data
    // write test to check no users have appeared on page
    // userEl = fixture.debugElement.query(By.css('.users'));
    // expect(userEl).toBe(null,'no element create by ngFor');
    expect(spy.calls.any()).toBe(true, 'getQuote called');
  });

  // can also be done  with asycn but prefer this way
  it('should have users  (async)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(app.users).toEqual(expectedUser);

  }));

  // test that the component lists array of users
  it('should list user name', () => {
    fixture.detectChanges();
    userEl = fixture.debugElement.query(By.css('.users'));
    // console.log(userEl);
    expect(userEl.nativeElement.textContent).toContain('Test');
  });


  // static content test
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
