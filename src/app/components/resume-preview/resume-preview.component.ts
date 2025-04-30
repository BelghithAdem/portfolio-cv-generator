import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resume } from '../../models/resume.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.css'
})
export class ResumePreviewComponent {
  @Input() resumeValue!: Resume;
  @Output() exportToPDF = new EventEmitter<void>();

  isBlue(index: number, rating: boolean[]): boolean {
    return rating[index];
  }

  onExportToPDF() {
    this.exportToPDF.emit();
  }
}
