/* tslint:disable:no-unused-variable */

declare var it, expect, describe, beforeEach;

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

let comp: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let de: DebugElement;
let el: HTMLElement;



describe('Component: Header', () => {

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });

    // this might be alternative way // create component and test fixture
    // fixture returns the component and surrounding environment
    fixture = TestBed.createComponent(HeaderComponent);
    // get test component from the fixture
    comp = fixture.componentInstance;
    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });
  it('no title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });
});
