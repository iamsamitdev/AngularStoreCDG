import { Injectable } from '@angular/core';

// Import Constant Service
import { ConstantService } from './constant.service';

// Import HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import User Model
import { UserModel } from './../models/user.model';

// Import Observable
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Set header options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  }

  constructor(
    private http: HttpClient,
    private constant: ConstantService
  ) { }

  // Register
  Register(data: any): Observable<UserModel> {
    return this.http.post<UserModel>(
      this.constant.API_BASE_URL+'register', 
      JSON.stringify(data), 
      this.httpOptions
    )
  }

}
