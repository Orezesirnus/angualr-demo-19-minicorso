import { Component, Input } from '@angular/core';
import { AlertVariant } from '../alert/alert.component';

@Component({
  selector: 'app-icon-variant',
  imports: [],
  templateUrl: './icon-variant.component.html',
  styles: ``
})
export class IconVariantComponent {

  @Input() variant: AlertVariant;
}
