import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  // API Base URL
  API_BASE_URL = 'https://www.itgeniuslab.com/laravel-inventory-backend/api/';

  constructor() { }
}
