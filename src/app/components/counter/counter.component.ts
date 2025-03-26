import { Component, computed, effect, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-counter',
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styles: ``
})
export class CounterComponent {

   //Passare dall'usare var classiche, ai signals
    counter1 = 0;
    
    decrement1(){
      this.counter1--;
    }
  
    increment1(){
      this.counter1++;
    }
  
    reset1(){
      this.counter1 =0;
    }
  
    //SIGNALS ----------------------------------------------
    /* dentro le classi non serve dichiarare variabile (var, const, let)
    *  si possono utilizzare però modificatori
    */ 
  
    /*computed viene aggiornato solo quando cambia il valore del signal principale
    (più potente di ...)
    */
  
    constructor(){
      effect(() => {
        console.log(this.counter());
        //aggiungere elemnto al localstorage
        localStorage.setItem("counter", JSON.stringify(this.counter()));
      });
  
      effect(() =>console.log('Is zero: ' + this.isZero()));
    }
  
    counter: WritableSignal<number> = signal(0);
    isZero: Signal<boolean> = computed(() => this.counter() === 0);
    isZeroColor = computed(() => this.isZero()? '' : 'text-orange-500');
  
    decrement(){
      this.counter.update(currentValue => currentValue -1);
    }
  
    increment(){
      this.counter.update(currentValue => currentValue +1);
    }
  
    reset(){
      this.counter.set(0);
    }
}
