import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnBoardComponent } from './on-board.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { HiringProcessComponent } from './hiring-process/hiring-process.component';

const routes: Routes = [
  {
    path: '',
    component: OnBoardComponent,
    children: [
      { path: '', redirectTo: 'candidate-form', pathMatch: 'full' },

      { path: 'candidate-form', component: CandidateFormComponent },

      { path: 'candidate-list', component: CandidateListComponent },

      { path: 'schedule-interview/:id', component: ScheduleInterviewComponent },

      { path: 'hiring-status/:id', component: HiringProcessComponent },

      { path: 'interview-list', component: InterviewListComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class onBoardRoutingModule { }