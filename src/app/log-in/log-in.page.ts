import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  
  loginError = false;

  formLogin = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" )]],
    password: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router, private loadingLogin: LoadingController) { }

  ngOnInit() {
  }

  login(){
    if(this.formLogin.valid){

      this.LoadingSession();

      const { email, password} = this.formLogin.value
      // Verificamos las credenciales
      this.authService.loginUser(email! , password!)
      .then((userCredencial:any) => {
        console.log(userCredencial);
        if(window.localStorage){
          localStorage.setItem('token', userCredencial.user._delegate.accessToken)
        }
        this.loadingLogin.dismiss();
        this.loginError = false;
        this.formLogin.reset();
        this.route.navigate(['./home']);
      })
      .catch(error => {
        this.loadingLogin.dismiss();
        this.formLogin.reset();
        this.formLogin.clearValidators();
        this.loginError = true;
      })
      
    }
  }

  async LoadingSession(){
    const loading = await this.loadingLogin.create({
      message: 'Iniciando sesión',
      spinner: 'circles',
      mode: "ios"
    });

    return await loading.present();
  }

  saveToken(token:string){

  }
  get email(){
    return this.formLogin.get('email')
  }
  
  get password(){
    return this.formLogin.get('password')
  }
}
