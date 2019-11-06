import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Food } from '../../../../../models/Food';
import { FoodService } from '../../../../../services/food.service';
import 'rxjs/add/operator/delay';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {

  food:Food = new Food();
  loading:boolean = false;
  title:string = "";

  constructor(
    private foodService: FoodService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.food = data.selectedFood;
      this.title = data.title;
    }

  ngOnInit() {
  }

  save() {
    this.loading = true;
    this.foodService.save(this.food).delay(1000).subscribe(resp => {
      this.loading = false;
      this.toastr.info('Food saved');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while saving food');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
