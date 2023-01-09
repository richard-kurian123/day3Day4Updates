// import { TestBed } from '@angular/core/testing';

// import { DataService } from './data.service';

// describe('DataService', () => {
//   let service: DataService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(DataService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });




import { fakeAsync, TestBed } from '@angular/core/testing';
// import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of, tap } from 'rxjs';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  let httpTestingController: HttpTestingController;

  let EMPLOYEES={
    "employees": [
      {
        "id": 101,
        "name": "Richard"
      },
      {
        "id": 102,
        "name": "Raju"
      },
      {
        "id": 103,
        "name": "Dinesh"
      }
    ]
  }

  beforeEach(() => {

    const httpClientSpy = jasmine.createSpyObj('DataService', ['employess','projects','employeeProject','employeeDetails']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: DataService, userValue: httpClientSpy}]
    });
    // service = TestBed.inject(DataService);
  });

  beforeEach(()=>{
    service = TestBed.inject<DataService>(DataService);
    httpTestingController = TestBed.inject<HttpTestingController>(HttpTestingController);

    service.employess = of(EMPLOYEES)
    service.projects = of(EMPLOYEES)
    service.employeeDetails=of(EMPLOYEES)
    service.employeeProject=of(EMPLOYEES)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });




  it('can load instance', () => {
    expect(service).toBeTruthy();
  });


  it(' api call should be defined ',()=>{

    const result =service.getData();

    expect(result).toBeDefined();
  })


  
  it(' 2 http methords should be called',fakeAsync(()=>{
    // expect(component.getOrderDetail).toHaveBeenCalled()
    service.employess.subscribe(
      res =>{
        console.log(res)
        expect(res).toBe(EMPLOYEES);
      }
    )
    // console.log(spy_Detail);
    service.projects.subscribe(
      res=>{
        console.log(res)

        expect(res).toBe(EMPLOYEES);
      }
    )

  }))


});


