import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loginPage: boolean = true;
  hasAdminAuthority: boolean = false;
  username: string;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authService: AuthenticationService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isAdmin();
      }
    });
    this.initMenu();
  }

  ngOnInit() {
  }

  isAuthenticated() {
    let authenticated = this.authService.isAuthenticated();
    if (authenticated) {
      let user = this.authService.getConnectedUser();
      if (user) {
        this.username = user.username;
        this.isAdmin();
      }
    }
    return authenticated;
  }

  isAdmin() {
    this.hasAdminAuthority = this.authService.isAdmin();
  }

  initMenu() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd)
        if (this.router.routerState.snapshot.url === "/signup")
          this.loginPage = false;
        else
          this.loginPage = true;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
