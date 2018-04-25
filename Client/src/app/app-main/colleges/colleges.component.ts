import { Component, OnInit } from '@angular/core';
import  { DataService } from '../../data.service';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {
crawler:string;
display:boolean=false;
  constructor(private dataService : DataService) { }

  ngOnInit() {
     
  }
  getData(){
      this.display=true;
      this.dataService.getCrawler((data) => {
           this.crawler = data;
           console.log(this.crawler);
           
         });
  }
  goBack(){
         window.history.back();
       }

}
