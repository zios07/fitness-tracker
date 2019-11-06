import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../../../models/User';
import { UserService } from '../../../../../services/user.service';
import 'rxjs/add/operator/delay';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../../../../services/authentication.service';
import { Authority } from '../../../../../models/Authority';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:User = new User();
  loading:boolean = false;
  title: string;
  editing:boolean;
  authorities: Authority[] = [];
  
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user = data.selectedUser;
      this.user.birthday = new Date(this.user.birthday);
      this.title = data.title;
      this.editing = data.editing;
    }

  ngOnInit() {
    this.loadAuthorities();
  }

  loadAuthorities() {
    this.authService.loadAuthorities().subscribe((resp :Authority[]) => {
      this.authorities = resp;
      if(this.user.authorities) {
        this.user.authorities.forEach(userAuth => {
          this.authorities.forEach(auth => {
            if(userAuth.id === auth.id) 
              auth.checked = true;
          })
        })
      }
    }, error => {
      this.toastr.error('Error while fetching authorities');
    })
  }

  authorityChanged(authority, event) {
    if(event.checked) {
      if(this.user.authorities)
        this.user.authorities.push(authority);
      else
        this.user.authorities = new Array<Authority>(authority);
    } else {
      this.user.authorities = this.user.authorities.filter(function(el) {
        return el.id !== authority.id;
      });
    }
  }
  
  save() {
    this.loading = true;
    if(this.editing) {
      this.userService.updateUser(this.user).delay(1000).subscribe(resp => {
        this.loading = false;
        this.toastr.info('User saved');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error('Error while saving user');
      });
    } else {
      this.userService.save(this.user).delay(1000).subscribe(resp => {
        this.loading = false;
        this.toastr.info('User saved');
        this.dialogRef.close(true);
      }, error => {
        this.toastr.error('Error while saving user');
      });
    }
    
  }
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
