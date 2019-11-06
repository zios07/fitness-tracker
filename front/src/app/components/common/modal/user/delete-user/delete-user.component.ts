import {Component, OnInit, Inject} from '@angular/core';
import {User} from '../../../../../models/User';
import {UserService} from '../../../../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {


  user: User = new User();
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data
  }

  ngOnInit() {

  }

  delete() {
    this.userService.delete(this.user.id).subscribe(resp => {
      this.toastr.info('User deleted !');
      this.dialogRef.close(true);
    }, error => {
      this.toastr.error('Error while deleting user');
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
