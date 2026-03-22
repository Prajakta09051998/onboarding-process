// ================= CANDIDATE MODEL =================

export class Candidate {
  id?: number;
  fullName: string = '';
  email: string = '';
  phone: string = '';
  experience: number = 0;
  position: string = '';
  skills: string = '';
  resumeUrl: string = '';
  status: string = '';
  createdDate: string = '';
}


// ================= INTERVIEW MODEL =================

export class Interview {
  id?: number;
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
  hasFeedback?: boolean;
  feedbackResult?: string | null;
}


// ================= FEEDBACK MODEL =================

export class Feedback {
  id?: number;
  interviewId: number = 0;
  candidateId: number = 0;
  candidateName: string = '';
  round: string = '';
  rating: number = 0;
  feedback: string = '';
  result: string = '';
  createdDate: string = '';
}