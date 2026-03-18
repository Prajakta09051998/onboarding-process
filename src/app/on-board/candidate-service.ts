import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate, Interview, Feedback } from '../on-board/onBoard-service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // ================= CANDIDATE APIs =================

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.baseUrl}/candidates`);
  }

  saveCandidate(data: any) {
    return this.http.post(`${this.baseUrl}/candidates`, data);
  }

  getCandidateNameById(candidateId: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${candidateId}/name`);
  }

  updateCandidate(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/candidates/${id}`, data);
  }

  deleteCandidate(id: number) {
    return this.http.delete(`${this.baseUrl}/candidates/${id}`);
  }

  // ================= INTERVIEW APIs =================

  scheduleInterview(data: any) {
    return this.http.post(`${this.baseUrl}/interviews`, data);
  }

  getInterviews() {
    return this.http.get(`${this.baseUrl}/interviews`);
  }

  // ================= FEEDBACK APIs =================

  saveFeedback(data: any) {
    return this.http.post(`${this.baseUrl}/feedbacks`, data);
  }

  getFeedbacks() {
    return this.http.get(`${this.baseUrl}/feedbacks`);
  }

  // ================= HIRING STATUS =================

  getHiringStatus(candidateId: number) {
    return this.http.get(`${this.baseUrl}/interviews?candidateId=${candidateId}`);
  }

}