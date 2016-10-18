/* tslint:disable:no-unused-variable */
declare var it, expect, describe, beforeEach;

import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { By } from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

let comp: UserListComponent;
let fixture;
let userEl;
let userEl2;
let expectedUser;

let users = [
  { name: 'Test', lastname: 'User' },
  { name: 'Test2', lastname: 'User2' }
]

// WHAT ARE WE testing
// just that a list is shown with some mock data

describe('Component: UserList', () => {
  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
    })
    // .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    comp = fixture.componentInstance;
    userEl = fixture.debugElement.query(By.css('.users')); // find user element
    // userEl2  = fixture.debugElement.query(By.css('.user')); // find user element
    // console.log(userEl2);

    // pretend that it was wired to something that supplied a user
    expectedUser = Observable.of(users);
    
    comp.users = expectedUser;
    fixture.detectChanges(); // trigger initial data binding
  });


  it('should create an instance', () => {
    // let component = new UserListComponent();
    expect(comp).toBeTruthy();
  });

  //test that the component receive users via input

  it('should have users  (async)', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(comp.users).toEqual(expectedUser);

  }));

  //test that the component lists array of users
  it('should list user name', () => {
    userEl = fixture.debugElement.query(By.css('.users'));
    // console.log(userEl);
    expect(userEl.nativeElement.textContent).toContain('Test');
  });


});
