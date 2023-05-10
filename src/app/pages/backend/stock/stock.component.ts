import { Component, OnInit } from '@angular/core';

// Import Product Service
import { ProductService } from './../../../services/product.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  constructor(private product: ProductService) { }

  // สร้างตัวแปรไว้เก็บข้อมูลสินค้าที่ได้จาก API
  products: any = [];

  ngOnInit(): void {
    // Read All Products API
    this.product.GetAllProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    })
  }

}
