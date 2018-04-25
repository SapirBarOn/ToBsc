import { Component, OnInit } from '@angular/core';
import  {DataService} from '../../data.service';
import  {Institutes} from '../../model/Institutes.model';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.css']
})
export class InstitutesComponent implements OnInit {

  institutes:Institutes[]=[];



  constructor(private dataService:DataService) { }

  ngOnInit() {

    this.dataService.getAllInstitutes((result) =>{
        this.institutes=result;
        console.log(this.institutes);      

    });



  }

}
