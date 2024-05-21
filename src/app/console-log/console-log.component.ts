import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-console-log',
  templateUrl: './console-log.component.html',
  styleUrl: './console-log.component.css',
})
export class ConsoleLogComponent {
  @Input() messages: string[] = [];
  @Output() clearEvent = new EventEmitter<void>();

  clearMessagesAndMarkers(): void {
    this.clearEvent.emit();
  }
}
