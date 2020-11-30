import { Component } from '@angular/core';
import { Tarefa } from './tarefas/tarefa.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tarefas: Tarefa[] = [];
  onTarefaAdicionado(tarefa) {
    this.tarefas = [...this.tarefas, tarefa];
  }
}
