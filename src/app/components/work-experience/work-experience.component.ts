import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resume } from '../../models/resume.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {
  @Input() resumeValue!: Resume;
  @Output() autoResize = new EventEmitter<any>();
  @Output() addNew = new EventEmitter<string>();

  onAutoResize(event: any, id: string, index: number) {
    this.autoResize.emit({event, id, index});
  }

  onAddNew(type: string) {
    this.addNew.emit(type);
  }
}