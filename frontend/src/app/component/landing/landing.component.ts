import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ILandingdata } from "./landing-data.model";

interface IAge {
  value: string;
  viewValue: string;
}

interface IForeign {
  value: string;
  viewValue: string;
}

interface IPostData{
  family_members:number,
  is_visited_foreign_country:string,
  is_member_visited_foreign_country:string,
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
  foreignGroups: IForeign[] = [
    { value: "Yes", viewValue: "Yes" },
    { value: "No", viewValue: "No" },
  ];

  dataForm = new FormGroup({
    noOfFamily: new FormControl("", Validators.required),
    youForeign: new FormControl("", Validators.required),
    familyForeign: new FormControl("", Validators.required),
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
    return this.dataForm.get("noOfFamily").value()==undefined ? true :false
  }

  isEmptyYouForeign():boolean{
    return this.dataForm.get("youForeign").value()==undefined ? true :false
  }

  isEmptyFamilyForeign():boolean{
    return this.dataForm.get("familyForeign").value()===undefined ? true :false
  }

  

  

  





  ngOnInit(): void {}

  onFormSubmit(): void {
    const submitData = Object.assign({}, this.dataForm.value);

    let postQuery:IPostData = {
      gender: submitData.gender,
      age: submitData.age,
      family_members: submitData.noOfFamily,
      is_visited_foreign_country: submitData.youForeign,
      is_member_visited_foreign_country: submitData.familyForeign,
    };

    this.router.navigate(["./figure"], {
      queryParams: {
        postData: JSON.stringify(postQuery),
      },
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
