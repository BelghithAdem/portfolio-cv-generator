import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ à ajouter



@Component({
  selector: 'app-register',
  standalone: true,  // Assurez-vous que le composant est autonome
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {}; // Pour stocker les données utilisateur

  constructor(private router: Router) {}

  // Méthode d'inscription
  register() {
    // Simple logique pour simuler l'inscription
    if (this.user.username && this.user.email && this.user.phone && this.user.password) {
      console.log('User Registered:', this.user);
      localStorage.setItem('user', JSON.stringify(this.user)); // Sauvegarde des données dans le localStorage
      this.router.navigate(['/']); // Redirection vers la page d'accueil après l'inscription
    } else {
      console.error('All fields are required!');
    }
  }
}
