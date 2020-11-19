//import { Component, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { Tarefa } from '../tarefa.model';
import { TarefaService } from '../tarefa.service';
@Component({
  selector: 'app-tarefa-inserir',
  templateUrl: './tarefa-inserir.component.html',
  styleUrls: ['./tarefa-inserir.component.css'],
})
export class TarefaInserirComponent {

  constructor(public tarefaService: TarefaService) {

  }


  //@Output() tarefaAdicionado = new EventEmitter<Tarefa>();
  //titulo: string;
  //descricao: string;
  //email: string;
  onAdicionarTarefa(form: NgForm) {
    if (form.invalid) return;
    this.tarefaService.adicionarTarefa(
      form.value.titulo,
      form.value.descricao,
      form.value.dataConclusao
    );

    form.resetForm();
  }
}
