import { Component, OnInit } from '@angular/core';
import  {DataService} from '../../../data.service';
import { Logs } from '../../../model/Logs.model';

@Component({
  selector: 'app-expert-crawler',
  templateUrl: './expert-crawler.component.html',
  styleUrls: ['./expert-crawler.component.css']
})
export class ExpertCrawlerComponent implements OnInit {
  typeRefreshLogs:string="refreshLogs";
  typeRefreshErr:string="refreshErr";
  RefreshLogs:Logs[]=[];
  RefreshErr:Logs[]=[];
  constructor(private dataService:DataService) { }

  ngOnInit() {  

    this.dataService.getTypeLog(this.typeRefreshLogs,(result)=>{
          console.log(result);
          this.RefreshLogs=result;
      })

      this.dataService.getTypeLog(this.typeRefreshErr,(result)=>{
          console.log(result);
          this.RefreshErr=result;
      })
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

    goBack() {
    window.history.back();
}
}
