import { Component, OnInit } from '@angular/core';

// Import UserService
import { UserService } from './../../../services/user.service';

// Form Builder
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn  } from '@angular/forms';

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

  // สร้างตัวแปรไว้เก็บสถานะของการสมัครสมาชิก
  msgStatus: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Validate Form
    this.registerForm = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
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
  MustMatch(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
          return null;
      }

      if (control?.value !== checkControl?.value) {
      controls.get(checkControlName)?.setErrors({ matching: true });
          return { matching: true };
      } else {
          return null;
      }
    }
  }

  // Submit Form
  submitRegister(){
    // console.log(this.registerForm.value);
    this.submitted = true;

    // ถ้าฟอร์มไม่ผ่านการ Validate ให้ return
    if (this.registerForm.invalid) {
      return;
    }else{
      // ถ้าผ่านการ Validate ให้ทำต่อไป
      // ส่งข้อมูลไปบันทึกผ่าน API
      this.userService.Register(this.registerForm.value).subscribe((data: {}) => {
        console.log(data);
        if(data != null){
          this.msgStatus = "<p class='alert alert-success text-center'>ลงทะเบียนเรียบร้อยแล้ว</p>"
          // สั่งให้ฟอร์ม Reset
          this.registerForm.reset();
          this.submitted = false;
        }else{
          this.msgStatus = "<p class='alert alert-danger text-center'>เกิดข้อผิดพลาด ไม่สามารถลงทะเบียนได้</p>"
        }
      })
    }
  }

}
