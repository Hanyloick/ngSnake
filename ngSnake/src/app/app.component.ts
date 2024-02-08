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
export class AppComponent {
  title = 'ngSnake';
 }
