import { Component, inject, input, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TodoService } from '../../../services/todo-service.service';
import { Router } from '@angular/router';
import { Todo } from '../../control-flow/control-flow.component';
import { catchError, filter, forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-reactive-control-flow',
  imports: [CommonModule],
  templateUrl: './reactive-control-flow.component.html',
  styles: ``
})
export default class ControlFlowComponent implements OnInit, OnDestroy{

  readonly todoService = inject(TodoService);
  private readonly _router = inject(Router);
  
  //terminare stream di dati (unsubscribe)
  private _sub: Subscription[] = [];          //tutti gli oggetti restituiti dalla subscribe (tiene traccia attraverso token)

  todos = signal<Todo[]> ([]);


  ngOnInit(): void {

    this._sub.push(
      this.todoService.todos$.subscribe((list) => {
        console.log('list todos$: ', list);
        this.todos.set(list);
      })
    );

    //esempio forkJoin
    // forkJoin([
    //   this.todoService.getItem(),
    //   this.todoService.obsB(),
    //   this.todoService.obsC()
    // ]).subscribe((result) => {
    //   const responseA = result[0];
    //   const responseB = result[1];
    //   const responseC = result[2];
    // });

    this.todoService.arrayNumbers$
    .subscribe(response => console.log('arrayNumbers: ', response))

    this.todoService.arrayNumbersFrom$
    .pipe(filter((num) => (num % 7 || num % 11) == 0))
    .subscribe(response => console.log('arrayNumbersFrom: ', response))

  }


  //unsubscribe
  ngOnDestroy(): void {
    this._sub.forEach(x => 
      x.unsubscribe()
    );
  }

  // async pipe: permettono di sottoscriverci al
  // flusso di observable e ne gestiscono il flusso di vita
  // si occupa di effettuare in autonomia subscribe, gestione cadenzata dei dati dello stream, unsubscribe 
  // svantaggio: disponibile solo nel template 
  // aggirabile tramite operatore tap: pipe(tap(() => result))
  // svantaggio: nel caso di mergeMap, con risultato misto di due chiamate,
  // async pipe restituisce il valore misto risposta

  addTodo(input: HTMLInputElement){
    if(input.value){
      const newTodo: Todo = {
        id: Date.now(),           //restiuisce un numero univoco
        title: input.value,
        isCompleted: false
      }

      this.todoService.todos.update(currentTodos => [...currentTodos, newTodo]);
      input.value = '';
    }
  }

  removeTodo(todoToRemove: Todo){
    
    this.todoService.todos.update(currentTodos =>
      currentTodos.filter( element => element.id !== todoToRemove.id )
    );
  }


  editTodo(todo: Todo){
    console.log('todo input: ', todo);

    this.todoService.setItem(todo);
    this._router.navigateByUrl('reactive-todo-edit');
  }


  //-------------------------------------------------------
  toggleTodo(todoToToggle: Todo) {
    this.todos.update((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoToToggle.id
          ? { ...todo, completed: !todo.isCompleted }
          : todo,
      )
    );
  }

}