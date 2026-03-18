import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Candidate, Interview } from '../onBoard-service';
import { CandidateService } from '../candidate-service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private fb: FormBuilder,  private candidateService: CandidateService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initForm()
    this.candidateId = this.route.snapshot.paramMap.get('id');
      if (this.candidateId) {
      this.candidateService.getCandidates().subscribe({
        next: (candidates) => {
          const selectedCandidate = candidates.find(candidate => candidate.id?.toString() === this.candidateId);
          if (selectedCandidate) {
            this.candidateName = selectedCandidate.fullName;
          } 
        },
      });
    }
  }

  initForm() {
    this.interviewForm = this.fb.group({
      candidateId: new FormControl('', Validators.required),
      candidateName: new FormControl('', Validators.required),
      round: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      mode: new FormControl('Online', Validators.required),
      interviewer: new FormControl('', Validators.required),
      meetingLink: new FormControl(''),
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
    Object.assign(this.interviewMasterRequest, this.interviewForm.value);
    console.log(this.interviewMasterRequest,'req');
    return
    this.candidateService.saveCandidate(this.interviewMasterRequest).subscribe({
      next: (res) => {
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
