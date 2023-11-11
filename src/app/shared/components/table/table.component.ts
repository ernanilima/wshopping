import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs';
import { BaseValidationDirective } from '../../base/base-validation.directive';
import { Columns } from '../../model/columns.model';
import { Page } from '../../params/page-response';
import { FormTableFilter } from './table-filter.form';
import { TableTitle } from './table.title';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent
  extends BaseValidationDirective
  implements OnInit, OnDestroy
{
  @ViewChild('table') private _table: Table;
  @ViewChild('filter') private _filter: HTMLInputElement;

  @Output() public onFind = new EventEmitter<TableLazyLoadEvent>();
  @Output() public onRegisterItem = new EventEmitter();
  @Output() public onSearchItem = new EventEmitter();
  @Output() public onEditItem = new EventEmitter();
  @Output() public onDeleteItem = new EventEmitter();
  @Output() public onSelectItem = new EventEmitter();
  @Input() public isToSelectItem = false;
  @Input() public tableMinWidth = '55rem';
  @Input({ required: true }) public tableTitle: TableTitle;
  @Input({ required: true }) public datas: Page<unknown[]>;
  @Input({ required: true }) public columns: Columns[] = [];
  @Input({ required: true }) public loading = new BehaviorSubject(true);

  @Output() public reloadTableChange = new EventEmitter<
    BehaviorSubject<boolean>
  >();
  @Input({ required: true }) public set reloadTable(
    behaviorSubject: BehaviorSubject<boolean>
  ) {
    behaviorSubject.pipe(takeUntil(this._unsubscribe$)).subscribe((value) => {
      if (!value) return;
      this.reloadTableChange.emit(new BehaviorSubject(false));
      this._table.sortField = this.defaultSort.field;
      this._table.sortOrder = -1;
      this.clear();
    });
  }

  public isRegisterItem = false;
  public isSearchItem = false;
  public isEditItem = false;
  public isDeleteItem = false;

  public get defaultSort(): Columns {
    return this.columns.find((c: Columns) => c.defaultSort);
  }

  public get defaultFilterPlaceholder(): string {
    return this.columns
      .filter((c: Columns) => c.defaultFilter)
      .map((c) => c.name)
      .join(', ');
  }

  public get totalRecords(): number {
    if (this.datas?.content.length === 0) {
      this._table.sortSingle();
    }
    return this.datas?.totalElements;
  }

  constructor(
    private _confirmationService: ConfirmationService,
    private _form: FormTableFilter
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form = this._form.createForm();

    this._watchFilterGlobalValueChanges();

    this.isRegisterItem = this.onRegisterItem.observed;
    this.isSearchItem = this.onSearchItem.observed;
    this.isEditItem = this.onEditItem.observed;
    this.isDeleteItem = this.onDeleteItem.observed;
  }

  protected override fieldWithError(field: string): boolean {
    return this.form.get(field)?.errors !== null;
  }

  protected _watchFilterGlobalValueChanges(): void {
    const field = 'filterGlobal';
    this.form.controls[field].valueChanges
      .pipe(
        map((value: string) => (value ? value.trim() : value)),
        distinctUntilChanged(),
        debounceTime(400),
        filter(() => !this.fieldWithError(field)),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((value: string) => {
        this._table.filterGlobal(value, 'contains');
      });
  }

  public clear(): void {
    this.form.controls['filterGlobal'].reset();
    this._filter.value = null;
    this._table.clearFilterValues();
    this._table.sortSingle();
  }

  public find(eventParams: TableLazyLoadEvent): void {
    this.onFind.emit(eventParams);
  }

  public registerItem(): void {
    this.onRegisterItem.emit();
  }

  public searchItem(item: unknown): void {
    this.onSearchItem.emit(item);
  }

  public editItem(item: unknown): void {
    this.onEditItem.emit(item);
  }

  public deleteItem(item: { description: unknown }): void {
    this._confirmationService.confirm({
      key: 'remove',
      message: `Tem certeza que deseja excluir "${item.description}"?`,
      header: 'Exclusão',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'reject',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: () => {
        this.onDeleteItem.emit(item);
      },
    });
  }

  public selectItem(item: unknown): void {
    this.onSelectItem.emit(item);
  }
}
