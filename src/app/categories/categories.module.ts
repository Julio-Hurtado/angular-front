import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CategoriesComponent, CategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    SharedModule,
  ],
})
export class CategoriesModule {}
