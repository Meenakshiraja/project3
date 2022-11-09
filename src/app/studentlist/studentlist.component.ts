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
  
  maxtheory=100;
  maxpractical=25;

  studentform=new FormGroup({
    roll:new FormControl('',Validators.compose([Validators.required,Validators.pattern('[0-9]{2}[a-zA-Z .]{3}[0-9]{2}')])),
    name:new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z .]*')])),
    subject:new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z0-9 .]*')])),
    practical:new FormControl(''),
    theory:new FormControl('',Validators.compose([Validators.required,Validators.pattern('[0-9-]*')])),
    practicalmark:new FormControl({value:'0',disabled:true})
  });
  constructor(public studservice:StudentdataService) { }

  ngOnInit(): void {
    this.studentmark=this.studservice.studentmark;
  }

  saveformdata()
  {
     if(this.studentform.valid)
     {
       this.studentform.controls["practicalmark"].enable();
       alert("Submitted Successfully");
       this.studservice.saveformdata(this.studentform.value);
       this.studentform.controls["theory"].setValue('');
       this.studentform.controls["subject"].setValue('');
       this.studentform.controls["practicalmark"].setValue('0');
       this.studentform.controls["practicalmark"].disable();
     }
  }
  
  checkrange(e:any)
  {
    if(e.value>this.maxtheory)
    {
      if(this.maxtheory==75)
      {
        alert("Please enter the mark for 75");
        e.value='';
      }
      else{
        alert("Please enter the mark for 100");
        e.value='';
      }
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
  }

  practicalchecked(e:any)
  {
    if(e.checked==true)
    {
      this.maxtheory=75;
      this.studentform.controls["practicalmark"].enable();
      this.studentform.controls["practicalmark"].setValidators([Validators.required]);
    }
    else{
      this.maxtheory=100;
      this.studentform.controls["practicalmark"].disable();
      this.studentform.controls["practicalmark"].setValidators(null);
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
