import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resume } from '../../models/resume.model';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() resumeValue!: Resume;
  @Output() autoResize = new EventEmitter<any>();

  onAutoResize(event: any, id: string, index: number) {
    this.autoResize.emit({event, id, index});
  }
}