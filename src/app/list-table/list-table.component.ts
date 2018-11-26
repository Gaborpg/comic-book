import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {ListTableDataSource} from './list-table-datasource';
import {ComicService} from '../shared/comic.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ListTableDataSource;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'coverImgUrl', 'publicationDate', 'genre', 'excerpt', 'writtenBy', 'publisher'];

  constructor(private comicService: ComicService) {
  }

  ngOnInit() {
    this.dataSource = new ListTableDataSource(this.paginator, this.sort, this.comicService);
  }


}
