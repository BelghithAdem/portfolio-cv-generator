import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import du FormsModule
import { CommonModule } from '@angular/common';  // Import du CommonModule

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.scss'],
  standalone: true,  // Le composant est standalone
  imports: [FormsModule, CommonModule]  // Ajout du CommonModule ici
})
export class GestionUserComponent {
  // Liste des utilisateurs sans le champ 'cv'
  users: { username: string; email: string; creationDate: string }[] = [];
  
  // Données du formulaire sans le champ 'cv'
  formData = { username: '', email: '', creationDate: '' };  
  isEditing = false;  // Indicateur pour savoir si l'on est en mode édition
  editIndex: number | null = null;  // Index de l'utilisateur à modifier
  showConfirmPopup = false;  // Variable pour afficher/cacher le pop-up de confirmation
  deleteIndex: number | null = null;  // Index de l'utilisateur à supprimer

  // Fonction pour activer le pop-up de confirmation
  onDeleteConfirmation(index: number) {
    this.showConfirmPopup = true;
    this.deleteIndex = index;
  }

  // Fonction pour supprimer l'utilisateur après confirmation
  onDeleteConfirmed() {
    if (this.deleteIndex !== null) {
      this.users.splice(this.deleteIndex, 1);  // Supprimer l'utilisateur à l'index donné
      this.deleteIndex = null;
    }
    this.showConfirmPopup = false;
  }

  // Fonction pour annuler la suppression
  onDeleteCancelled() {
    this.showConfirmPopup = false;
  }

  // Fonction pour ajouter ou mettre à jour un utilisateur
  onAdd() {
    if (this.formData.username && this.formData.email && this.formData.creationDate) {
      if (this.isEditing && this.editIndex !== null) {
        this.users[this.editIndex] = { ...this.formData };  // Mettre à jour l'utilisateur
        this.isEditing = false;
        this.editIndex = null;
      } else {
        this.users.push({ ...this.formData });  // Ajouter un nouvel utilisateur
      }
      this.formData = { username: '', email: '', creationDate: '' };  // Réinitialiser le formulaire
    }
  }

  // Fonction pour éditer un utilisateur
  onEdit(user: any, index: number) {
    this.formData = { ...user };  // Remplir le formulaire avec les données de l'utilisateur
    this.isEditing = true;
    this.editIndex = index;
  }
}
