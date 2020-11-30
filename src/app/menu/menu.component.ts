import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  emailUsuario: string;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.emailUsuario = this.loginService.getUsuarioLogado().email;
  }

  onSair(): void {
    this.loginService.removeUsuarioLogado();
    window.location.reload();
  }
}
