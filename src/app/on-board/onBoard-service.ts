// ================= CANDIDATE MODEL =================

export class Candidate {
  id?: number = 0;
  fullName: string = '';
  email: string = '';
  phone: string = '';
  experience: number = 0;
  appliedPosition: string = '';
  skills: string = '';
  resumeUrl: string = '';
  status: string = '';
  createdDate: string = '';
}


// ================= INTERVIEW MODEL =================

export class Interview {
  id?: number = 0;
  candidateId: number = 0;
  candidateName: string = '';
  round: string = '';
  date: string = '';
  time: string = '';
  mode: string = '';
  interviewer: string = '';
  meetingLink: string = '';
  remarks: string = '';
  status: string = '';
}


// ================= FEEDBACK MODEL =================

export interface Feedback {
  id?: number;
  interviewId: number;
  candidateId: number;
  candidateName: string;
  round: string;
  rating: number;
  feedback: string;
  result: string;
  createdDate: string;
}