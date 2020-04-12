import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup, AbstractControl } from "@angular/forms";
import { ILandingdata } from "./landing-data.model";

interface IAge {
  value: string;
  viewValue: string;
}

interface IBoolean {
  value: string;
  viewValue: string;
}

interface IPostData{
  family_members:number,
  is_visited_foreign_country:string,
  is_had_close_contact:string,
  age:string,
  gender:string
}

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
  

  isOptional=false;

  //options gender
  gender: string[] = ["Female", "Male"];

  //options age groups
  ageGroups: IAge[] = [
    { value: "0", viewValue: "Infant (0-5 Years)" },
    { value: "1", viewValue: "child (5-18 Years)" },
    { value: "3", viewValue: "Young (18-30 Years)" },
    { value: "4", viewValue: "Middle Age (30-60 Years)" },
    { value: "5", viewValue: "Old (Above 60 Years)" },
  ];

  //options recently aboard
  booleanGroups: IBoolean[] = [
    { value: "Yes", viewValue: "Yes" },
    { value: "No", viewValue: "No" },
  ];

  dataForm = new FormGroup({
    noOfFamily: new FormControl("", Validators.required),
    foreignContact: new FormControl("", Validators.required),
    closeContact: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    age: new FormControl("", Validators.required),
  });

  isGender(): boolean {
    
    if (this.dataForm.get('gender').value=='Male') return true;
    else return false;
  }

  constructor(private router: Router, activatedRoute: ActivatedRoute) {}

  //IsEmpty's
  isEmptyAge():boolean{
    return this.dataForm.get("age")==undefined ? false :true
  }

  isEmptyGender:boolean=this.dataForm.get('gender').value==null ? true :false
    
    
  

  isEmptyNoOfFamily():boolean{
    return this.dataForm.get("noOfFamily").value==null ? true :false
  }

  isEmptyforeignContact():boolean{
    return this.dataForm.get("foreignContact").value==null ? true :false
  }

  isEmptycloseContact():boolean{
    return this.dataForm.get("closeContact").value==null ? true :false
  }

  

  

  





  ngOnInit(): void {}

  onFormSubmit(): void {
    const submitData = Object.assign({}, this.dataForm.value);

    let postQuery:IPostData = {
      gender: submitData.gender,
      age: submitData.age,
      family_members: submitData.noOfFamily,
      is_visited_foreign_country: submitData.foreignContact,
      is_had_close_contact: submitData.closeContact,
    };

    this.router.navigate(["./figure"], {
      queryParams: {
        postData: JSON.stringify(postQuery),
      },
    });
  }

  //custom validation


  // numberOnly(control: AbstractControl): {[key:string]:boolean} | null {
  //   const inputString = String.fromCharCode(control.value);
  //   if (inputString && !String(inputString).match('^[0,9]*$')) {
      
  //     return {"chaNotAllowed":true};
  //   }
  //   else
  //   return null 
  // }
}
