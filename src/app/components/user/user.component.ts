import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { SevicesService } from '../../services/sevices.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class HomeComponent implements OnInit {
    currentUser: any;
  
    constructor(private authService: SevicesService) { }
  
    ngOnInit() {
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }
  }