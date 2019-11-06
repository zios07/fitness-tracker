import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FoodEaten } from '../../../models/FoodEaten';
import {MatDialog} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { NavigationEnd, Router } from '@angular/router';
import { FoodTrackerService } from '../../../services/food-tracker.service';
import { EditFoodEatenComponent } from '../../common/modal/food-eaten/edit-food-eaten/edit-food-eaten.component';
import { DeleteFoodEatenComponent } from '../../common/modal/food-eaten/delete-food-eaten/delete-food-eaten.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-food-tracker',
  templateUrl: './food-tracker.component.html',
  styleUrls: ['./food-tracker.component.css']
})
export class FoodTrackerComponent implements OnInit {

  foods: FoodEaten[] = [];
  columns = [
    { columnDef: 'date',  header: 'Date',     cell: (row: FoodEaten) => this.formatDate(row.date) },
    { columnDef: 'food',  header: 'Food',     cell: (row: FoodEaten) => `${row.food.name}`  },
    { columnDef: 'sevingQte ',  header: 'Serving Quantity', cell: (row: FoodEaten) => `${row.servingQty}` },
    { columnDef: 'calories ',  header: 'Calories', cell: (row: FoodEaten) => this.calculateResult(row.servingQty, row.food.calories) },
    { columnDef: 'fat ',  header: 'Fat', cell: (row: FoodEaten) => this.calculateResult(row.servingQty, row.food.fat) },
    { columnDef: 'saturatedFat ',  header: 'Saturated Fat', cell: (row: FoodEaten) => this.calculateResult(row.servingQty, row.food.saturatedFat)  },
    { columnDef: 'carbohydrates ',  header: 'Carbohydrates', cell: (row: FoodEaten) => this.calculateResult(row.servingQty, row.food.carbohydrates)  },
    { columnDef: 'fiber ',  header: 'Fiber', cell: (row: FoodEaten) => this.calculateResult(row.servingQty, row.food.fiber)  },
    { columnDef: 'sugar ',  header: 'Sugar', cell: (row: FoodEaten) => this.calculateResult(row.servingQty, row.food.sugar)  },
    { columnDef: 'protein ',  header: 'Protein', cell: (row: FoodEaten) => this.calculateResult(row.servingQty, row.food.protein)  },
    { columnDef: 'sodium ',  header: 'Sodium', cell: (row: FoodEaten) => this.calculateResult(row.servingQty, row.food.sodium)  }
  ];
  
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<FoodEaten>;
  loading:boolean = true;
  hasAdminAuthority: boolean = false;
  filterDate: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private datePipe: DatePipe,
              private foodEatenService: FoodTrackerService,
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
    this.getFoodEaten();
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

  getFoodEaten() {
    this.loading = true;
    this.foodEatenService.getFoods().delay(1000).subscribe((resp: FoodEaten[]) => {
      this.loading = false;
      this.foods = resp;
      this.dataSource = new MatTableDataSource<FoodEaten>(this.foods);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.loading = false;
      this.toastr.error('Error while loading foods');
    })
  }

  refreshFoods() {
    let formattedDate = this.datePipe.transform(this.filterDate, 'dd-MM-yyyy');
    this.foodEatenService.getByDate(formattedDate).subscribe((resp: FoodEaten[]) => {
      this.foods = resp;
      this.dataSource = new MatTableDataSource<FoodEaten>(this.foods);
    }, error => {
      this.toastr.error('Error while filtering by date');
    })
  }

  openEditDialog(selectedFoodEaten, title): void {
    let modalData = {
      'selectedFoodEaten': selectedFoodEaten? selectedFoodEaten : new FoodEaten(),
      'title': title
    }
    let dialogRef = this.dialog.open(EditFoodEatenComponent, {
      width: '700px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }

  openDeleteDialog(selectedFoodEaten): void {
    let dialogRef = this.dialog.open(DeleteFoodEatenComponent, {
      width: '300px',
      data: selectedFoodEaten
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }

  formatDate(date) {
    return this.datePipe.transform(date, 'HH:mm dd-MM-yyyy');
  }

  calculateResult(servingQty, property) {
    return servingQty * property;
  }

}
