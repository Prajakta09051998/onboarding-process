import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnBoardComponent } from './on-board.component';
import { onBoardRoutingModule } from './onboard-routing.module';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { ScheduleInterviewComponent } from './schedule-interview/schedule-interview.component';
import { HiringProcessComponent } from './hiring-process/hiring-process.component';



@NgModule({
  declarations: [
    OnBoardComponent,
    CandidateFormComponent,
    CandidateListComponent,
    ScheduleInterviewComponent,
    HiringProcessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    onBoardRoutingModule,
  ]
})
export class OnBoardModule { }
