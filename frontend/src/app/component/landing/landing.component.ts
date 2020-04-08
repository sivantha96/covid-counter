import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  Gender: string;
  gender: string[] = ['Male', 'Female'];

  dataForm = new FormGroup({
    gender: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  })

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    console.log('gender:' + this.dataForm.get('gender').value);
    console.log('age:' + this.dataForm.get('age').value);

  }

  public onSubmit() {
    
    console.log("submited");
    
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
