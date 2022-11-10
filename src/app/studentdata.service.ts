import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentdataService {

  constructor() { }

  total=0;
  percentage=0;
  grade='-';
  status='Pass';
  sno=1;
  
  studentmark:{sno:number,roll:string,name:string,total:string,percentage:string,grade:string,status:string}[]=[];

  formdata:{roll:any, name:string,subject:any,practical:boolean,theory:number,practicalmark:number}[]=[];
  // studentmark=[
  //   {
  //     sno:1,
  //     roll:"20PXY01",
  //     name:"AAA",
  //     total:"550/600",
  //     percentage:"85%",
  //     grade:"A",
  //     status:"Pass"
  //   }
  // ];

  saveformdata(e:any)
  {
    this.formdata.push(e);
    this.gettotal();
  }

  gettotal()
  {
    this.total=0;
    for(let sub of this.formdata)
    {
        this.total+=Number(sub.theory)+Number(sub.practicalmark);
    }
    this.percentage=this.total/(this.formdata.length*100)*100;
    if((this.percentage<=100)&&(this.percentage>90))
      this.grade='A';
    if((this.percentage<=90)&&(this.percentage>80))
      this.grade='B';
    if((this.percentage<=80)&&(this.percentage>60))
      this.grade='C';
    if((this.percentage<=60)&&(this.percentage>=40))
      this.grade='D';
    if(this.percentage<40)
      this.status='Fail';
  }
  savestudent(e:any)
  {
    const newData = {
      sno: this.sno,
      roll: e.roll,
      name:e.name,
      total:this.total+"/"+(this.formdata.length*100),
      percentage:Math.round(this.percentage)+"%",
      grade:this.grade,
      status:this.status
    };
    this.studentmark.push(newData);
    this.sno++;
    this.total=0;
    this.percentage=0;
    this.grade='-';
  }
}
                   