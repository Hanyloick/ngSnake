import { Component, Input } from '@angular/core';
import { Food, FoodModel } from '../../models/food/food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {
  @Input() food!: FoodModel;  
}
