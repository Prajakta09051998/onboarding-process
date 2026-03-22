import { Component } from '@angular/core';
import { CandidateService } from '../candidate-service';
import { Interview } from '../onBoard-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utility } from '../../constant/utility';

@Component({
  selector: 'app-interview-list',
  standalone: false,
  templateUrl: './interview-list.component.html',
  styleUrl: './interview-list.component.scss'
})
export class InterviewListComponent {
  getErrorMessage = Utility.getErrorMessage;
  interviewList: Interview[] = [];
  selectedCandidate: any;
  feedbackForm!: FormGroup;
  selectedInterview: any;
  isViewMode: boolean = false;

  constructor(private candidateService: CandidateService, private fb: FormBuilder) { }

  ngOnInit() {
    this.interviewListData();
    this.initForm();
  }

  initForm() {
    this.feedbackForm = this.fb.group({
      rating: new FormControl(0),
      feedback: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
  }

  interviewListData() {
    this.candidateService.getInterviews().subscribe({
      next: (interviews) => {
        this.candidateService.getFeedbacks().subscribe({
          next: (feedbacks: any[]) => {
            this.interviewList = interviews.map(interview => {
            const feedback = feedbacks.find(f => f.interviewId === interview.id);

            return {
              ...interview,
              hasFeedback: !!feedback,
              feedbackResult: feedback?.result || null
            };
          });

          }
        });

      },
      error: (err) => {
        console.error('Error fetching interviews', err);
      }
    });
  }
  openFeedback(interview: any) {
    this.selectedInterview = interview;
    this.isViewMode = false; // 👉 ADD MODE

    this.feedbackForm.reset();
    this.feedbackForm.enable(); // make sure it's editable
  }

  closePopup() {
    this.selectedInterview = null;
  }

  submitFeedback() {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const formValue = this.feedbackForm.value;

    const payload = {
      interviewId: this.selectedInterview.id,
      candidateId: this.selectedInterview.candidateId,
      candidateName: this.selectedInterview.candidateName,
      round: this.selectedInterview.round,
      rating: formValue.rating,
      feedback: formValue.feedback,
      result: formValue.status,
      createdDate: new Date().toISOString()
    };

    console.log(payload, 'feedback payload');
    this.candidateService.saveFeedback(payload).subscribe({
      next: () => {
        alert('Feedback submitted successfully');
        this.selectedInterview.status = formValue.status;
        this.selectedInterview.hasFeedback = true;
        this.closePopup();
      },
      error: (err) => {
        console.error('Error saving feedback', err);
      }
    });
  }
  stars: number[] = [1, 2, 3, 4, 5];

  setRating(value: number) {
    this.feedbackForm.patchValue({
      rating: value
    });
  }
  viewFeedback(interview: any) {
    this.selectedInterview = interview;
    this.isViewMode = true; // 👉 VIEW MODE

    this.candidateService.getFeedbacks().subscribe({
      next: (res: any[]) => {
        const feedback = res.find(f => f.interviewId === interview.id);

        if (feedback) {
          this.feedbackForm.patchValue({
            rating: Number(feedback.rating),
            feedback: feedback.feedback,
            status: feedback.result
          });

          this.feedbackForm.disable();
        }
      },
      error: (err) => {
        console.error('Error fetching feedback', err);
      }
    });
  }
  getStatusLabel(status: string) {
    switch (status) {
      case 'SCHEDULED': return 'Pending';
      case 'Shortlisted': return 'Selected';
      case 'Rejected': return 'Rejected';
      case 'Next Round': return 'Next Round';
      case 'On Hold': return 'On Hold';
      default: return status;
    }
  }
}
