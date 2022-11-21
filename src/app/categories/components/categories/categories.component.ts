import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  pageSize = 5;
  actualPage = 1;
  categories: Category[] = [];
  totalCategories: number = 0;
  constructor(private categorySvc: CategoryService) {}

  ngOnInit(): void {
    this.getCategories(this.actualPage, this.pageSize);
    this.getTotalRecords();
  }

  getCategories(page: number, size: number): void {
    this.categorySvc.getCategories(page, size).subscribe((res) => {
      this.categories = res;
    });
  }

  getTotalRecords(): void {
    this.categorySvc.getTotalCategories().subscribe(({ total }) => {
      this.totalCategories = total;
    });
  }

  goToPage(page: number): void {
    this.actualPage = page;
    this.getCategories(this.actualPage, this.pageSize);
  }
}
