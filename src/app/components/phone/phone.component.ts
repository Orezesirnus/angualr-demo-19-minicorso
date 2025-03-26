import { booleanAttribute, Component, Input} from '@angular/core';

@Component({
  selector: 'app-phone',
  imports: [],
  templateUrl: './phone.component.html',
  styles: ``
})
export class PhoneComponent {

  @Input({required: true}) src: string = '';
  @Input({transform: (value: string) => value.toUpperCase()}) alt: string = '';

  //Esercizio 1: Aggiungere un'input che fa vedere un modo condizionale
  // la scritta dell'input ALT al centro dello schermo

  @Input({transform: booleanAttribute}) show: boolean = false;

  //Esercizio 2: Ridurre le dimensioni del wallpaper 
  //il trasform con il pipe forza l'input con sole queste 3 opzioni
  @Input({transform: (value: "sm" | "md" | "xl") => {
    switch (value) {
      case "sm":
        return 50;
      case "md":
        return 75;
      case "xl":
        return 100;
      default: 
        return 100;
    }
  }}) size: number = 100;


}
