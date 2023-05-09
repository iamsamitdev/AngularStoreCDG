import { Component, OnInit } from '@angular/core';

// Import Product Service
import { ProductService } from './../../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // สร้างตัวแปรไว้เก็บข้อมูลสินค้าที่ได้จาก API
  products: any = [];

  // Chart JS Data
  type = 'line';
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    private product: ProductService
  ) { }

  ngOnInit(): void {
    // Read All Products API
    this.product.GetAllProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    })
  }

}
