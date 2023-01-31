import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { generateUrl } from 'src/app/shared/utils/generate-url-img';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  min = 5;
  max = 50;
  categoryForm: FormGroup;
  id: number | null = null;
  previousImg: string | null = null;
  constructor(
    private readonly fb: FormBuilder,
    private readonly categorySvc: CategoryService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notificationsSvc: NotificationsService,
    private readonly location: Location
  ) {
    this.categoryForm = this.buildForm();
  }

  ngOnInit(): void {
    this.loadCategory();
    // this.route.params.subscribe((params) => {
    //   this.id = params['id'] as number;
    //   if (this.id) {
    //     this.getCategory(this.id);
    //   }
    // });
  }

  private buildForm() {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(this.min),
          Validators.maxLength(this.max),
        ],
      ],
      image: ['', [Validators.required]],
    });
  }

  public get nameField() {
    return this.categoryForm.get('name');
  }

  public get imageField() {
    return this.categoryForm.get('image');
  }

  public get isNameFieldValid(): boolean {
    return this.nameField!.touched && this.nameField!.valid;
  }

  public get isNameFieldInvalid(): boolean {
    return this.nameField!.touched && this.nameField!.invalid;
  }

  public get isImageFieldValid(): boolean {
    return this.imageField!.touched && this.imageField!.valid;
  }

  public get isImageFieldInvalid(): boolean {
    return this.imageField!.touched && this.imageField!.invalid;
  }

  uploadFile(event: Event): void {
    const file = (<HTMLInputElement>event.target).files!.item(0);
    if (file) {
      this.imageField?.patchValue(file);
      generateUrl(this.imageField?.value).then(
        (url) => (this.previousImg = url)
      );
    }
  }

  private loadCategory(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = <number | null>params.get('id');
          if (this.id) {
            return this.categorySvc.getCategory(this.id);
          }
          return [];
        })
      )
      .subscribe(({ body: category }) => {
        this.categoryForm.patchValue(category);
        this.previousImg = `${environment.apiUrl}/upload/categories/${category.id}`;
      });
  }

  private getCategory(id: number): void {
    this.categorySvc.getCategory(id).subscribe(({ body: category }) => {
      this.categoryForm.patchValue(category);
      this.previousImg = `${environment.apiUrl}/upload/categories/${category.id}`;
    });
  }

  sendDataToApi(e: Event): void {
    if (this.categoryForm.valid) {
      e.preventDefault();
      console.log(this.categoryForm.value);
      this.updateCategory();
    }
    this.categoryForm.markAllAsTouched();
  }

  private updateCategory(): void {
    const formData = new FormData();
    formData.append('name', this.nameField?.value);
    formData.append('file', this.imageField?.value);

    this.categorySvc.updateCategory(this.id!, formData).subscribe((res) => {
      console.log(res.mesage);
      this.notificationsSvc.showSuccess(res.mesage);
      this.router.navigateByUrl('/categories');
    });
  }

  goToBack() {
    this.location.back();
  }
}
