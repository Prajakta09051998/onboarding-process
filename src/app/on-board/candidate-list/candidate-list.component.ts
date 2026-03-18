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

  constructor(private candidateService: CandidateService) {}

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
}
