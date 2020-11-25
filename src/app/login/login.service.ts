import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login.model';
import { Router } from '@angular/router';

const KEY = 'usuarioLogado';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient, private router: Router) { }

    cadastrarUsuario(email: string, senha: string): void {
        alert('Chamar serviço de cadastro!!');
    }

    efetuarLogin(email: string, senha: string): void {
        this.httpClient.post<{ email: string, senha: string }>('http://localhost:3000/api/login',
            { email, senha }).subscribe((dados) => {
                window.localStorage.setItem(KEY, JSON.stringify(dados));
                this.router.navigate(['dashboard']);
            }, (error) => {
                alert('Credenciais inválidas!');
            });
    }

    usuarioEstaLogado() {
        return this.getUsuarioLogado() !== null;
    }

    getUsuarioLogado(): Login {
        return JSON.parse(window.localStorage.getItem(KEY));
    }

    removeUsuarioLogado() {
        window.localStorage.removeItem(KEY);
    }
}