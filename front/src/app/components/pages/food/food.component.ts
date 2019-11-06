import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../models/Food';
import 'rxjs/add/operator/delay';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EditFoodComponent} from '../../common/modal/food/edit-food/edit-food.component';
import { ToastrService } from 'ngx-toastr';
import {DeleteFoodComponent} from '../../common/modal/food/delete-food/delete-food.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foods: Food[] = [];
  columns = [
    { columnDef: 'id',  header: 'ID',     cell: (row: Food) => `${row.id}` },
    { columnDef: 'name',  header: 'Name',     cell: (row: Food) => `${row.name}`  },
    { columnDef: 'calories',  header: 'Calories',     cell: (row: Food) => `${row.calories}`  },
    { columnDef: 'fat',  header: 'Fat',     cell: (row: Food) => `${row.fat}`  },
    { columnDef: 'saturatedFat',  header: 'Saturated Fat',     cell: (row: Food) => `${row.saturatedFat}`  },
    { columnDef: 'carbohydrates',  header: 'Carbohydrates',     cell: (row: Food) => `${row.carbohydrates}`  },
    { columnDef: 'fiber',  header: 'Fiber',     cell: (row: Food) => `${row.fiber}`  },
    { columnDef: 'sodium',  header: 'Sodium',     cell: (row: Food) => `${row.sodium}`  },
    { columnDef: 'protein',  header: 'Protein',     cell: (row: Food) => `${row.protein}`  },
    { columnDef: 'sugar',  header: 'Sugar',     cell: (row: Food) => `${row.sugar}`  },
  ];
  columns2 = [
    { columnDef: 'name',  header: 'Name',     cell: (row: Food) => `${row.name}`  },
    { columnDef: 'calories',  header: 'Calories',     cell: (row: Food) => `${row.calories}`  },
    { columnDef: 'fat',  header: 'Fat',     cell: (row: Food) => `${row.fat}`  },
    { columnDef: 'saturatedFat',  header: 'Saturated Fat',     cell: (row: Food) => `${row.saturatedFat}`  },
    { columnDef: 'carbohydrates',  header: 'Carbohydrates',     cell: (row: Food) => `${row.carbohydrates}`  },
    { columnDef: 'fiber',  header: 'Fiber',     cell: (row: Food) => `${row.fiber}`  },
    { columnDef: 'sodium',  header: 'Sodium',     cell: (row: Food) => `${row.sodium}`  },
    { columnDef: 'protein',  header: 'Protein',     cell: (row: Food) => `${row.protein}`  },
    { columnDef: 'sugar',  header: 'Sugar',     cell: (row: Food) => `${row.sugar}`  },
  ];
  displayedColumns = [];
  dataSource: MatTableDataSource<Food>;
  loading:boolean = true;
  hasAdminAuthority: boolean = false;
  hasCuratorAuthority: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private foodService: FoodService,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) {
          router.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
              this.isAdmin();
              this.isCurator();
              this.initColumns();
            }
        });
    }

  ngOnInit() {
    this.getFoods();
  }

  isAdmin() {
    this.hasAdminAuthority = this.authService.isAdmin();
    // ADMIN has Curator authority
    if(this.hasAdminAuthority)
      this.hasCuratorAuthority = true;
  }

  isCurator() {
    if(this.hasAdminAuthority)
      this.hasCuratorAuthority = true;
    else
      this.hasCuratorAuthority = this.authService.isCurator();
  }

  initColumns() {
    if(this.hasAdminAuthority || this.hasCuratorAuthority) {
      this.columns.forEach(element => {
        this.displayedColumns.push(element.columnDef); 
      });
      this.displayedColumns.push('actions');
    } else {
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

  getFoods() {
    this.loading = true;
    this.foodService.getFoods().delay(1000).subscribe((resp: Food[]) => {
      this.loading = false;
      this.foods = resp;
      this.dataSource = new MatTableDataSource<Food>(this.foods);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.loading = false;
      this.toastr.error('Error while loading foods');
    })
  }
  openEditDialog(selectedFood, title): void {
    let modalData = {
      'selectedFood': selectedFood? selectedFood : new Food(),
      'title': title
    }
    let dialogRef = this.dialog.open(EditFoodComponent, {
      width: '700px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }

  openDeleteDialog(selectedFood): void {
    let dialogRef = this.dialog.open(DeleteFoodComponent, {
      width: '300px',
      data: selectedFood
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }
}
