import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }


  
  employess=this.http.get("/assets/Employees.json");
  projects=this.http.get("/assets/projects.json");
  employeeProject=this.http.get("/assets/employee-project.json");
  employeeDetails=this.http.get("/assets/employee-details.json");

  getData(){
    return forkJoin([this.employess,this.projects,this.employeeProject,this.employeeDetails]);
  }


  getOne():Observable<any>{
    return this.http.get('/assets/emp2.json');
  }
}
