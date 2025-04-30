import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Resume } from '../../models/resume.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  @Input() resumeValue!: Resume;
  @Output() autoResize = new EventEmitter<any>();
  
  rating1 = [false, false, false, false, false];
  rating2 = [false, false, false, false, false];
  rating3 = [false, false, false, false, false];
  rating4 = [false, false, false, false, false];
  rating5 = [false, false, false, false, false];
  rating6 = [false, false, false, false, false];

  onAutoResize(event: any, id: string, index: number) {
    this.autoResize.emit({event, id, index});
  }

  isBlue(index: number, rating: boolean[]): boolean {
    return rating[index];
  }

  toggleColor(index: number, rating: boolean[]) {
    // Reset all ratings to false
    for (let i = 0; i < rating.length; i++) {
      rating[i] = i <= index;
    }
  }
}
