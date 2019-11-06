import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Exercise} from '../../../../../models/Exercise';
import {ExerciseService} from '../../../../../services/exercise.service';
import 'rxjs/add/operator/delay';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {

  exercise: Exercise = new Exercise();
  loading: boolean = false;
  title: string = "";

  constructor(
    private exerciseService: ExerciseService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.exercise = data.selectedExercise;
    this.title = data.title;
  }

  ngOnInit() {
  }

  save() {
    this.loading = true;
    this.exerciseService.save(this.exercise).delay(1000).subscribe(resp => {
      this.loading = false;
      this.toastr.info('Exercise saved');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while saving exercise');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
