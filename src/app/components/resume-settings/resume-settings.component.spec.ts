import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSettingsComponent } from './resume-settings.component';

describe('ResumeSettingsComponent', () => {
  let component: ResumeSettingsComponent;
  let fixture: ComponentFixture<ResumeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
