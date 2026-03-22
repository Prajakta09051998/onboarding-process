import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Candidate } from './onBoard-service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private storageKey = 'candidates';

  getCandidates(): Observable<Candidate[]> {
    const data = localStorage.getItem(this.storageKey);
    return of(data ? JSON.parse(data) : []);
  }

  saveCandidate(candidate: Candidate): Observable<any> {
    const data = localStorage.getItem(this.storageKey);
    const candidates = data ? JSON.parse(data) : [];

    candidate.id = new Date().getTime(); // unique id

    candidates.push(candidate);

    localStorage.setItem(this.storageKey, JSON.stringify(candidates));

    return of(candidate); // simulate API
  }
}