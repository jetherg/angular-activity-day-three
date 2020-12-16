import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Login } from './login-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: boolean;
  logins : Login = {
    username:'',
    password:''
  };

  constructor(private service:GlobalService,private route:Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.service.isLogged.subscribe(
      (logged:boolean) => {
        this.isLogged =logged;
        if (this.isLogged){
          this.route.navigate(['/my-profile']);
        }
      }
    );

    this.service.checkLogStatus();

  }


  onLogin():void {
    this.service.httpLogin(this.logins);
    this.service.onHttpLogin.subscribe(
      (response: any) => {
        const token = response.token;
        this.service.setToken(token);
        console.log('token value', this.service.getToken());

    this.route.navigate(['/my-profile']);
        // this.service.checkLogStatus();
      }
    );

  }

  onLogout():void {
    this.service.deleteToken();
  }
}
