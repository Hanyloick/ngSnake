export interface Snake {
  segments: SnakeSegment[];
  direction: Direction;
}

export interface SnakeSegment {
  x: number;
  y: number;
}

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export class SnakeModel {
  private snake: Snake;
  private directionChangeCooldown: boolean = false;

  constructor(startingSegments: SnakeSegment[], startingDirection: Direction) {
    this.snake = {
      segments: startingSegments,
      direction: startingDirection,
    };
  }

  reset(startingSegments: SnakeSegment[], startingDirection: Direction) {
    this.snake.segments = startingSegments;
    this.snake.direction = startingDirection;
    this.snake.segments.forEach(segment => {
      console.log(segment.x + " " + segment.y + "in snake model");
    });
  }

  getSegments(): SnakeSegment[] {
    return this.snake.segments.slice();
  }

  move(): void {
    const head = { ...this.snake.segments[0] };

    switch (this.snake.direction) {
      case Direction.Up:
        if (head.y - 1 !== this.snake.segments[1].y) {
          head.y -= 1;
        }
        break;
      case Direction.Down:
        if (head.y + 1 !== this.snake.segments[1].y) {
          head.y += 1;
        }
        break;
      case Direction.Left:
        if (head.x - 1 !== this.snake.segments[1].x) {
          head.x -= 1;
        }
        break;
      case Direction.Right:
        if (head.x + 1 !== this.snake.segments[1].x) {
          head.x += 1;
        }
        break;
    }

    this.snake.segments.unshift(head);
    this.snake.segments.pop();
  }

  setDirection(newDirection: Direction): void {
    if (this.isOppositeDirection(newDirection) || this.directionChangeCooldown) {
        return;
    }

    this.snake.direction = newDirection;

    
    this.directionChangeCooldown = true;
    setTimeout(() => {
        this.directionChangeCooldown = false;
    }, 55);
}

  grow(): void {
    const tail = this.snake.segments[this.snake.segments.length - 1];
    this.snake.segments.push({ x: tail.x, y: tail.y });
  }

  getHeadPosition(): SnakeSegment {
    return { ...this.snake.segments[0] };
  }

  private isOppositeDirection(newDirection: Direction): boolean {
    const currentDirection = this.snake.direction;

    return (
      (currentDirection === Direction.Up && newDirection === Direction.Down) ||
      (currentDirection === Direction.Down && newDirection === Direction.Up) ||
      (currentDirection === Direction.Left &&
        newDirection === Direction.Right) ||
      (currentDirection === Direction.Right && newDirection === Direction.Left)
    );
  }
}
