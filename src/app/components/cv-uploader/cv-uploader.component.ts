import { Component } from '@angular/core';
import { CvExtractService } from '../../services/extracted-cv.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cv-uploader',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cv-uploader.component.html',
  styleUrls: ['./cv-uploader.component.css']
})
export class CvUploaderComponent {
  constructor(public extractedCVService: CvExtractService) {}
  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.extractedCVService.errorMessage = 'File size exceeds 5MB limit';
        return;
      }
      this.extractedCVService.onFileSelected(event);
    }
  }
}