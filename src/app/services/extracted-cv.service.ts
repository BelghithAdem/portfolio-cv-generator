import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CvExtractService {
  private apiUrl = 'https://451c-154-111-188-198.ngrok-free.app/extract';
  public isLoading = false;
  public errorMessage: string | null = null;
  public extractedCV: any = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.isLoading = true;
      this.errorMessage = null;
      this.extractedCV = null;
      
      const file = input.files[0];
      this.extractCV(file).subscribe({
        next: (data) => {
          this.extractedCV = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.handleError(error);
        }
      });
    }
  }

  private extractCV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'Could not connect to the server. Please check your connection.';
      } else if (error.status === 413) {
        errorMessage = 'File size is too large. Maximum size is 5MB.';
      } else if (error.status >= 400 && error.status < 500) {
        errorMessage = error.error?.message || 'Invalid file format or content';
      } else {
        errorMessage = `Server returned code ${error.status}`;
      }
    }
    
    this.errorMessage = errorMessage;
    return throwError(() => new Error(errorMessage));
  }
}
