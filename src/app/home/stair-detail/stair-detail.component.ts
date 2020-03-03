import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-stair-detail',
  templateUrl: './stair-detail.component.html',
  styleUrls: ['./stair-detail.component.scss'],
})
export class StairDetailComponent implements OnInit {

  @Output() _activeStair = new EventEmitter<number>();

  _stair1 = true;
  _stair2 = false;
  _stair3 = false;
  _stair4 = false;
  _stair5 = false;

  constructor() { }

  ngOnInit() {
    const x = JSON.parse(localStorage.getItem('_activeStairNumber'));
    if (x === 1) {
      this._stair2 = true;
      this._stair1 = false;
      this._stair3 = false;
      this._stair4 = false;
      this._stair5 = false;

      return;
    }

    if (x === 2) {
      this._stair2 = false;
      this._stair1 = false;
      this._stair3 = true;
      this._stair4 = false;
      this._stair5 = false;

      return;
    }

    if (x === 3) {
      this._stair2 = false;
      this._stair1 = false;
      this._stair3 = false;
      this._stair4 = true;
      this._stair5 = false;

      return;
    }

    if (x === 4) {
      this._stair2 = false;
      this._stair1 = false;
      this._stair3 = false;
      this._stair4 = false;
      this._stair5 = true;

      return;
    }
  }

  onStairNumber(x: number) {
    this._activeStair.emit(x);
  }

}
