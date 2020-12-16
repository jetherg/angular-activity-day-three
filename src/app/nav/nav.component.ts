import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged: boolean;


  constructor(private _globalService:GlobalService) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this._globalService.isLogged.subscribe(
      (logged:boolean) => {
        this.isLogged =logged;
      }
    );

    this._globalService.checkLogStatus();
  }

}
