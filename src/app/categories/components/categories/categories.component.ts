import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  totalPage = 0;
  pageSize = 5;
  actualPage = 1;
  arrPage: Array<number> = [];
  categories: Category[] = [];

  constructor(private categorySvc: CategoryService) {}

  ngOnInit(): void {
    this.getCategories(this.actualPage, this.pageSize);
    this.getTotalRecords();
  }

  getCategories(page: number, size: number): void {
    this.categorySvc.getCategories(page, size).subscribe((res) => {
      console.log(res);
      this.categories = res.body;
    });
  }

  getTotalRecords(): void {
    this.categorySvc.getTotalCategories().subscribe(({ total }) => {
      console.log(total);
      this.calculatePages(total);
    });
  }

  calculatePages(totalRecords: number): void {
    this.totalPage = Math.ceil(totalRecords / this.pageSize);
    this.arrPage = new Array(this.totalPage);
    console.log(this.totalPage, this.arrPage);
  }

  goToPage(page: number): void {
    this.actualPage = page;
    this.getCategories(this.actualPage, this.pageSize);
    console.log('actual page', this.actualPage);
  }
}
