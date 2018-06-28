import { Component, OnInit } from '@angular/core';
import { Scholarships } from '../../../model/Scholarships.model';
import { CurrentScholarships } from '../../../app-shared/current-scholarship';
@Component({
  selector: 'app-into-scholarships',
  templateUrl: './into-scholarships.component.html',
  styleUrls: ['./into-scholarships.component.css']
})
export class IntoScholarshipsComponent implements OnInit {

Scholarships:Scholarships ;
  constructor(private currentScholarshipsService:CurrentScholarships) { }

  ngOnInit() {
      this.Scholarships = this.currentScholarshipsService.getCurrentScholarships();
      console.log("ngOnInit->intoScholarships");
      console.log(this.Scholarships);
  }
  goBack() {
    window.history.back();
}
}
