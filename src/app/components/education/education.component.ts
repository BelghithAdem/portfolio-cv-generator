import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resume } from '../../models/resume.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-education',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './education.component.html',
})
export class EducationComponent {
  @Input() resumeValue!: Resume;
  @Output() autoResize = new EventEmitter<any>();
  @Output() addNew = new EventEmitter<string>();
  index: number | undefined;
  i: any;

  onAutoResize(event: any, id: string, index: number) {
    this.autoResize.emit({ event, id, index });
  }
  
  onAddNew(type: string) {
    this.addNew.emit(type);
  }
}
