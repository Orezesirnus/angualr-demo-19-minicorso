import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconVariantComponent } from "../icon-variant/icon-variant.component";

@Component({
  selector: 'app-alert',
  imports: [NgClass, IconVariantComponent],
  templateUrl: './alert.component.html',
  styles: ``
})
export class AlertComponent {

  @Output() onAccept = new EventEmitter<string>();
  @Output() onDeny = new EventEmitter<string>();

  @Input() acceptLabel: string = "Accept";
  @Input() denyLabel: string = "Deny";

  @Input() alertStyle: AlertVariant;
  @Input() text: string = 'we use cookies for no reason.';
}

export type AlertVariant = 'info' | 'success' | 'error' | undefined;

/*
export enum AlertVariants{
  info = 'alert-info',
  success = 'alert-success',
  error = 'alert-error'
}
*/