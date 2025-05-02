import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ à ajouter

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  // Données statiques pour la validation
  private validUsername: string = 'admin';
  private validPassword: string = 'password123';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.username === this.validUsername && this.password === this.validPassword) {
      this.message = 'Connexion réussie!';
      this.router.navigate(['/user'], { queryParams: { username: this.username } });
    } else {
      this.message = 'Nom d\'utilisateur ou mot de passe incorrect.';
    }
  }
}
