import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SevicesService } from '../../services/sevices.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  currentUser: any;

  constructor(
    private router: Router,
    private authService: SevicesService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}