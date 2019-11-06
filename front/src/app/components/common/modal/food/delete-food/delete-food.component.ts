import { Component, OnInit, Inject } from '@angular/core';
import { Food } from '../../../../../models/Food';
import { FoodService } from '../../../../../services/food.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete-food.component.html',
  styleUrls: ['./delete-food.component.css']
})
export class DeleteFoodComponent implements OnInit {

  food:Food = new Food();
  loading:boolean = false;

  constructor(
    private foodService: FoodService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DeleteFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.food = data
    }

  ngOnInit() {
  }

  delete() {
    this.foodService.delete(this.food.id).subscribe(resp => {
      this.toastr.info('Food deleted !');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while deleting food');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
