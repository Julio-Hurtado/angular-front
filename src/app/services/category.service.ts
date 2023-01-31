import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

export interface Res<T> {
  body: Array<T>;
}
export interface Resp {
  mesage: string;
}
export interface RespGet<T> {
  body: T;
}
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private urlApi = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(pageNumber: number, pageSize: number) {
    return this.http
      .get<Res<Category>>(`${this.urlApi}/categories`, {
        params: { pageNumber, pageSize },
      })
      .pipe(
        map(({ body }) =>
          body.map((cat) => {
            return {
              ...cat,
              image: `${this.urlApi}/upload/categories/${cat.id}`,
            } as Category;
          })
        )
      );
  }

  getTotalCategories() {
    return this.http.get<{ total: number }>(`${this.urlApi}/categories/total`);
  }

  getCategory(id: number) {
    return this.http.get<RespGet<Category>>(`${this.urlApi}/categories/${id}`);
  }
  saveCategory(category: FormData) {
    return this.http.post<Resp>(`${this.urlApi}/categories`, category);
  }

  updateCategory(id: number, category: FormData) {
    return this.http.put<Resp>(`${this.urlApi}/categories/${id}`, category);
  }
}
