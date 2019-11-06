import {Component, OnInit, Inject} from '@angular/core';
import {Exercise} from '../../../../../models/Exercise';
import {ExerciseService} from '../../../../../services/exercise.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.css']
})
export class DeleteExerciseComponent implements OnInit {

  exercise: Exercise = new Exercise();
  loading: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DeleteExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.exercise = data
  }

  ngOnInit() {
  }

  delete() {
    this.exerciseService.delete(this.exercise.id).subscribe(resp => {
      this.toastr.info('Exercise deleted !');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while deleting exercise');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
