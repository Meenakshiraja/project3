import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  show=false;
  i=0;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
  studentmark:{
    roll:string,name:string,
    markform:[]
  //     subject:string,
  //     practical:boolean,
  //     theory:string,
  //     practicalmark:string,
  //     subtotal:string
  //   } []
  ,total:string,percentage:string,grade:string,status:string}[]=[];

  studentform = this.fb.group
  ({
    roll:['',Validators.compose([Validators.required,Validators.pattern('[0-9]{2}[a-zA-Z .]{3}[0-9]{2}')])],
    name:['',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z .]*')])],
    total:[''],
    percentage:[''],
    grade:[''],
    status:[''],
    markform:this.fb.array([this.add()])
  });

  add()
  {
   return this.fb.group({
      subject:[''],
      practical:[],   
      theory:[''],
      practicalmark:[''],
      subtotal:['']
    });
  }
  
  saveformdata()
  {
    let subtotal:Number;
    let total=0;
    let percentage=0;
    let grade='-';
    let status='Pass';
    
    this.markform.push(this.add());
    let m=this.markform.value[this.i];
    if(m.practical!=null)
      subtotal=Number(m.theory)  + Number(m.practicalmark) ;
    else
      subtotal=m.theory

    this.markform.controls[this.i].patchValue({subtotal:subtotal});
    this.i++;
    
    for(let j=0;j<this.markform.length;j++)
    {
      total+=Number(this.markform.value[j].subtotal);
    }
    this.studentform.patchValue({total:String(total)});
    percentage=total/((this.markform.length-1)*100)*100;
    this.studentform.patchValue({percentage:String(percentage)});
    if((percentage<=100)&&(percentage>90))
      grade='A';
    if((percentage<=90)&&(percentage>80))
      grade='B';
    if((percentage<=80)&&(percentage>60))
      grade='C';
    if((percentage<=60)&&(percentage>=40))
      grade='D';
    if(percentage<40)
      status='Fail';
    this.studentform.patchValue({grade:grade});      
    this.studentform.patchValue({status:status});
    console.log(this.studentform.value);
  }

  delete(index: number) {
    const consent = confirm("Are you sure want to delete this question?");
    if (!consent) return;
    (this.studentform.get('markform') as FormArray).removeAt(index);
  }
  
  saveform()
  { 
   if(this.studentform.valid)
     {
       alert("Submitted Successfully");
         //this.studentmark.push(this.studentform.value);
         //console.log(this.studentmark);
      //  this.studentform.controls["practical"].setValue(false);
  //      this.show=false;
     }
  }
  
    practicalchecked(e:any)
  {
    if(e.checked==true)
    {
      this.show=true;
      // this.studentform.addControl("practicalmark",new FormControl('',[Validators.required,Validators.max(25)]));
      //console.log(this.studentform.controls['markform'].controls[0].controls['theory']);
      // this.studentform.controls["theory"].setValidators([Validators.required,Validators.max(75),Validators.pattern('[0-9-]*')]);
    }
    else{
      this.show=false;
      // this.studentform.removeControl("practicalmark");
      // this.studentform.controls["theory"].setValidators([Validators.required,Validators.max(100),Validators.pattern('[0-9-]*')]);
      // this.studservice.formdata.splice(5,1);
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

  get markform(){
    return this.studentform.get('markform') as FormArray;
  }

  get total(){
    return this.studentform.get('total');
  }

  get percentage(){
    return this.studentform.get('percentage');
  }

  get grade(){
    return this.studentform.get('grade');
  }
}
