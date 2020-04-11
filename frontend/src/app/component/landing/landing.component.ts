import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";

interface IAge {
  value: string;
  viewValue: string;
}

interface IForeign {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
  gender: string[] = ["Female","Male"];
  ageGroups: IAge[] = [
    { value: "age-0", viewValue: "Infant (0-5 Years)" },
    { value: "age-1", viewValue: "child (5-18 Years)" },
    { value: "age-3", viewValue: "Young (18-30 Years)" },
    { value: "age-4", viewValue: "Middle Age (30-60 Years)" },
    { value: "age-5", viewValue: "Old (Above 60 Years)" },
   
  ];

  foreignGroups: IForeign[] = [
    { value: true, viewValue: "Yes" },
    { value: false, viewValue: "No" },
  ];

  dataForm = new FormGroup({
  
      noOfFamily: new FormControl("", Validators.required),
      youForeign: new FormControl("", Validators.required),
      familyForeign: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
   
  });

  constructor(private router: Router, activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  onFormSubmit(): void {
    const postData = Object.assign({}, this.dataForm.value);
    postData.info1=Object.assign({}, this.dataForm.value.info1)
    postData.info2=Object.assign({}, this.dataForm.value.info2)
      // console.log('gender:' + this.dataForm.get('gender').value);
      // console.log('age:' + this.dataForm.get('age').value);
      // console.log(JSON.stringify(postData))
      this.router.navigate(['./figure'],{queryParams:{
        postData:JSON.stringify(postData)
      }})

  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
