import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { StudentdataService } from '../studentdata.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  studentmark:{sno:number,roll:any,name:string,total:any,percentage:any,grade:string,status:string}[]=[];

  formdata:{roll:any,name:string,subject:any,practical:boolean,theory:number,practicalmark:number}[]=[];
  
  show=false;
     
  studentform=new FormGroup
  <{
    roll:FormControl<string|null>,
    name:FormControl<string|null>,
    subject:FormControl<string|null>,
    practical:FormControl<boolean|null>,
    theory:FormControl<string|null>,
    practicalmark?:FormControl<string|null>,
  }>
  ({
    roll:new FormControl('',Validators.compose([Validators.required,Validators.pattern('[0-9]{2}[a-zA-Z .]{3}[0-9]{2}')])),
    name:new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z .]*')])),
    subject:new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z0-9 .]*')])),
    practical:new FormControl(false),
    theory:new FormControl('',[Validators.required,Validators.max(100),Validators.pattern('[0-9-]*')]),
  });
  constructor(public studservice:StudentdataService) { }

  ngOnInit(): void {
    this.studentmark=this.studservice.studentmark;
  }

  saveformdata()
  {
     if(this.studentform.valid)
     {
       alert("Submitted Successfully");
       this.studservice.saveformdata(this.studentform.value);
       this.studentform.controls["theory"].setValue('');
       this.studentform.controls["subject"].setValue('');
       this.studentform.controls["practical"].setValue(false);
       this.show=false;
     }
  }
  
  calc(a:any,b:any)
  {
    let c=(Number)(a)+(Number)(b);
    return c;
  }
  savestudent()
  {
    this.studservice.savestudent(this.studentform.value);
    this.studentform.reset;
  }

  practicalchecked(e:any)
  {
    if(e.checked==true)
    {
      this.show=true;
      this.studentform.addControl("practicalmark",new FormControl('',[Validators.required,Validators.max(25)]));
      this.studentform.controls["theory"].setValidators([Validators.required,Validators.max(75),Validators.pattern('[0-9-]*')]);
    }
    else{
      this.show=false;
      this.studentform.removeControl("practicalmark");
      this.studentform.controls["theory"].setValidators([Validators.required,Validators.max(100),Validators.pattern('[0-9-]*')]);
      this.studservice.formdata.splice(5,1);
    }
  }
  // get f()
  // {return this.studentform.controls;}
  // In html access as *ngIf=f.name.errors.required
  get roll(){
    return this.studentform.get('roll');
  }

  get name(){
    return this.studentform.get('name');
  }

  get subject(){
    return this.studentform.get('subject');
  }

  get theory(){
    return this.studentform.get('theory');
  }
}
