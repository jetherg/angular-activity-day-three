import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {



  clients:any;
  groups:any;
  constructor(private _globalService:GlobalService) { }

  ngOnInit(): void {

    this._globalService.httpGetProfile();
    console.log('test');
    this._globalService.onHttpGetProfile.subscribe(
      (profile:any) => {
        console.log('test2',profile.tag.accounts);
        this.clients = profile.tag.accounts;
        this.groups = profile.tag.groups;
      }
    );

  }

}
