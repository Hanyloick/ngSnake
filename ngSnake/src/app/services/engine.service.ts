import { EventEmitter } from '@angular/core';
import { FoodModel } from '../models/food/food';
import { Direction, SnakeModel, SnakeSegment } from '../models/snake/snake';
import { cloneDeep } from 'lodash';


export class GameEngine {
  initialSegments: SnakeSegment[] = [
    { x: 19, y: 34 },
    { x: 19, y: 35 },
    { x: 19, y: 36 },
  ];
  initialDirection: Direction = Direction.Up;
  snakeModel: SnakeModel;
  foodModel: FoodModel;
  score:number = 0;

  constructor() {
    const cloneSegments = cloneDeep(this.initialSegments);
    const cloneDirection = cloneDeep(this.initialDirection);
    this.snakeModel = new SnakeModel(
      cloneSegments,
      cloneDirection
    );
    this.foodModel = new FoodModel(this.snakeModel.getSegments());
    this.score = this.score;
  }

  getSnakeModel(): SnakeModel {
    return this.snakeModel;
  }

  getFoodModel(): FoodModel {
    return this.foodModel;
  }

  startGame(): void {
    this.updateGame();
  }

  restartGame() {
    const cloneSegments = cloneDeep(this.initialSegments);
    const cloneDirection = cloneDeep(this.initialDirection);
    this.score = 0;
    this.snakeModel.reset(cloneSegments, cloneDirection);
    console.log(this.foodModel.getFoodPosition().x +" " + this.foodModel.getFoodPosition().y + " in engine before gen food");
    this.foodModel.newFood(cloneSegments);
    console.log(this.foodModel.getFoodPosition().x +" " + this.foodModel.getFoodPosition().y + " in engine after gen food");
  }

  private updateGame(): void {
    this.snakeModel.move();

    if (this.checkSelfOrBoardCollisions()) {
      console.log('Game Over!');
      return;
    }

    if (this.foodCollision()) {
      this.snakeModel.grow();
      this.foodModel.newFood(this.snakeModel.getSegments());
      this.score++
    }

    setTimeout(() => {
      requestAnimationFrame(() => this.updateGame());
    }, 60);
  }

  gameOverEvent: EventEmitter<void> = new EventEmitter<void>();

  private checkSelfOrBoardCollisions(): boolean {
    const snakeHead = this.snakeModel.getHeadPosition();
    const snakeSegments = this.snakeModel.getSegments();

    for (let i = 1; i < snakeSegments.length; i++) {
      if (
        snakeSegments[i].x === snakeHead.x &&
        snakeSegments[i].y === snakeHead.y
      ) {
        this.gameOverEvent.emit();
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
      this.gameOverEvent.emit();
      return true;
    }

    return false;
  }

  private foodCollision(): boolean {
    const snakeHead = this.snakeModel.getHeadPosition();
    const foodPosition = this.foodModel.getFoodPosition();
    return snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y;
  }

  handleInput(newDirection: Direction): void {
    this.snakeModel.setDirection(newDirection);
  }
}
