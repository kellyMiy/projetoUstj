import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';
@Component({
  selector: 'app-tarefa-inserir',
  templateUrl: './tarefa-inserir.component.html',
  styleUrls: ['./tarefa-inserir.component.css'],
})
export class TarefaInserirComponent implements OnDestroy {

  private iniciaEdicaoSubscription: Subscription;
  public tarefaEditando: Tarefa;
  public expandir: boolean = false;

  constructor(private tarefaService: TarefaService, private loginService: LoginService) {
    this.iniciaEdicaoSubscription = tarefaService.getIniciaEdicaoObservable().subscribe(tarefa => {
      this.expandir = true;
      this.tarefaEditando = tarefa;
      window.scrollTo(0, 0);
    });
  }

  onSalvarTarefa(form: NgForm) {
    if (form.invalid) return;

    if (this.tarefaEditando) {
      this.tarefaService.atualizarTarefa(
        this.tarefaEditando.id,
        form.value.titulo,
        form.value.descricao,
        this.tarefaEditando.dataCadastro,
        form.value.dataConclusao,
        this.loginService.getUsuarioLogado().id
      );
    }else {
      this.tarefaService.adicionarTarefa(
        form.value.titulo,
        form.value.descricao,
        form.value.dataConclusao,
        this.loginService.getUsuarioLogado().id
      );
    }

    form.resetForm();
    this.tarefaEditando = null;
  }

  ngOnDestroy(): void {
    this.iniciaEdicaoSubscription.unsubscribe();
  }
}
