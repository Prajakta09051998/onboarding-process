import { Component } from '@angular/core';
import { CandidateService } from '../candidate-service';
import { Candidate } from '../onBoard-service';
@Component({
  selector: 'app-candidate-list',
  standalone: false,
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss'
})
export class CandidateListComponent {
  candidates: Candidate[] = [];
  selectedCandidate: any;

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.candidatesList();
  }

  candidatesList() {
    this.candidateService.getCandidates().subscribe({
      next: (res) => {
        this.candidates = res;
      },
      error: (err) => {
        console.error('Error fetching candidates', err);
      }
    });
  }
  rejectCandidate(id: number) {
    if (confirm('Are you sure you want to reject this candidate?')) {
      this.candidateService.updateCandidate(id, { status: 'Rejected' })
        .subscribe({
          next: () => {
            this.candidatesList();
            alert('Candidate rejected successfully');
          },
          error: (err) => {
            console.error('Error rejecting candidate', err);
          }
        });
    }
  }

  openViewModal(candidate: any) {
    this.selectedCandidate = candidate;
  }

  closeModal() {
    this.selectedCandidate = null;
  }
}
