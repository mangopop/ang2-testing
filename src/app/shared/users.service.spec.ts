/* tslint:disable:no-unused-variable */
declare var it, expect, describe, beforeEach;

// TODO should this not be tested in isolation

import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { UsersService } from './users.service';
import { Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod } from '@angular/http';
import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

describe('Service: Users', () => {
let mockBackend: MockBackend;

  beforeEach(() => {
    

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        UsersService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
          (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }

      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  });

  // tests 
  // ---------------------------------------------------------

  it('should find service', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  it('should get blogs', done => {
    let usersService: UsersService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: [
                {
                  id: 26,
                  name: 'simon',
                  
                }]
            }
            )));
        });

      usersService = getTestBed().get(UsersService);
      expect(usersService).toBeDefined();

      usersService.getUsers().subscribe((users:[any]) => {
        expect(users.length).toBeDefined();
        expect(users.length).toEqual(1);
        expect(users[0].id).toEqual(26);
        done();
      });
    });
  });

});
