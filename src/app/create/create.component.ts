import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ComicService} from '../shared/comic.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ListTableItem} from '../list-table/list-table-datasource';
import {MatDatepicker} from '@angular/material';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  writtenBy = ['Alan', 'Stan', 'Garfield', 'Lee'];
  comicForm: FormGroup;
  urlRegExp = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  publisher = ['Dark Horse Comics.', 'DC Entertainment.', 'Mad Magazine', 'Image Comics.', 'Top Cow', 'Marvel.', 'Blank Slate Books.', 'Drawn & Quarterly.'];
  comic: ListTableItem;
  editForm = false;
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  constructor(private comicService: ComicService, private router: Router, private active: ActivatedRoute) {

  }


  ngOnInit() {
    const id = +this.active.snapshot.params['id'];
    this.comic = this.comicService.getComic(id);
    this.active.params.subscribe(
      (params: Params) => {
        this.comic = this.comicService.getComic(+params['id']);
      });

    this.comicForm = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(10)]),
      'coverImgUrl': new FormControl(null, [Validators.required, Validators.pattern(this.urlRegExp)]),
      'publicationDate': new FormControl(null, [Validators.required]),
      'genre': new FormControl(null),
      'excerpt': new FormControl(null),
      'writtenBy': new FormControl(null, [Validators.required]),
      'publisher': new FormControl(null)
    });

    if (this.comic) {
      this.comicForm.setValue({...this.comic});
      console.log(this.comicForm);
      this.editForm = true;

    } else {
      this.comicForm.controls['publisher'].setValue('Dark Horse Comics.', {onlySelf: true});
      this.editForm = false;

    }
  }


  onDelete(deleteComic: FormGroup) {
    this.comicService.deleteComic(deleteComic);
    this.router.navigate(['/list-table']);
  }


  onSubmit(newComic: FormGroup) {
    if (this.editForm === true) {
      console.log(newComic);
      console.log('edit');

      this.comicService.updateComic(newComic);
      this.editForm = false;
      this.router.navigate(['/list-table']);
    } else {
      console.log(newComic);
      console.log('New');

      this.comicService.newComic(newComic);
      this.router.navigate(['/list-table']);
    }
  }


}

