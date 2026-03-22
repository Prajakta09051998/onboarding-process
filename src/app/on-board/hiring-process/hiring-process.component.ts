import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from '../candidate-service';
import { ActivatedRoute } from '@angular/router';
import { Feedback } from '../onBoard-service';

@Component({
  selector: 'app-hiring-process',
  standalone: false,
  templateUrl: './hiring-process.component.html',
  styleUrl: './hiring-process.component.scss'
})
export class HiringProcessComponent {
  feedbackForm!: FormGroup;
  candidateName: any;
  candidateId: string | null = null;
  interviewMasterRequest: Feedback = new Feedback();
  
  constructor(private fb: FormBuilder,  private candidateService: CandidateService,private route: ActivatedRoute) {}

  ngOnInit() {
    this.initForm();
     this.candidateId = this.route.snapshot.paramMap.get('id');
      this.candidateService.getCandidates().subscribe({
        next: (candidates) => {
          const selectedCandidate = candidates.find(candidate => candidate.id?.toString() === this.candidateId);
          if (selectedCandidate) {
            this.candidateName = selectedCandidate.fullName;
            this.feedbackForm.get('candidateName')?.setValue(selectedCandidate.fullName);
          } 
        },
      });
  }

  initForm() {
    this.feedbackForm = this.fb.group({
      interviewId: [null],
      candidateId: [null, Validators.required],
      candidateName: [{ value: '', disabled: true }],
      round: ['', Validators.required],
      rating: ['', Validators.required],
      feedback: ['', Validators.required],
      result: ['', Validators.required],
      createdDate: [new Date().toISOString().split('T')[0]]
    });
  }
  submitFeedback() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }
    this.candidateService.saveFeedback(this.interviewMasterRequest).subscribe({
      next: (res) => {
          console.log('Feedback saved successfully:', res);
          alert('Feedback saved successfully!');
        },
        error: (err :any) => {
          console.error('Error saving feedback:', err);
          alert('Failed to save feedback.');
        }
      });
  }
  setRating(value: number) {
    this.feedbackForm.get('rating')?.setValue(value);
  }
}
