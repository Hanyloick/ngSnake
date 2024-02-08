import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FoodModel } from 'src/app/models/food/food';
import { Direction, SnakeModel } from 'src/app/models/snake/snake';
import { GameEngine } from 'src/app/services/engine.service';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit {
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
