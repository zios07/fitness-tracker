import { Component, OnInit, Inject } from '@angular/core';
import { Exercise } from '../../../../../models/Exercise';
import { ExercisePerformed } from '../../../../../models/ExercisePerformed';
import { ExerciseTrackerService } from '../../../../../services/exercise-tracker.service';
import { ExerciseService } from '../../../../../services/exercise.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-exercise-performed',
  templateUrl: './edit-exercise-performed.component.html',
  styleUrls: ['./edit-exercise-performed.component.css']
})
export class EditExercisePerformedComponent implements OnInit {

  exercisePerformed:ExercisePerformed = new ExercisePerformed();
  exercises: Exercise[] = [];
  loading:boolean = false;
  title:string = "";

  constructor(
    private exerciseTrackerService: ExerciseTrackerService,
    private exerciseService: ExerciseService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditExercisePerformedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.loadExercises();
      this.exercisePerformed = data.selectedExercisePerformed;
      this.title = data.title;
    }

  ngOnInit() {
  }

  save() {
    this.loading = true;
    this.exerciseTrackerService.save(this.exercisePerformed).delay(1000).subscribe(resp => {
      this.loading = false;
      this.toastr.info('Exercise added to tracking list');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while saving exercise');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  loadExercises() {
    this.exerciseService.getExercises().subscribe((exercises: Exercise[]) => {
      this.exercises = exercises;
    }, error => {
      this.toastr.error('Error while loading exercises');
    })
  }

  compareFn(item1, item2) {
    if(item1 && item2)
      return item1.id === item2.id;
  }

}
