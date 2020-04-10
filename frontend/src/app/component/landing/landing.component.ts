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
  gender: string[] = ["Male", "Female"];
  ageGroups: IAge[] = [
    { value: "age-0", viewValue: "younger than 40" },
    { value: "age-1", viewValue: "between 40-60" },
    { value: "age-2", viewValue: "older than 60" },
  ];

  foreignGroups: IForeign[] = [
    { value: true, viewValue: "Yes" },
    { value: false, viewValue: "No" },
  ];

  dataForm = new FormGroup({
    info1: new FormGroup({
      noOfFamily: new FormControl("", Validators.required),
      youForeign: new FormControl("", Validators.required),
      familyForeign: new FormControl("", Validators.required),
    }),

    info2: new FormGroup({
      gender: new FormControl("", Validators.required),
      age: new FormControl("", Validators.required),
    }),
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
