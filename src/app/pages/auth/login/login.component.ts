import { Component, OnInit } from '@angular/core';

// Form Builder
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn  } from '@angular/forms';

// Import Router
import { Router } from '@angular/router';

// Import UserService
import { UserService } from 'src/app/services/user.service';

// Import AuthService
import { AuthService } from '../../../services/auth.service';

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

  // สร้างตัวแปรไว้เก็บข้อมูลผู้ใช้งานที่ Login
  userLogin = {
    "fullname":"",
    "email":"",
    "username":"",
    "role":"",
    "token":""
  }

  // สร้างตัวแปรไว้เช็คว่ามีการ Submit Form แล้วหรือยัง
  submitted = false;

  // สร้างตัวแปรไว้เก็บสถานะของการสมัครสมาชิก
  msgStatus: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private auth: AuthService
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
      this.userService.Login(this.loginForm.value).subscribe((data: any) => {
        // console.log(data);

        this.msgStatus='<p class="alert alert-success text-center">เข้าสู่ระบบเรียบร้อย</p>'

        // กำหนดค่าลงใน Local Storage
        this.userLogin = {
          "fullname": data.user.fullname,
          "email": data.user.email,
          "username": data.user.username,
          "role": data.user.role,
          "token": data.token
        }

        // ส่ง token ไปเก็บไว้ใน Local Storage
        this.auth.sendToken(this.userLogin);

        // Navigate to Backend
        this.router.navigate(['/backend'])

        // Redirect to Backend
        // window.location.href = '/backend';
        
      }, error => {
        //  console.log(error);
        if(error.status == 401){
          this.msgStatus='<p class="alert alert-danger text-center">มีข้อผิดพลาด ข้อมูลเข้าระบบไม่ถูกต้อง</p>'
        }else{
          this.msgStatus='<p class="alert alert-danger text-center">มีข้อผิดพลาดบางอย่าง</p>'
        }
      })
    }
  }
  

}
