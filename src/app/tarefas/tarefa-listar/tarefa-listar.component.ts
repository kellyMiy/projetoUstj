import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-tarefa-listar',
  templateUrl: './tarefa-listar.component.html',
  styleUrls: ['./tarefa-listar.component.css'],
})
export class TarefaListarComponent implements OnInit, OnDestroy {


  tarefas: Tarefa[] = [];
  private tarefasSubscription: Subscription;

  constructor(private tarefaService: TarefaService, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.tarefaService.getTarefasDoUsuario(this.loginService.getUsuarioLogado().id);
    this.tarefasSubscription = this.tarefaService.getListaDeTarefasAtualizadaObservable().subscribe((tarefas: Tarefa[]) => {
      this.tarefas = tarefas;
    });
  }

  ngOnDestroy(): void {
    this.tarefasSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.tarefaService.excluirTarefa(id);
  }

  onEdit(tarefa: Tarefa): void {
    this.tarefaService.iniciarEdicaoTarefa(tarefa);
  }

  trocaCor(dataConclusao: Date) {
    let diferenca = new Date(dataConclusao).getTime() - Date.now();
    let difHoras = Math.round(diferenca / (1000 * 3600));
    let retorno = "";
    if (difHoras >= 98) {
      retorno = "verde";
    } else if (difHoras >= 0) {
      retorno = "amarelo";
    } else {
      retorno = "vermelho";
    }

    return retorno;
  }
}
