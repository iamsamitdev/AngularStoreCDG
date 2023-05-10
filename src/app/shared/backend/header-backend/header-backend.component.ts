import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-backend',
  templateUrl: './header-backend.component.html',
  styleUrls: ['./header-backend.component.scss']
})
export class HeaderBackendComponent implements OnInit {

  // สร้างตัวแปรไว้เก็บข้อมูลผู้ใช้งานที่ Login
  userProfile = {
    "fullname":"",
    "email":"",
    "role":"",
  }

  // Role Array
  role: any = ["", "admin", "user"]

  constructor(
    private auth: AuthService
  ) { 
    // ดึงข้อมูลผู้ใช้งานจาก Local Storage
    this.userProfile.fullname = this.auth.getUser()["fullname"]
    this.userProfile.email = this.auth.getUser()["email"]
    this.userProfile.role = this.auth.getUser()["role"]
  }

  ngOnInit(): void {
  }

  // sign out
  signOut(){
    this.auth.logout()
  }

}
