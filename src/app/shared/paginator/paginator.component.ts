import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnChanges {
  @Input() totalData: number = 0;
  @Input() path: string = '';
  @Input() pageSize: number = 0;

  @Output() emitPage = new EventEmitter<number>();

  arrPage: Array<number> = [];
  totalPage: number = 0;
  actualPage: number = 1;
  constructor() {}

  ngOnChanges(): void {
    this.calculatePages(this.totalData);
  }

  calculatePages(totalRecords: number): void {
    this.totalPage = Math.ceil(totalRecords / this.pageSize);
    this.arrPage = new Array(this.totalPage);
  }
  goToPage(page: number) {
    this.actualPage = page;
    this.emitPage.emit(this.actualPage);
  }
}
