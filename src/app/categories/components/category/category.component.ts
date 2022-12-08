import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { generateUrl } from 'src/app/shared/utils/generate-url-img';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  min = 5;
  max = 50;
  categoryForm!: FormGroup;
  previousImg: string | null = null;
  constructor(
    private readonly fb: FormBuilder,
    private readonly categorySvc: CategoryService,
    private readonly router: Router,
    private readonly notificationsSvc: NotificationsService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.buildForm();
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

  sendDataToApi(e: Event): void {
    if (this.categoryForm.valid) {
      e.preventDefault();
      this.createCategory();
    }
    this.categoryForm.markAllAsTouched();
  }

  private createCategory(): void {
    const formData = new FormData();
    formData.append('name', this.nameField?.value);
    formData.append('file', this.imageField?.value);

    this.categorySvc.saveCategory(formData).subscribe((res) => {
      console.log(res.mesage);
      this.notificationsSvc.showSuccess(res.mesage);
      this.router.navigateByUrl('/categories');
    });
  }
}
