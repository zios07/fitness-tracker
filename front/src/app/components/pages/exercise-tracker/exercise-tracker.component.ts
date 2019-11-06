import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {MatDialog} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ExercisePerformed } from '../../../models/ExercisePerformed';
import { EditExercisePerformedComponent } from '../../common/modal/exercise-performed/edit-exercise-performed/edit-exercise-performed.component';
import { DeleteExercisePerformedComponent } from '../../common/modal/exercise-performed/delete-exercise-performed/delete-exercise-performed.component';
import { ExerciseTrackerService } from '../../../services/exercise-tracker.service';

@Component({
  selector: 'app-exercise-tracker',
  templateUrl: './exercise-tracker.component.html',
  styleUrls: ['./exercise-tracker.component.css']
})
export class ExerciseTrackerComponent implements OnInit {

  
  exercises: ExercisePerformed[] = [];
  columns = [
    { columnDef: 'exerciseName',  header: 'Exercise',     cell: (row: ExercisePerformed) => `${row.exercise.code}` },
    { columnDef: 'date',  header: 'Date',     cell: (row: ExercisePerformed) => this.transformDate(row.date)  },
    { columnDef: 'time',  header: 'Time',     cell: (row: ExercisePerformed) => `${row.time}`  },
    { columnDef: 'category',  header: 'Category',     cell: (row: ExercisePerformed) => `${row.exercise.category}`  },
    { columnDef: 'description',  header: 'Description',     cell: (row: ExercisePerformed) => `${row.exercise.description}`  },
    { columnDef: 'caloriesBurned',  header: 'Calories Burned',     cell: (row: ExercisePerformed) => `${row.caloriesBurned}`  },
  ];
  
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<ExercisePerformed>;
  loading:boolean = true;
  hasAdminAuthority: boolean = false;
  filterDate: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private datePipe: DatePipe,
              private exerciseTrackerService: ExerciseTrackerService,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) {
          this.router.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
              this.isAdmin();
              this.initColumns();
            }
        });
    }

  ngOnInit() {
    this.getExercises();
  }

  isAdmin() {
    this.hasAdminAuthority = this.authService.isAdmin();
  }

  initColumns() {
    this.columns.forEach(element => {
      this.displayedColumns.push(element.columnDef); 
    });
    this.displayedColumns.push('actions');
  }

  refreshExercises() {
    let formattedDate = this.datePipe.transform(this.filterDate, 'dd-MM-yyyy');
    this.exerciseTrackerService.getByDate(formattedDate).subscribe((resp: ExercisePerformed[]) => {
      this.exercises = resp;
      this.dataSource = new MatTableDataSource<ExercisePerformed>(this.exercises);
    }, error => {
      this.toastr.error('Error while filtering by date');
    })
  }

  getExercises() {
    this.loading = true;
    this.exerciseTrackerService.getExercises().delay(1000).subscribe((resp: ExercisePerformed[]) => {
      this.loading = false;
      this.exercises = resp;
      this.dataSource = new MatTableDataSource<ExercisePerformed>(this.exercises);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.loading = false;
      this.toastr.error('Error while loading exercises');
    })
  }
  openEditDialog(selectedExercisePerformed, title): void {
    let modalData = {
      'selectedExercisePerformed': selectedExercisePerformed? selectedExercisePerformed : new ExercisePerformed(),
      'title': title
    }
    let dialogRef = this.dialog.open(EditExercisePerformedComponent, {
      width: '700px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }

  openDeleteDialog(selectedExercisePerformed): void {
    let dialogRef = this.dialog.open(DeleteExercisePerformedComponent, {
      width: '300px',
      data: selectedExercisePerformed
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'HH:mm dd-MM-yyyy');
  }

  calculateResult(servingQty, property) {
    return servingQty * property;
  }


}
