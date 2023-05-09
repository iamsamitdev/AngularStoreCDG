import { Injectable } from '@angular/core';

// Import Constant Service
import { ConstantService } from './constant.service';

// Import HTTP Client
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import Product Model
import { ProductModel } from './../models/product.model';

// Import Observable
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Set header options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer 170|JONP4AnQCcaqNccoTqoa2LgVlNDIJ7aJ9uM3y0pl'
    })
  }

  constructor(
    private http: HttpClient, 
    private constant: ConstantService
  ) { }

  // Get All Products
  GetAllProducts(): Observable<ProductModel> {
    return this.http.get<ProductModel>(
      this.constant.API_BASE_URL+'products', 
      this.httpOptions
    )
  }
  
}
