import { Component, ElementRef, ViewChild } from '@angular/core';
import { Resume } from '../models/resume.model';
import { ProfileComponent } from '../components/profile/profile.component';
import { WorkExperienceComponent } from '../components/work-experience/work-experience.component';
import { EducationComponent } from '../components/education/education.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { ResumeSettingsComponent } from '../components/resume-settings/resume-settings.component';
import { ResumePreviewComponent } from '../components/resume-preview/resume-preview.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NavbarComponent } from '../components/navbar/navbar.component';


@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProfileComponent,
    WorkExperienceComponent,
    EducationComponent,
    ProjectsComponent,
    SkillsComponent,
    ResumeSettingsComponent,
    ResumePreviewComponent,
    NavbarComponent
  ],
  templateUrl: './resume-builder.component.html',
  styleUrl: './resume-builder.component.scss',
})
export class ResumeBuilderComponent {
  @ViewChild('resumePreview') resumePreview!: ElementRef;

  resumeValue: Resume = {
    resume: {
      profile: {
        name: '',
        summary: '',
        email: '',
        phone: '',
        url: '',
        location: ''
      },
      workExperiences: [
        {
          company: '',
          jobTitle: '',
          date: '',
          descriptions: ['']
        }
      ],
      educations: [
        {
          school: '',
          degree: '',
          gpa: '',
          date: '',
          descriptions: ['']
        }
      ],
      projects: [
        {
          project: '',
          date: '',
          descriptions: ['']
        }
      ],
      skills: {
        featuredSkills: [
          { skill: '', rating: [false, false, false, false, false] },
          { skill: '', rating: [false, false, false, false, false] },
          { skill: '', rating: [false, false, false, false, false] },
          { skill: '', rating: [false, false, false, false, false] },
          { skill: '', rating: [false, false, false, false, false] },
          { skill: '', rating: [false, false, false, false, false] }
        ],
        descriptions: ['']
      }
    }
  };

  themeColorValue = '#3b82f6'; // Default blue-500
  fontFamilyValue = 'Inter';
  fontSize = 11;
  isGeneratingPDF = false;
  pdfGenerationMessage = '';

  autoResize(event: any, id: string, index: number) {
    const element = document.getElementById(id);
    if (element) {
      element.style.height = 'auto';
      element.style.height = (element.scrollHeight) + 'px';
    }
  }

  addNew(type: string) {
    if (type === 'workExperiences') {
      this.resumeValue.resume.workExperiences.push({
        company: '',
        jobTitle: '',
        date: '',
        descriptions: ['']
      });
    } else if (type === 'educations') {
      this.resumeValue.resume.educations.push({
        school: '',
        degree: '',
        gpa: '',
        date: '',
        descriptions: ['']
      });
    } else if (type === 'projects') {
      this.resumeValue.resume.projects.push({
        project: '',
        date: '',
        descriptions: ['']
      });
    }
  }

  themeColor(color: string) {
    this.themeColorValue = color;
  }

  fontFamily(font: string) {
    this.fontFamilyValue = font;
  }

  fontValue(event: any) {
    this.fontSize = event.target?.value || event;
  }

  increaseSize(size: number) {
    this.fontSize = size;
  }

  async exportToPDF() {
    this.isGeneratingPDF = true;
    this.pdfGenerationMessage = 'Generating PDF...';

    try {
      const element = this.resumePreview.nativeElement;

      const buttons = element.querySelectorAll('button');
      buttons.forEach((button: HTMLElement) => {
        button.style.display = 'none';
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      buttons.forEach((button: HTMLElement) => {
        button.style.display = '';
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = this.resumeValue.resume.profile.name
        ? `Resume_${this.resumeValue.resume.profile.name.replace(/\s+/g, '_')}.pdf`
        : 'My_Resume.pdf';

      pdf.save(fileName);
      this.pdfGenerationMessage = 'PDF generated successfully!';
    } catch (error) {
      console.error('Error generating PDF:', error);
      this.pdfGenerationMessage = 'Error generating PDF. Please try again.';
    } finally {
      setTimeout(() => {
        this.isGeneratingPDF = false;
        this.pdfGenerationMessage = '';
      }, 3000);
    }
  }
}