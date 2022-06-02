import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!:FormGroup;
  EmployeeModelObj: EmployeeModel =new EmployeeModel();
  employeeData !:any;
  showAdd !:boolean;
  showUpdate !:boolean;
  constructor(private formbuilder:FormBuilder, private api :ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      fees:['']
    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.EmployeeModelObj.name=this.formValue.value.name;
    this.EmployeeModelObj.email=this.formValue.value.email;
    this.EmployeeModelObj.mobile=this.formValue.value.mobile;
    this.EmployeeModelObj.fees=this.formValue.value.fees;

    this.api.postStudents(this.EmployeeModelObj).subscribe(res=>{
      console.log(res);
      alert("Employee added successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();

    },err=>{
      alert("something Error");
    }
    )
  }
  getAllEmployee(){
    this.api.getStudents().subscribe(res=>{
      this.employeeData=res;
  }
)
  }
  deleteEmployee(row:any){
    this.api.deleteStudents(row.id).subscribe(res=>{
     alert("Employee Deleted");
     this.getAllEmployee();
  }
)
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.EmployeeModelObj.id=row.id;
  this.formValue.controls['name'].setValue(row.name);
  this.formValue.controls['email'].setValue(row.email);
  this.formValue.controls['mobile'].setValue(row.mobile);
  this.formValue.controls['fees'].setValue(row.fees);
  }
  updateEmployeeDetails(){
    this.EmployeeModelObj.name=this.formValue.value.name;
    this.EmployeeModelObj.email=this.formValue.value.email;
    this.EmployeeModelObj.mobile=this.formValue.value.mobile;
    this.EmployeeModelObj.fees=this.formValue.value.fees;
    this.api.updateStudents(this.EmployeeModelObj,this.EmployeeModelObj.id)
    .subscribe(res=>{
      alert("Update Successfully");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
  
}

