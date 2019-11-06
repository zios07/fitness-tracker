import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../services/authentication.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  title = 'Sign up';
  form: FormGroup;
  submitted = false;
  user: User = new User();

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
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
    this.submitted = true;
    console.log(this.form.value);
    this.authService.register(this.form.value).delay(1500).subscribe(resp => {
      this.authService.setConnectedUser(resp);
      this.authService.login(this.form.value).subscribe((resp : any) => {
        this.submitted = false;
        this.tokenService.saveToken(resp.token);
        this.router.navigate(['home']);
      })
      this.toastr.success("Registered successfully");
    }, error => {
      this.submitted = false;
      this.toastr.error("Error while registering");
    });
  }

}
