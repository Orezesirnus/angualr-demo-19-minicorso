import { NgClass } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  imports: [NgClass],
  templateUrl: './timeline.component.html',
  styles: ``
})
export class TimelineComponent {

  @Input() timelineItems: TimelineItem[] = [];
  @Input({transform: booleanAttribute}) vertical: boolean = false;

}

export interface TimelineItem{
  start: string;
  end: string;
}
