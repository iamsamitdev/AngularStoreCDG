import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-backend',
  templateUrl: './header-backend.component.html',
  styleUrls: ['./header-backend.component.scss']
})
export class HeaderBackendComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  // sign out
  signOut(){
    this.auth.logout()
  }

}
