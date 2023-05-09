import { Component, OnInit } from '@angular/core';

// Form Builder
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Form Group Object
  registerForm: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    tel: new FormControl(''),
    role: new FormControl('')
  })

  // สร้างตัวแปรไว้เช็คว่ามีการ Submit Form แล้วหรือยัง
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Validate Form
    this.registerForm = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(6)], Validators.maxLength(20)],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)], Validators.maxLength(32)],
        password_confirmation: ['', [Validators.required]],
        tel: ['', [Validators.required]],
        role: ['', [Validators.required]]
      },
      {
        // Check Password Match
        validator: this.MustMatch('password', 'password_confirmation')
      }
    )
  }

  // สร้างฟังก์ชันไว้ผูกกับฟอร์ม
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  // Check Password Match
  MustMatch(controlName: string, matchingControlName: string){
    return(formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors){
        return;
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({ mustMatch: true });
      }else{
        matchingControl.setErrors(null);
      }
    }
  }

  // Submit Form
  submitRegister(){
    console.log(this.registerForm.value);
    this.submitted = true;
  }

}
