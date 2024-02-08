import { GameEngine } from "src/app/services/engine.service";
import { SnakeSegment } from "../snake/snake";

export interface Food {
  x: number;
  y: number;
}

export class FoodModel {
  private food: Food;

  constructor(snakeSegments:SnakeSegment[]) {
    this.food = this.generateFood(snakeSegments);
  }

  generateFood(snakeSegments:SnakeSegment[]): Food {
    let foodPosition: Food|undefined;

    do {
      const x = Math.floor(Math.random() * 39); 
      const y = Math.floor(Math.random() * 39);

      const overlapsWithSnake = snakeSegments.some(segment => segment.x === x && segment.y === y);

      if (!overlapsWithSnake) {
        foodPosition = { x, y };
      }
    } while (!foodPosition);

    return foodPosition;
  }

  getFoodPosition(): Food {
    return this.food;
  }

  newFood(snakeSegments:SnakeSegment[]): void {
    this.food = this.generateFood(snakeSegments);
  }
}
