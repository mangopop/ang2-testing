/* tslint:disable:no-unused-variable */
declare var it, expect, describe, beforeEach;

import { TestBed, async, tick, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DebugElement } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HttpModule } from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';

let comp: UserComponent;
let userEl;
let userEl2;
let fixture: ComponentFixture<UserComponent>;
let de: DebugElement;
let el: HTMLElement;
let app;
let compiled;
let userService: UsersService;
let spy: jasmine.Spy;
let user$;

//displays a user using the usersService

class MockActivatedRoute extends ActivatedRoute {
    constructor() {
        super(null, null, null, null, null, null);
        this.params = Observable.of({id: "1"});
    }
}

describe('Component: User', () => {
  beforeEach(() => {

    let id = 1;

    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpModule], //need this to test service
      providers: [
        UsersService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ]
    });

    fixture = TestBed.createComponent(UserComponent);
    compiled = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;
    userService = fixture.debugElement.injector.get(UsersService);

    de = fixture.debugElement.query(By.css('.name'));
    el = de.nativeElement;

    spy = spyOn(userService, 'getUser')
    .and.returnValue(Observable.of( {
        id: "1",
        createdAt: 1478539214,
        name: "First1 Last1",
        imageUrl: "https://placeimg.com/60/60/people",
        email: "first1@mail.com"
    } ));
  });

  it('should create an instance', () => {
    expect(app).toBeTruthy();
  });

  it('should not call service before oninit', () => {
    expect(spy.calls.any()).toBe(false, 'getUser not yet called');
  });

  //makes a call to the service on with init
  // it('should call service after oninit', () => {
  //       console.log(app.user$);    
  //   fixture.detectChanges();
  //   // getUser service is async => still has not returned with user
  //   expect(el.textContent).toBe('', 'no name yet');
  //   expect(spy.calls.any()).toBe(true, 'getUser called');
  // }); 

  //get route param

  //call with route param

  //mock service returns users,users seen on page
  it('should when called, return users', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getUser
    fixture.detectChanges(); // update view with user
    // userService.getUser(1);no effect

    expect(el.textContent).toBe('First1 Last1');
  }));
});
    