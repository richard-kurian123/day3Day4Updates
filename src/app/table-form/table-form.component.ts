import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  DataService
} from '../data.service';

import { Employee } from './employee';
import { EmployeeDetails } from './employeeDetails';
import { EmployeeProject } from './employeeProject';
import { Projects } from './projects';
import { FormValues } from './formValues';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {

  public empForm!: FormGroup;

  public projects: any | Projects = [];
  public employees: any | Employee = [];
  public employeeProject: any | EmployeeProject = [];
  public employeeDetails: any |EmployeeDetails = [];

  public formDataArray: any = [];
  public localStorageData: any;
  public randomId: number | undefined;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, ) {}

  ngOnInit(): void {

    this.getEmpForm();
    this.gettingData();
    this.dataRetrive();

  }
  public getEmpForm() {
    this.empForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      department: ['', [Validators.required]],
      project: this.formBuilder.array([
        new FormControl(null)

      ]),
    })
  }
  addProject() {
    const control = new FormControl(null, [Validators.required]);
    ( < FormArray > this.empForm.get('project')).push(control);
  }
  get projectControls() {
    return ( < FormArray > this.empForm.get('project')).controls;
  }
  public onSubmit() {
    const formValues = this.empForm.value;
    this.formDataArray.push(formValues);
    this.generateId();
    this.formDataArray.forEach((item: FormValues) => {
      if (item["id"] == undefined) {
        Object.assign(item, {
          id: this.randomId
        })
      }
      if (item.project[0] !=null) {
        item.projectStatus = true;
      } else {
        item.projectStatus = false;
      }

    })
    localStorage.setItem("formData", JSON.stringify(this.formDataArray));
    this.empForm.reset();
    this.empForm.setControl('project',this.formBuilder.array([null]));
  

  }

  public gettingData() {

    this.dataService.getData().subscribe(([employees, projects, employeeProject, employeeDetails]) => {
      this.employees = employees;
      this.employees = this.employees.employees;
      this.projects = projects;
      this.projects = this.projects.projects;
      this.employeeProject = employeeProject;
      this.employeeProject = this.employeeProject.employeeProject;
      this.employeeDetails = employeeDetails;
      this.employeeDetails = this.employeeDetails.employeeDetails;

      this.employees.forEach((item: Employee) => {
        this.employeeDetails.forEach((a:EmployeeDetails ) => {
          if (item.id === a.empId) {
            item.designation = a.designation;
            item.department = a.department;
          }
        })
      })
      this.employeeProject.forEach((b: EmployeeProject) => {
        this.projects.forEach((c: Projects) => {
          if (b.project === c.id) {
            b.projectName = c.name;
          }
        })
      })

      this.employees.forEach((item1: Employee) => {
        this.employeeProject.forEach((item2: EmployeeProject) => {

          if (item1.id === item2.empId) {
            item1.project = 'project assigned'
            item1.control = true;

            if (!item1.projectArray) {
              item1.projectArray = [];
              item1.projectArray.push(item2.projectName);

            } else {
              item1.projectArray.push(item2.projectName)
            }
          }
        })
      })

    },(err:string)=>{
      console.log("api array from first one",err);
    })
  }
    public dataRetrive() {

     
        this.localStorageData = localStorage.getItem('formData');
        this.formDataArray = JSON.parse(this.localStorageData);
 
  }

    public generateId() {
    this.randomId = Math.floor(Math.random() * (1000 - 110 + 1)) + 110;
    return this.randomId;
  }

}
