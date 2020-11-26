import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  textoBotao1: string;
  textoBotao2: string;
  cadastrarUsuario: boolean = true;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.atualizarFormulario();
  }

  onSubmit(form: NgForm): void{

    if (form.invalid) return;

    if (this.cadastrarUsuario) {
      if (form.value.senha !== form.value.confirmarSenha) {
        alert('Confirmação de senha inválida.');
        return;
      }

      this.loginService.cadastrarUsuario(form.value.email, form.value.senha);
      this.atualizarFormulario();
    } else {
      this.loginService.efetuarLogin(form.value.email, form.value.senha);
    }
  }

  atualizarFormulario() {
    this.cadastrarUsuario = !this.cadastrarUsuario;
    if (!this.cadastrarUsuario) {
      this.textoBotao1 = "Entrar";
      this.textoBotao2 = "Novo usuário";
    } else {
      this.textoBotao1 = "Cadastrar";
      this.textoBotao2 = "Voltar para o login";
    }
  }
}
