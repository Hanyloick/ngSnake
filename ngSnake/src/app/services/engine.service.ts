import { EventEmitter } from '@angular/core';
import { FoodModel } from '../models/food/food';
import { Direction, SnakeModel, SnakeSegment } from '../models/snake/snake';
import { cloneDeep } from 'lodash';

export class GameEngine {
  private initialSegments: SnakeSegment[] = [
    { x: 19, y: 34 },
    { x: 19, y: 35 },
    { x: 19, y: 36 },
  ];
  private initialDirection: Direction = Direction.Up;
  private snakeModel: SnakeModel;
  private foodModel: FoodModel;
  private score: number = 0;
  gameOverEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.snakeModel = new SnakeModel(
      this.getCloneSegments(),
      this.getCloneDirection()
    );
    this.foodModel = new FoodModel(this.snakeModel.getSegments());
    this.score = this.score;
  }

  startGame(): void {
    this.updateGame();
  }

  private updateGame(): void {
    this.snakeModel.move();

    if (this.checkSelfOrBoardCollisions()) {
      this.gameOverEvent.emit();
      console.log('Game Over!');
      return;
    }

    if (this.foodCollision()) {
      this.snakeModel.grow();
      this.foodModel.newFood(this.snakeModel.getSegments());
      this.score++;
    }

    setTimeout(() => {
      requestAnimationFrame(() => this.updateGame());
    }, 60);
  }

  private checkSelfOrBoardCollisions(): boolean {
    const snakeHead = this.snakeModel.getHeadPosition();
    const snakeSegments = this.snakeModel.getSegments();

    for (let i = 1; i < snakeSegments.length; i++) {
      if (
        snakeSegments[i].x === snakeHead.x &&
        snakeSegments[i].y === snakeHead.y
      ) {
        return true;
      }
    }

    const BOARD_HEIGHT = 39;
    const BOARD_WIDTH = 39;
    if (
      snakeHead.x < 0 ||
      snakeHead.x > BOARD_WIDTH ||
      snakeHead.y < 0 ||
      snakeHead.y > BOARD_HEIGHT
    ) {
      return true;
    }

    return false;
  }

  private foodCollision(): boolean {
    const snakeHead = this.snakeModel.getHeadPosition();
    const foodPosition = this.foodModel.getFoodPosition();
    return snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y;
  }

  restartGame() {
    this.score = 0;
    this.snakeModel = new SnakeModel(
      this.getCloneSegments(),
      this.getCloneDirection()
    );
  }

  handleInput(newDirection: Direction): void {
    this.snakeModel.setDirection(newDirection);
  }

  getSnakeModel(): SnakeModel {
    return cloneDeep(this.snakeModel);
  }

  getFoodModel(): FoodModel {
    return cloneDeep(this.foodModel);
  }

  getScore(): Number {
    const scoreCopy = this.score;
    return scoreCopy;
  }

  getCloneSegments(): SnakeSegment[] {
    return cloneDeep(this.initialSegments);
  }

  getCloneDirection(): Direction {
    return cloneDeep(this.initialDirection);
  }
}
