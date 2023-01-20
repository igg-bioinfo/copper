import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AdminSistService } from '../_services/admin-sist.service';
import { AccountLoginService } from '../_services/account-login.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: any;
  admin: any;
  token: any;
  error: string ='';
  user: User = {
    username: '',
    password: ''
  };

  constructor(private router: Router,
    private loginService: AccountLoginService,
    private adminService: AdminSistService) { }


  ngOnInit() {
    console.log('exit');
  }

  getAdminCredential() {
    console.log('adminCredential')
    if( this.user.username + '' === '' || this.user.password + '' === ''){
      console.log(this.user.username)
      this.error='error username o password obbligatori';
      console.log('error username o password');
      return;
    }
   
    this.adminService.getAdminCredential(this.user.username, this.user.password).subscribe( foundToken => {
      console.log('Chiamata getAdminCredential')
      if(foundToken) {
        this.loginService.getCredential(this.user.username, this.user.password).subscribe(foundPatient => {
          if(foundPatient) {
            const dati = JSON.parse(localStorage.getItem('patient') || '');
            console.log(dati);
            /****************************/
            this.router.navigate(['total-visit']);
            /****************************/
          } else {
            this.error='credenziali non trovate';
            console.log('error');
          }
        }, 
        error => {
          this.error = error && error.message ? error.message : 'error login';
        });
      }
    }, 
    error => {
      this.error = error && error.message ? error.message : 'error getAdminCredential';
    });
  }
}
