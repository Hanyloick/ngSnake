import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FoodModel } from 'src/app/models/food/food';
import { Direction, SnakeModel } from 'src/app/models/snake/snake';
import { GameEngine } from 'src/app/services/engine.service';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css'],
})
export class SnakeGameComponent implements OnInit {
  gameOver = false;
  startGame = false;
  isPaused = false;

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
        if (!this.startGame) {
          this.gameEngine.startGame();
          this.startGame = true;
        }
        break;
      case 'r':
        if (this.gameOver) {
          this.gameOver = false;
          this.gameEngine.restartGame();
          this.startGame = false;
        }
        break;
      case ' ':
        if(!this.isPaused) {
          this.gameEngine.pauseGame();
          this.isPaused = !this.isPaused;
        } else {
          this.gameEngine.startGame();
          this.isPaused = !this.isPaused;
        }
        break;
      case 'ArrowUp':
      case 'w':
        if (this.isMovable()) {
          direction = Direction.Up;
        }
        break;
      case 'ArrowDown':
      case 's':
        if (this.isMovable()) {
          direction = Direction.Down;
        }
        break;
      case 'ArrowLeft':
      case 'a':
        if (this.isMovable()) {
          direction = Direction.Left;
        }
        break;
      case 'ArrowRight':
      case 'd':
        if (this.isMovable()) {
          direction = Direction.Right;
        }
        break;
    }

    if (direction !== null) {
      this.gameEngine.handleInput(direction);
    }
  }

  isMovable(): boolean {
    return this.startGame && !this.isPaused;
  }

  onGameOver(): void {
    this.gameOver = true;
  }

  get snake(): SnakeModel {
    return this.gameEngine.getSnakeModel();
  }

  get food(): FoodModel {
    return this.gameEngine.getFoodModel();
  }

  get score(): Number {
    return this.gameEngine.getScore();
  }
}
