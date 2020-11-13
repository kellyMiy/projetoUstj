import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-tarefa-listar',
  templateUrl: './tarefa-listar.component.html',
  styleUrls: ['./tarefa-listar.component.css'],
})
export class TarefaListarComponent implements OnInit, OnDestroy {


  tarefas: Tarefa[] = [];
  private tarefasSubscription: Subscription;

  constructor(public tarefaService: TarefaService) {

  }

  ngOnInit(): void {
    this.tarefaService.getTarefas();
    this.tarefasSubscription = this.tarefaService.getListaDeTarefasAtualizadaObservablericao().subscribe((tarefas: Tarefa[]) => {
      this.tarefas = tarefas;
    });
  }

  ngOnDestroy(): void {
    this.tarefasSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.tarefaService.excluirTarefa(id);
  }
}
