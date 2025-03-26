import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TodoService } from '../../services/todo-service.service';
import { Router } from '@angular/router';
import { concatMapTo } from 'rxjs';

@Component({
  selector: 'app-control-flow',
  imports: [CommonModule],
  templateUrl: './control-flow.component.html',
  styles: ``
})
export default class ControlFlowComponent implements OnInit{

  //Gestione stato (flusso dati)--------------
  readonly todoService = inject(TodoService);
  private readonly _router = inject(Router);
  //------------------------------------------


  // todos = signal<Todo[]>([
  //   {id: 1, title: "Todo 1", isCompleted: false},
  //   {id: 2, title: "Todo 2", isCompleted: false},
  //   {id: 3, title: "Todo 3", isCompleted: true},
  //   {id: 4, title: "Todo 4", isCompleted: false},
  // ]);
  todos = this.todoService.todos;

  addTodo(input: HTMLInputElement){
    if(input.value){
      const newTodo: Todo = {
        id: Date.now(),           //restiuisce un numero univoco
        title: input.value,
        isCompleted: false
      }

      this.todos.update(currentTodos => [...currentTodos, newTodo]);
      input.value = '';
    }
  }

  removeTodo(todoToRemove: Todo){
    
    this.todos.update(currentTodos => currentTodos.filter(
        element => element.id !== todoToRemove.id
    ));
  }

  toggleTodo(todoToToggle: Todo){
    //da implementare
  }

  //Gestione stato
  ngOnInit(): void {

    const element = this.todoService.getItem();

    //il dato è già stato modicato (esiste su service)
    if(element){
      console.log('List Item edited: ', element);

      const todos = this.todos();
      todos.forEach(todo => {
        if(todo.id === element.id){
          todo.title = element.title;
        }
      });

      this.todos.update((allTodos) => todos);
    }
  }

  editTodo(todo: Todo){
    console.log('todo input: ', todo);

    this.todoService.setItem(todo);
    this._router.navigateByUrl('todo-edit');
  }

}

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}