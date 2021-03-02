import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from './services/auth.service';


interface Usuario {
  user?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: string = '';
  usuario: Usuario ={user: '', password: ''};
  
  constructor( private router: Router, private auth: AuthService, private messageService: MessageService) {
    this.usuario.user = 'user-dev01';
  }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    
    if (form.invalid) { 
      // this.openSnackBar('Ingrese el usuario y contraseña', 'ERROR'); 
      return; 
    };

    this.loading = 'pi pi-spin pi-spinner';
    
    this.auth.login(this.usuario).subscribe(resp => {
        console.log("login resp", resp.nombreUsuario);
        
        this.router.navigateByUrl('/home');
      }, (err) => {
        // this.openSnackBar('Usuario y/o Contraseña invalida', 'ERROR');
        this.messageService.add({severity:'error', summary: 'ERROR', detail: 'Usuario y/o Contraseña inválida'});

        console.log("error de login", err);
        
        this.loading = '';
      }
    );
  }

}




