import { Component, OnInit } from '@angular/core';
import  {DataService} from '../../../data.service';

@Component({
  selector: 'app-expert-crawler',
  templateUrl: './expert-crawler.component.html',
  styleUrls: ['./expert-crawler.component.css']
})
export class ExpertCrawlerComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit() {

  }

  crawlerDepartments(){
      this.dataService.getDepartmentsData((result) =>{
             console.log("crawler Departments run")
    });
  }

  crawlerCollges(){
        this.dataService.getCollegesData((result) =>{
             console.log("crawler Colleges run")
    });
  }
}
