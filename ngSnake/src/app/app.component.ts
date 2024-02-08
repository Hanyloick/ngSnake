import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { GameEngine } from './services/engine.service';
import { Direction, Snake, SnakeModel } from './models/snake/snake';
import { FoodModel } from './models/food/food';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ngSnake';
  gameOver = false;

  constructor(private gameEngine: GameEngine, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.gameEngine.gameOverEvent.subscribe(() => {
      this.onGameOver();
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let direction: Direction | null = null;
    switch (event.key) {
      case 't':
        this.gameEngine.startGame();
        break;
      case 'ArrowUp':
      case 'w':
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
  
  onGameOver(): void {
    this.gameOver = true;
  }

  onRestartGame(): void {
    window.location.reload();
    // this.gameOver = false;
    // this.gameEngine.restartGame();
    // this.cdr.detectChanges();
    // this.gameEngine.startGame();
    
  }

  get snake(): SnakeModel {
    return this.gameEngine.getSnakeModel();
  }

  get food(): FoodModel {
    return this.gameEngine.getFoodModel();
  }
}
