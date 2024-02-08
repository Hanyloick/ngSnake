import { Component, HostListener, OnInit } from '@angular/core';
import { GameEngine } from './services/engine.service';
import { Direction, SnakeModel } from './models/snake/snake';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ngSnake';
  snake = this.gameEngine.snakeModel;
  food = this.gameEngine.foodModel;
  constructor(private gameEngine: GameEngine) {}

  ngOnInit(): void {
     this.gameEngine.startGame();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let direction: Direction | null = null;
    switch (event.key) {
      case 'ArrowUp':
      case'w':
        direction = Direction.Up;
        break;
      case 'ArrowDown':
      case 's':
        direction = Direction.Down;
        break;
      case 'ArrowLeft':
      case 'a':
        direction = Direction.Left;
        break;
      case 'ArrowRight':
      case 'd':
        direction = Direction.Right;
        break;
    }

    if (direction !== null) {
      this.gameEngine.handleInput(direction);
    }
  }
}
