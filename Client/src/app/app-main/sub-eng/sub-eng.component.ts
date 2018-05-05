import { Component, OnInit } from '@angular/core';
import  {DataService} from '../../data.service';
import  {SubEng} from '../../model/SubEng.model';
@Component({
  selector: 'app-sub-eng',
  templateUrl: './sub-eng.component.html',
  styleUrls: ['./sub-eng.component.css']
})
export class SubEngComponent implements OnInit {
    
 subEng:SubEng[]=[];

  constructor(private dataService:DataService) { }

  ngOnInit() {

      this.dataService.getAllSubEng((result) =>{
        this.subEng=result;
        console.log( this.subEng);      

    });
  }

}
