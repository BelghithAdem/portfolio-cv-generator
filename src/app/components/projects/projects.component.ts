import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resume } from '../../models/resume.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
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