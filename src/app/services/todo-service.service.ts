import { Injectable, signal } from '@angular/core';
import { Todo } from '../components/control-flow/control-flow.component';
import { BehaviorSubject, from, of, tap } from 'rxjs';

//service globale - root: singleton
//istanziata una sola volta, disponibile ovunque
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todoItem: Todo | undefined;

  todos = signal<Todo[]>([
    {id: 1, title: "Todo 1", isCompleted: false},
    {id: 2, title: "Todo 2", isCompleted: false},
    {id: 3, title: "Todo 3", isCompleted: true},
    {id: 4, title: "Todo 4", isCompleted: false},
    {id: 5, title: "Todo 5", isCompleted: false},
  ]);

  //$ rappresenta elementi reattivi
  //of: prende un valore e lo rende/trasforma un observable
    //todos$ = of(this.todos());
  todos$ = new BehaviorSubject<Todo[]>(this.todos());
  
  // //async pipe
  // .pipe(tap((result) => {

  // }));

  //per i behavior subject
  todosObs = this.todos$.asObservable; //obs ti tipo Hot viene considerato Cold

  setItem(item: Todo): void {
    this._todoItem = item;
  }

  getItem(): Todo | undefined{
    return this._todoItem;
  }

  obsB(){}
  obsC(){}

  arrayNumber = this.generateArray(1000);       //generazione numeri random
  arrayNumbers$ = of(this.arrayNumber);         //restituisce stream 1 alla volta
  arrayNumbersFrom$ = from(this.arrayNumber);   //restituisce tutti i dati in una volta

  private generateArray(size: number): number[] {
    const set = new Set<number>();
    while (set.size < size) {
      set.add(Math.floor(Math.random() * 100000));
    }
    return Array.from(set);
  }


}
