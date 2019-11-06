import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import 'rxjs/add/operator/delay';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DeleteUserComponent } from '../../common/modal/user/delete-user/delete-user.component';
import { EditUserComponent } from '../../common/modal/user/edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  columns =  ['username', 'firstname', 'lastname', 'email', 'height', 'weight', 'enabled', 'stringAuthorities']
  displayedColumns = this.columns.concat(['actions']);
  dataSource: MatTableDataSource<User>;
  loading:boolean = true;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              public dialog: MatDialog) {}
              
  ngOnInit() {
    this.getUsers(1000);
  }

  getUsers(delay) {
    this.loading = true;
    this.userService.getUsers().delay(delay).subscribe((resp: User[]) => {
      this.users = resp;
      this.users.forEach(user => {
        user.stringAuthorities = "";
        user.authorities.forEach(authority => {
          user.stringAuthorities += authority.name + " ";
        })
      })
      this.loading = false;
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.toastr.error('Error while fetching users list');
      this.loading = false;
    })
  }

  banUser(user) {
    this.userService.banUser(user.id).subscribe(resp => {
      this.getUsers(0);
    })
  }

  unbanUser(user) {
    this.userService.unbanUser(user.id).subscribe(resp => {
      this.getUsers(0);
    })
  }

  openEditDialog(selectedUser, title, editing): void {
    let modalData = {
      'selectedUser': selectedUser? selectedUser : new User(),
      'title': title,
      'editing': editing
    }
    let dialogRef = this.dialog.open(EditUserComponent, {
      width: '700px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }

  openDeleteDialog(selectedUser): void {
    let dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '300px',
      data: selectedUser
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }
}
