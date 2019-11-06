import { Component, OnInit, Inject } from '@angular/core';
import { FoodTrackerService } from '../../../../../services/food-tracker.service';
import { FoodEaten } from '../../../../../models/FoodEaten';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { FoodService } from '../../../../../services/food.service';
import { Food } from '../../../../../models/Food';

@Component({
  selector: 'app-edit-food-eaten',
  templateUrl: './edit-food-eaten.component.html',
  styleUrls: ['./edit-food-eaten.component.css']
})
export class EditFoodEatenComponent implements OnInit {

  foodEaten:FoodEaten = new FoodEaten();
  foods: Food[] = [];
  loading:boolean = false;
  title:string = "";

  constructor(
    private foodEatenService: FoodTrackerService,
    private foodService: FoodService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditFoodEatenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.loadFoods();
      this.foodEaten = data.selectedFoodEaten;
      this.title = data.title;
    }

  ngOnInit() {
  }

  save() {
    this.loading = true;
    this.foodEatenService.save(this.foodEaten).delay(1000).subscribe(resp => {
      this.loading = false;
      this.toastr.info('Food added to tracking list');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while saving food');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  loadFoods() {
    this.foodService.getFoods().subscribe((foods: Food[]) => {
      this.foods = foods;
    }, error => {
      this.toastr.error('Error while loading foods');
    })
  }

  compareFn(item1, item2) {
    if(item1 && item2)
      return item1.id === item2.id;
  }

}
