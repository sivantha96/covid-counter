import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ILandingdata } from "./landing-data.model";

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
  Gender: string;

  gender: string[] = ["Female", "Male"];
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

  isGender(): boolean {
    if (this.Gender == "Male") return true;
    else return false;
  }

  constructor(private router: Router, activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  onFormSubmit(): void {
    const submitData = Object.assign({}, this.dataForm.value);

    let postQuery: ILandingdata = {
      gender: submitData.gender,
      age: submitData.age,
      family_members: submitData.noOfFamily,
      is_visited_foreign_country: submitData.youForeign.toString(),
      is_member_visited_foreign_country: submitData.familyForeign.toString(),
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
