import { Component, OnInit, Inject } from '@angular/core';
import { ExerciseTrackerService } from '../../../../../services/exercise-tracker.service';
import { ExercisePerformed } from '../../../../../models/ExercisePerformed';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteExerciseComponent } from '../../exercise/delete-exercise/delete-exercise.component';

@Component({
  selector: 'app-delete-exercise-performed',
  templateUrl: './delete-exercise-performed.component.html',
  styleUrls: ['./delete-exercise-performed.component.css']
})
export class DeleteExercisePerformedComponent implements OnInit {

  exercise:ExercisePerformed = new ExercisePerformed();
  loading:boolean = false;

  constructor(
    private exerciseTrackerService: ExerciseTrackerService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DeleteExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.exercise = data
    }

  ngOnInit() {
  }

  delete() {
    this.exerciseTrackerService.delete(this.exercise.id).subscribe(resp => {
      this.toastr.info('Exercise untracked !');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while untracking exercise');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
