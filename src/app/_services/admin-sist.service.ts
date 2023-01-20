import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import {Md5} from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class AdminSistService {
 

  constructor(private http: HttpClient) { }


   getAdminCredential(username: string, password: string): Observable<boolean> {
    //chiamata http
    console.log('chiamata')
    const hash_pw = Md5.hashStr(password);
    return this.http.post<any>(environment.url+'subjectLogin', { identifier : username,
    password: hash_pw })
    .pipe( map( data => { 
      console.log(data)
      console.log(data + ' data admincredential')
      let found = false;
      if(data.token){
        found =true;
        localStorage.setItem('token', data.token);
        console.log('Token admin credential' + data.token );
        console.log('username getAdminCred'+ username)
      }
      return found }  )
    ); 
   }
   

}
