import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo-service.service';
import { Router } from '@angular/router';
import { Todo } from '../control-flow/control-flow.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-todo',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-todo.component.html',
  styles: ``
})
export default class EditTodoComponent implements OnInit{

  constructor(){}

  readonly todoService = inject(TodoService);
  private readonly _router = inject(Router);

  item: Todo | undefined = this.todoService.getItem();
  description: string = this.item?.title ? this.item?.title : '';


  ngOnInit(): void {
      console.log('Item (in edit): ', this.item);
  }

  apply(): void{
    
    //this.item?.title = this.description;
    console.log(this.description);

    if(this.item){
      this.item.title = this.description;

      // this.todoService.setItem(
      //   {
      //     ...this.item,
      //     title: this.description
      //   }
      // );
    }
    this._router.navigateByUrl('todo-list');
  }

//tutte le modifiche allo stesso riferimento di memoria
// - si influenzano a vicenda / apportano modifiche a tutti gli elementi -
}
