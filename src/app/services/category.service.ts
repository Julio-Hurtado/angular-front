import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

export interface Res<T> {
  body: Array<T>;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  urlApi = 'http://localhost:3006/apiV1/categories';

  constructor(private http: HttpClient) {}

  getCategories(pageNumber: number, pageSize: number) {
    return this.http
      .get<Res<Category>>(this.urlApi, {
        params: { pageNumber, pageSize },
      })
      .pipe(
        map(({ body }) =>
          body.map((cat) => {
            return {
              ...cat,
              image: `${environment.apiUrl}/upload/categories/${cat.id}`,
            } as Category;
          })
        )
      );
  }
  getTotalCategories() {
    return this.http.get<{ total: number }>(`${this.urlApi}/total`);
  }
}
