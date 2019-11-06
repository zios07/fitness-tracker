import { Component, OnInit, Inject } from '@angular/core';
import { FoodEaten } from '../../../../../models/FoodEaten';
import { FoodTrackerService } from '../../../../../services/food-tracker.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteFoodComponent } from '../../food/delete-food/delete-food.component';

@Component({
  selector: 'app-delete-food-eaten',
  templateUrl: './delete-food-eaten.component.html',
  styleUrls: ['./delete-food-eaten.component.css']
})
export class DeleteFoodEatenComponent implements OnInit {

  food:FoodEaten = new FoodEaten();
  loading:boolean = false;

  constructor(
    private foodEatenService: FoodTrackerService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DeleteFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.food = data
    }

  ngOnInit() {
  }

  delete() {
    this.foodEatenService.delete(this.food.id).subscribe(resp => {
      this.toastr.info('Food untracked !');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while untracking food');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
