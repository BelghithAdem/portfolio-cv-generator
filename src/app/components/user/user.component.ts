import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None  // Désactive l'encapsulation pour que les styles globaux puissent être appliqués
})
export class UserComponent implements OnInit {
  userName: string = '';
  userEmail: string = 'user@example.com'; // Exemple d'email statique

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userName = params['username'] || 'Nom d\'utilisateur inconnu';
    });
  }
}
