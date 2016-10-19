/* tslint:disable:no-unused-variable */

declare var it, expect, describe, beforeEach;
import { NO_ERRORS_SCHEMA }          from '@angular/core';
import { async, fakeAsync, ComponentFixture, TestBed, getTestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { UserListComponent } from './user-list/user-list.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import { UsersService } from './shared/users.service';
// import { HttpModule } from '@angular/http';

import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation }         from '@angular/common/testing';
import { Router, RouterLinkWithHref } from '@angular/router';

import { RouterLinkStubDirective} from './testing/router-stubs';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let el: HTMLElement;
let app;
let compiled;
// let userService: UsersService;
// let spy: jasmine.Spy;//
let linkDes;
let links;

let users = [
  { firstname: 'Test', lastname: 'User' },
  { firstname: 'Test2', lastname: 'User2' }
];

// WHAT NEEDS TESTING 
// displays router outlet
// test that all links work

describe('App: TestExperiments', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        // *** MUST ADD MANUALLY *** //
        AppComponent,
        HeaderComponent, //harmless just import //if components are more complicated we can stub
        RouterLinkStubDirective
      ],

      imports: [RouterTestingModule], //need this to test service
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;

    // trigger initial data binding
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement
      .queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes
      .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

  });

  // TESTs
  // ------------------------------------- //

  it('should create the app', async(() => {
    // let fixture = TestBed.createComponent(AppComponent);
    // let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));

  // router TESTs
  // ------------------------------------- //

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(1, 'should have 1 links');
    expect(links[0].linkParams).toBe('/users', '1st link should go to Users');
  });

  it('can click users link in template', () => {
    const usersLinkDe = linkDes[0];
    const usersLink = links[0];
    console.log(usersLinkDe);

    expect(usersLink.navigatedTo).toBeNull('link should not have navigated yet');

    usersLinkDe.triggerEventHandler('click', null); //this is failing with 'button' in template message
    fixture.detectChanges();
    expect(usersLinkDe.navigatedTo).toBe('/users');
  });
});
