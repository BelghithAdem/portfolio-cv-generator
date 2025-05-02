import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SevicesService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private users: User[] = [
    { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
    { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const storedUser = this.isBrowser() ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const userCopy = { ...user };
          delete userCopy.password;
          
          if (this.isBrowser()) {
            localStorage.setItem('currentUser', JSON.stringify(userCopy));
          }
          this.currentUserSubject.next(userCopy as User);
          observer.next(userCopy as User);
          observer.complete();
        } else {
          observer.error('Username or password is incorrect');
          observer.complete();
        }
      }, 1000); 
    });
  }

  register(username: string, email: string, password: string): Observable<User> {
    // Simulate API call with delay
    return new Observable(observer => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = this.users.some(u => u.email === email);
        
        if (userExists) {
          observer.error('User with this email already exists');
          observer.complete();
          return;
        }
        
        // Create new user
        const newUser: User = {
          id: this.users.length + 1,
          username,
          email,
          password
        };
        
        // Add to "database"
        this.users.push(newUser);
        
        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;
        observer.next(newUser);
        observer.complete();
      }, 1000); // 1 second delay to simulate network request
    });
  }

  updateProfile(userId: number, userData: { username?: string; email?: string }): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        // Find user in our fake database
        const userIndex = this.users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          observer.error('User not found');
          observer.complete();
          return;
        }
        
        // Check if email already exists (if changing email)
        if (userData.email && userData.email !== this.users[userIndex].email) {
          const emailExists = this.users.some(u => u.email === userData.email && u.id !== userId);
          if (emailExists) {
            observer.error('Email already in use');
            observer.complete();
            return;
          }
        }
        
        // Update user
        this.users[userIndex] = {
          ...this.users[userIndex],
          ...userData
        };
        
        // Update current user if this is the logged in user
        const currentUser = this.currentUserValue;
        if (currentUser && currentUser.id === userId) {
          const updatedUser = {
            ...currentUser,
            ...userData
          };
          
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        }
        
        // Return updated user without password
        const { password: _, ...userWithoutPassword } = this.users[userIndex];
        observer.next(userWithoutPassword as User);
        observer.complete();
      }, 1000);
    });
  }

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        // Find user in our fake database
        const userIndex = this.users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          observer.error('User not found');
          observer.complete();
          return;
        }
        
        // Verify current password
        if (this.users[userIndex].password !== currentPassword) {
          observer.error('Current password is incorrect');
          observer.complete();
          return;
        }
        
        // Update password
        this.users[userIndex].password = newPassword;
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  deleteAccount(userId: number): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        // Find user in our fake database
        const userIndex = this.users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
          observer.error('User not found');
          observer.complete();
          return;
        }
        
        // Remove user from database
        this.users.splice(userIndex, 1);
        
        // Logout if this is the current user
        const currentUser = this.currentUserValue;
        if (currentUser && currentUser.id === userId) {
          this.logout();
        }
        
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}