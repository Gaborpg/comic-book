import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {ComicService} from '../shared/comic.service';

// TODO: Replace this with your own data model type
export interface ListTableItem {
  id: number;
  name: string;
  coverImgUrl: string;
  publicationDate: any;
  genre: string;
  excerpt: string;
  writtenBy: string;
  publisher: string;
}

// TODO: replace this with real data from your application

/**
 * Data source for the ListTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListTableDataSource extends DataSource<ListTableItem> {
  data: ListTableItem[] = this.comicService.EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort, readonly comicService: ComicService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'coverImgUrl':
          return compare(a.coverImgUrl, b.coverImgUrl, isAsc);
        case 'publicationDate':
          return compare(+a.publicationDate, +b.publicationDate, isAsc);
        case 'genre':
          return compare(a.genre, b.genre, isAsc);
        case 'excerpt':
          return compare(a.excerpt, b.excerpt, isAsc);
        case 'writtenBy':
          return compare(a.writtenBy, b.writtenBy, isAsc);
        case 'publisher':
          return compare(a.publisher, b.publisher, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
