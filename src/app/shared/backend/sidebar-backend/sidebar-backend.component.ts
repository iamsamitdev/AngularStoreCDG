import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar-backend',
  templateUrl: './sidebar-backend.component.html',
  styleUrls: ['./sidebar-backend.component.scss']
})
export class SidebarBackendComponent implements OnInit {

  // สร้างตัวแปรไว้เก็บข้อมูลผู้ใช้งานที่ Login
  userProfile = {
    "role":"",
  }

  constructor(private auth: AuthService) { 
    this.userProfile.role = this.auth.getUser()["role"]
  }

  ngOnInit(): void {
  }

}
