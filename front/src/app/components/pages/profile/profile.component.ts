import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  title: string;
  form: FormGroup;
  submitted = false;
  user: User = new User();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthenticationService,
    private datePipe: DatePipe,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.title = "Edit " + this.authService.getConnectedUser().firstname + "'s profile";
    this.user = this.authService.getConnectedUser();
    this.user.birthday = new Date(this.user.birthday);
    this.form = this.formBuilder.group({
      username: [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: [''],
      firstname:['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      height: ['', Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      birthday: ['', Validators.compose([Validators.required])],
      gender: ['']
    });
  }

  onSubmit() {
    this.form.value.id = this.user.id;
    this.userService.updateUser(this.form.value).delay(1000).subscribe(resp => {
      this.authService.setConnectedUser(resp);
      this.toastr.info('Profile updated');
    }, error => {
      this.toastr.error('Error while updating profile');
    })
  }
}
