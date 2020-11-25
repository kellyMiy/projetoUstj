import { Injectable } from '@angular/core';

import { Tarefa } from './tarefa.model';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private httpClient: HttpClient) { }

  private listaTarefasAtualizada = new Subject<Tarefa[]>();
  private iniciaEdicao = new Subject<Tarefa>();

  private tarefas: Tarefa[] = [];

  getTarefas(): void {
    this.httpClient.get<{ mensagem: string, tarefas: any }>('http://localhost:3000/api/tarefas').pipe(map((dados) => {
      return dados.tarefas.map(tarefa => {
        return { id: tarefa._id, ...tarefa };
      });
    })).subscribe(
      (dados) => {
        this.tarefas = dados;
        this.listaTarefasAtualizada.next([...this.tarefas]);
      }
    );
  }

  adicionarTarefa(titulo: string, descricao: string, dataConclusao: Date): void {
    const tarefa: Tarefa = {
      id: null,
      titulo: titulo,
      descricao: descricao,
      dataConclusao: dataConclusao,
      dataCadastro: new Date()
    };
    console.log(tarefa);
    this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/tarefas',
      tarefa).subscribe((dados) => {
        console.log(dados.mensagem);
        tarefa.id = dados.id;
        this.tarefas.push(tarefa);
        this.listaTarefasAtualizada.next([...this.tarefas]);
      });
  }

  atualizarTarefa(id: string, titulo: string, descricao: string, dataCadastro: Date, dataConclusao: Date) {
    const tarefa: Tarefa = {id, titulo, descricao, dataCadastro, dataConclusao};
    this.httpClient.put(`http://localhost:3000/api/tarefas/${id}`, tarefa).subscribe(console.log);
    const copia = [...this.tarefas];
    const indice = copia.findIndex(tar => tar.id === tarefa.id);
    copia[indice] = tarefa;
    this.tarefas = copia;
    this.listaTarefasAtualizada.next([...this.tarefas]);
  }

  getListaDeTarefasAtualizadaObservable() {
    return this.listaTarefasAtualizada.asObservable();
  }

  getIniciaEdicaoObservable(){
    return this.iniciaEdicao.asObservable();
  }

  iniciarEdicaoTarefa(tarefa: Tarefa) {
    this.iniciaEdicao.next({ ...tarefa });
  }

  excluirTarefa(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/tarefas/${id}`).subscribe(() => {
      this.tarefas = this.tarefas.filter((tarefa) => {
        return tarefa.id != id
      });
      this.listaTarefasAtualizada.next([...this.tarefas]);
    })
  }
  
}
