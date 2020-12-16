import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Login } from '../pages/home/login-model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

onHttpLogin = new Subject();
isLogged = new Subject();
onHttpGetProfile = new Subject()
onHttpUpdateProfile = new Subject()
  constructor(private http:HttpClient) { }

  httpLogin(logins:Login){
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';
    this.http.post(url,logins).subscribe(
      (response: any) =>{
        console.log('success response', response);
        if (response.status == 'success'){
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
        }
      },
      (error) =>{
        console.log('error response', error);
      }
    );
  }

  httpGetProfile():void{
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url,{
      headers:new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response: any) =>{
        console.log('from get profile api', response.data);
        // this.onHttpGetProfile.next(response);
        if (response.status == 'success'){
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) =>{
        console.log('error profile api', error);
      }
    );
  }

  httpUpdateProfile(data:any):void{
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url,data,{
      headers:new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response: any) =>{
        console.log('from get profile update api', response.data);
        if (response.status == 'success'){
          this.onHttpUpdateProfile.next(response.data);
        }
      },
      (error) =>{
        console.log('error profile update api', error);
      }
    );
  }

  setToken(token:string):void {
    localStorage.setItem('token',token);
  }

  getToken():string {
    const token = localStorage.getItem('token');
    return token;
  }

  checkLogStatus():void{
    const token = localStorage.getItem('token');

    if (token){
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }

  }

  deleteToken():void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }
}
