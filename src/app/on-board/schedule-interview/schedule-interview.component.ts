import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Candidate, Interview } from '../onBoard-service';
import { CandidateService } from '../candidate-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utility } from '../../constant/utility';

@Component({
  selector: 'app-schedule-interview',
  standalone: false,
  templateUrl: './schedule-interview.component.html',
  styleUrl: './schedule-interview.component.scss'
})
export class ScheduleInterviewComponent {
  interviewForm!: FormGroup;
  @Input() selectedCandidate!: Candidate;
  interviewMasterRequest: Interview = new Interview();
  candidateName: any;
  candidateId: string | null = null;
  getErrorMessage = Utility.getErrorMessage;
  minDate: string = '';

  constructor(private fb: FormBuilder,  private candidateService: CandidateService,private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.candidateId = this.route.snapshot.paramMap.get('id');
    this.interviewForm.get('candidateId')?.setValue(this.candidateId);
    console.log(this.candidateId,'candidateid');
      
    if (this.candidateId) {
      this.candidateService.getCandidates().subscribe({
        next: (candidates) => {
          const selectedCandidate = candidates.find(candidate => candidate.id?.toString() === this.candidateId);
          if (selectedCandidate) {
            this.candidateName = selectedCandidate.fullName;
            // Update form control with candidateName
            this.interviewForm.get('candidateName')?.setValue(selectedCandidate.fullName);
          } 
        },
      });
    }
  }

  initForm() {
    this.interviewForm = this.fb.group({
      candidateId: new FormControl('', Validators.required),
      candidateName: new FormControl(''),
      round: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      mode: new FormControl('Online', Validators.required),
      interviewer: new FormControl('', Validators.required),
      meetingLink: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      status: new FormControl('SCHEDULED')
    });
    this.interviewForm.get('candidateId')?.disable();
  }
  submitForm() {
    if (this.interviewForm.invalid) {
      this.interviewForm.markAllAsTouched();
      return;
    }
  const payload = this.interviewForm.getRawValue();

  Object.assign(this.interviewMasterRequest, payload);

  console.log(this.interviewMasterRequest, 'req');
    this.candidateService.scheduleInterview(this.interviewMasterRequest).subscribe({
      next: (res) => {
          this.router.navigate(['/interview-list']);
          console.log('Interview scheduled successfully:', res);
          alert('Interview scheduled successfully!');
        },
        error: (err :any) => {
          console.error('Error scheduling interview:', err);
          alert('Failed to schedule interview.');
        }
      });
    }
}
