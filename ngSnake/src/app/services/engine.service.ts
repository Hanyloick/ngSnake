import { FoodModel } from '../models/food/food';
import { Direction, SnakeModel, SnakeSegment } from '../models/snake/snake';

export class GameEngine {
  initialSegments: SnakeSegment[] = [
    { x: 19, y: 34 },
    { x: 19, y: 35 },
    { x: 19, y: 36 },
  ];
  initialDirection: Direction = Direction.Up;
  snakeModel: SnakeModel;
  foodModel: FoodModel;

  constructor() {
    this.snakeModel = new SnakeModel(
      this.initialSegments,
      this.initialDirection
    );
    this.foodModel = new FoodModel(this.snakeModel.getSegments());
  }

  startGame(): void {
    this.updateGame();
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
    }

    setTimeout(() => {
      requestAnimationFrame(() => this.updateGame());
    }, 50);
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

  handleInput(newDirection: Direction): void {
    this.snakeModel.setDirection(newDirection);
  }
}
