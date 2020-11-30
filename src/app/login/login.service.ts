import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

const KEY = 'usuarioLogado';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    cadastrarUsuario(email: string, senha: string): void {
        const usuario: Login = {
            id: null,
            email: email,
            senha: senha
        };
        this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/usuarios',
            usuario).subscribe((dados) => {
                console.log(dados.mensagem)
                window.localStorage.setItem(KEY, JSON.stringify({ id: dados.id, email: usuario.email}));
                this.router.navigate(['dashboard']);
            });
    }

    efetuarLogin(email: string, senha: string): void {
        this.httpClient.post<any>('http://localhost:3000/api/login',
            { email, senha }).pipe(map((usuario) => {
                  return { id: usuario._id, email }
              })).subscribe((usuario) => {
                window.localStorage.setItem(KEY, JSON.stringify(usuario));
                this.router.navigate(['dashboard']);
            }, (error) => {
                alert('Credenciais inválidas!');
            });
    }

    usuarioEstaLogado() {
        return this.getUsuarioLogado() !== null;
    }

    getUsuarioLogado(): { id: string, email: string} {
        return JSON.parse(window.localStorage.getItem(KEY));
    }

    removeUsuarioLogado() {
        window.localStorage.removeItem(KEY);
    }
}