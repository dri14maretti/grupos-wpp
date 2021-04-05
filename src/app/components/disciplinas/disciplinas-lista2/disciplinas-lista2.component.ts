import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DisciplinasLista2DataSource, DisciplinasLista2Item } from './disciplinas-lista2-datasource';

@Component({
  selector: 'app-disciplinas-lista2',
  templateUrl: './disciplinas-lista2.component.html',
  styleUrls: ['./disciplinas-lista2.component.css']
})
export class DisciplinasLista2Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DisciplinasLista2Item>;
  dataSource: DisciplinasLista2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new DisciplinasLista2DataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
