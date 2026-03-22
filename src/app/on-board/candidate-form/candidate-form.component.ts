import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utility } from '../../constant/utility';
import { emailPatternValidator, emailValidation, numericPatternValidator } from '../../constant/validations';
import { CandidateService } from '../candidate-service';
import { Candidate } from '../onBoard-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-form',
  standalone: false,
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.scss'
})
export class CandidateFormComponent {
  getErrorMessage = Utility.getErrorMessage;
  candidateForm!: FormGroup;
  resumeFile: any;
  candidateMasterRequest: Candidate = new Candidate();

  constructor(private fb: FormBuilder,  private candidateService: CandidateService,private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.candidateForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, ...emailValidation]),      
      phone: new FormControl('', [Validators.required, Validators.minLength(10), numericPatternValidator(),Validators.pattern(/^[0-9]{10}$/)]),
      experience: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      otherInfo: [''],
      position: new FormControl('', [Validators.required]),
      resumeUrl: new FormControl('', [Validators.required])
    });
  }

  onFileChange(event: any) {
    this.resumeFile = event.target.files[0];
  }
  saveCandidate() {
    if (this.candidateForm.invalid) {
      this.candidateForm.markAllAsTouched();
      return;
    }
    Object.assign(this.candidateMasterRequest, this.candidateForm.value);
    this.candidateMasterRequest.resumeUrl = this.resumeFile?.name || '';
    console.log(this.candidateMasterRequest,'form');
    this.candidateService.saveCandidate(this.candidateMasterRequest).subscribe({
      next: (res) => {
        console.log('Candidate Saved', res);
        alert('Candidate Saved Successfully');
        this.candidateForm.reset();
        this.router.navigate(['onBoard/candidate-list']);
      },
      error: (err) => {
        console.error('Error Saving Candidate', err);
      }
    });
    }
}
