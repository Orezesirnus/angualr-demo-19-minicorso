import { Component, computed, effect, inject, OnInit, Signal, signal, WritableSignal } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { count, elementAt } from "rxjs";
import { PhoneComponent } from "./components/phone/phone.component";
import { TimelineComponent, TimelineItem } from "./components/timeline/timeline.component";
import { AlertComponent } from "./components/alert/alert.component";
import ControlFlowComponent from "./components/control-flow/control-flow.component";
import { TodoService } from "./services/todo-service.service";

@Component({
  selector: "app-root",
  imports: [
    CommonModule,
    RouterOutlet,
],
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements OnInit{
  title = "angular-demo-19";

  imageUrl = "https://img.daisyui.com/images/stock/453966.webp";
  alt = 'wallpaper';

  timelineItems: TimelineItem[] = [
    {start: '2010', end: 'Mario'},
    {start: '2015', end: 'Luigi'},
    {start: '2020', end: 'Roberto'}
  ]

  onAcceptHandler(){
    window.alert('Thanks for accepting!');
  }

  onDenyHandler(event: any){
    window.alert(event);
  }

  //Gestione stato
  private readonly _router = inject(Router); //injection permette di tirare fuori le dipendenze

  ngOnInit(): void {
      this._router.navigateByUrl('reactive-todo-list');
      //this._router.navigate(['todo-list']);

  }
}
