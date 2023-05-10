import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userProfile = {
    "fullname":"",
    "email":"",
    "username":"",
    "role":"",
    "token":""
  }

  constructor(private route: Router) { }

  // send token to local storage
  sendToken(data: any) {
    localStorage.setItem("LoggedInFullname", data["fullname"])
    localStorage.setItem("LoggedInEmail", data["email"])
    localStorage.setItem("LoggedInUser", data["username"])
    localStorage.setItem("LoggedInRole", data["role"])
    localStorage.setItem("LoggedInToken", data["token"])
  }

  // get user token from local storage
  getUser(){
    this.userProfile.fullname = localStorage.getItem("LoggedInFullname") ?? ""
    this.userProfile.email = localStorage.getItem("LoggedInEmail") ?? ""
    this.userProfile.username = localStorage.getItem("LoggedInUser") ?? ""
    this.userProfile.role = localStorage.getItem("LoggedInRole") ?? ""
    this.userProfile.token = localStorage.getItem("LoggedInToken") ?? ""
    return this.userProfile
  }

  // get token from local storage
  getToken(){
    return localStorage.getItem("LoggedInToken")
  } 

  // check if user is logged in
  isLoggedIn(){
    return this.getToken() !== null
  }

  // logout user
  logout(){
    localStorage.removeItem("LoggedInFullname")
    localStorage.removeItem("LoggedInEmail")
    localStorage.removeItem("LoggedInUser")
    localStorage.removeItem("LoggedInRole")
    localStorage.removeItem("LoggedInToken")
    this.route.navigate(["/auth/login"])
  }

}
