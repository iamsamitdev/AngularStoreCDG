import { Component, OnInit } from '@angular/core';

// Form Builder
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn  } from '@angular/forms';

// Import Router
import { Router } from '@angular/router';

// Import UserService
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Form Group Object
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  // สร้างตัวแปรไว้เช็คว่ามีการ Submit Form แล้วหรือยัง
  submitted = false;

  // สร้างตัวแปรไว้เก็บสถานะของการสมัครสมาชิก
  msgStatus: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [ 
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(32)
          ]
        ]
      }
    )
  }

  // สร้างฟังก์ชันสำหรับผูกกับฟอร์ม
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Submit Form
  submitLogin(){
    this.submitted = true;

    // ถ้ายัง Validate ไม่ผ่าน
    if(this.loginForm.invalid){
      return;
    } else {
      // ถ้าผ่านการ Validate ให้ทำต่อไป
      // ส่งข้อมูลไปบันทึกผ่าน API
      this.userService.Login(this.loginForm.value).subscribe
      ((data: {}) => {
        console.log(data);
        if(data != null){
          this.msgStatus='<p class="alert alert-success text-center">เข้าสู่ระบบเรียบร้อย</p>'
          // Navigate to Backend
          this.router.navigate(['/backend'])

          // Redirect to Backend
          // window.location.href = '/backend';
        }else{
          this.msgStatus='<p class="alert alert-danger text-center">มีข้อผิดพลาด ข้อมูลเข้าระบบไม่ถูกต้อง</p>'
        }
      })
    }
  }
  

}
