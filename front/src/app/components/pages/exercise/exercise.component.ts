import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import {ExerciseService} from '../../../services/exercise.service';
import {Exercise} from '../../../models/Exercise';
import 'rxjs/add/operator/delay';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EditExerciseComponent} from '../../common/modal/exercise/edit-exercise/edit-exercise.component';
import {ToastrService} from 'ngx-toastr';
import {DeleteExerciseComponent} from '../../common/modal/exercise/delete-exercise/delete-exercise.component';
import {AuthenticationService} from '../../../services/authentication.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercises: Exercise[] = [];
  columns = [
    { columnDef: 'id',  header: 'ID',     cell: (row: Exercise) => `${row.id}` },
    { columnDef: 'code',  header: 'Code',     cell: (row: Exercise) => `${row.code}`  },
    { columnDef: 'met',  header: 'Met',     cell: (row: Exercise) => `${row.met}`  },
    { columnDef: 'category',  header: 'Category',     cell: (row: Exercise) => `${row.category}`  },
    { columnDef: 'description',  header: 'Description',     cell: (row: Exercise) => `${row.description}`  },
  ];
  columns2 = [
    { columnDef: 'code',  header: 'Code',     cell: (row: Exercise) => `${row.code}`  },
    { columnDef: 'met',  header: 'Met',     cell: (row: Exercise) => `${row.met}`  },
    { columnDef: 'category',  header: 'Category',     cell: (row: Exercise) => `${row.category}`  },
    { columnDef: 'description',  header: 'Description',     cell: (row: Exercise) => `${row.description}`  },
  ];  
  displayedColumns = [];
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource();
  loading: boolean = true;
  hasAdminAuthority: boolean = false;
  hasCuratorAuthority: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private exerciseService: ExerciseService,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.checkUserAuthorities();
        this.initColumns();
      }
    });
  }

  ngOnInit() {
    this.getExercises();
    this.dataSource.sort = this.sort;
  }

  checkUserAuthorities() {
    this.hasAdminAuthority = this.authService.isAdmin();
    if(this.hasAdminAuthority)
      this.hasCuratorAuthority = true;
    else
      this.hasCuratorAuthority = this.authService.isCurator();
  }

  initColumns() {
    if (this.hasAdminAuthority || this.hasCuratorAuthority) {
      this.columns.forEach(element => {
        this.displayedColumns.push(element.columnDef); 
      });
      this.displayedColumns.push('actions');
    }
    else{
      this.columns2.forEach(element => {
        this.displayedColumns.push(element.columnDef); 
      });
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getExercises() {
    this.loading = true;
    this.exerciseService.getExercises().delay(1000).subscribe((resp: Exercise[]) => {
      this.loading = false;
      this.exercises = resp;
      this.dataSource = new MatTableDataSource<Exercise>(this.exercises);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.loading = false;
      this.toastr.error('Error while loading exercises');
    })
  }

  openEditDialog(selectedExercise, title): void {
    let modalData = {
      'selectedExercise': selectedExercise ? selectedExercise : new Exercise(),
      'title': title
    }

    let dialogRef = this.dialog.open(EditExerciseComponent, {
      width: '700px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.ngOnInit();
    });
  }

  openDeleteDialog(selectedExercise): void {
    let dialogRef = this.dialog.open(DeleteExerciseComponent, {
      width: '300px',
      data: selectedExercise
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.ngOnInit();
    });
  }
}
