import { Component, EventEmitter, Output } from '@angular/core';
import { GameEngine } from 'src/app/services/engine.service';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.css']
})
export class RestartComponent {
  @Output() restart: EventEmitter<void> = new EventEmitter<void>();

  restartGame(): void {
    this.restart.emit();
  }

}
