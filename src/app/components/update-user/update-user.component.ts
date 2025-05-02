import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SevicesService } from '../../services/sevices.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class ProfileComponent implements OnInit {
    profileForm!: FormGroup;
    passwordForm!: FormGroup;
    currentUser: any;
    loading = {
      profile: false,
      password: false,
      delete: false
    };
    submitted = {
      profile: false,
      password: false
    };
    success = {
      profile: false,
      password: false
    };
    error = {
      profile: '',
      password: '',
      delete: ''
    };
    showDeleteConfirm = false;
  
    constructor(
      private formBuilder: FormBuilder,
      private authService: SevicesService,
      private router: Router
    ) { }
  
    ngOnInit() {
      this.currentUser = this.authService.currentUserValue;
      
      if (!this.currentUser) {
        this.router.navigate(['/login']);
        return;
      }
  
      this.profileForm = this.formBuilder.group({
        username: [this.currentUser.username, Validators.required],
        email: [this.currentUser.email, [Validators.required, Validators.email]]
      });
  
      this.passwordForm = this.formBuilder.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, {
        validator: this.mustMatch('newPassword', 'confirmPassword')
      });
    }
  
    // Custom validator to check if passwords match
    mustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
  
        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
          return;
        }
  
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      }
    }
  
    // Convenience getters for easy access to form fields
    get pf() { return this.profileForm.controls; }
    get pwf() { return this.passwordForm.controls; }
  
    onProfileSubmit() {
      this.submitted.profile = true;
      this.success.profile = false;
      this.error.profile = '';
  
      // Stop if form is invalid
      if (this.profileForm.invalid) {
        return;
      }
  
      this.loading.profile = true;
      this.authService.updateProfile(
        this.currentUser.id,
        {
          username: this.pf['username'].value,
          email: this.pf['email'].value
        }
      ).subscribe({
        next: (user) => {
          this.success.profile = true;
          this.loading.profile = false;
          this.currentUser = user;
        },
        error: (error) => {
          this.error.profile = error;
          this.loading.profile = false;
        }
      });
    }
  
    onPasswordSubmit() {
      this.submitted.password = true;
      this.success.password = false;
      this.error.password = '';
  
      // Stop if form is invalid
      if (this.passwordForm.invalid) {
        return;
      }
  
      this.loading.password = true;
      this.authService.changePassword(
        this.currentUser.id,
        this.pwf['currentPassword'].value,
        this.pwf['newPassword'].value
      ).subscribe({
        next: () => {
          this.success.password = true;
          this.loading.password = false;
          this.passwordForm.reset();
          this.submitted.password = false;
        },
        error: (error) => {
          this.error.password = error;
          this.loading.password = false;
        }
      });
    }
  
    showDeleteConfirmation() {
      this.showDeleteConfirm = true;
    }
  
    cancelDelete() {
      this.showDeleteConfirm = false;
    }
  
    confirmDelete() {
      this.loading.delete = true;
      this.error.delete = '';
      
      this.authService.deleteAccount(this.currentUser.id).subscribe({
        next: () => {
          this.router.navigate(['/login'], { queryParams: { deleted: true } });
        },
        error: (error) => {
          this.error.delete = error;
          this.loading.delete = false;
        }
      });
    }
  }