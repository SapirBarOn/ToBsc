import { Component, OnInit } from '@angular/core';
import { Colleges } from '../../../model/Colleges.model';
import { CurrentColleges } from '../../../app-shared/current-college';
import { DataService } from '../../../data.service';
import { Subject } from '../../../model/subject.model';
import { CurrentUser } from '../../../app-shared/current-user';

import * as Chart from 'chart.js';
declare var $:any;

@Component({
  selector: 'app-into-college',
  templateUrl: './into-college.component.html',
  styleUrls: ['./into-college.component.css']
})

export class IntoCollegeComponent implements OnInit {

    College:Colleges;
    BarChart:any;
    show:boolean=false;
    stars:boolean[]=[false,false,false,false,false];
    numOfStars:number;
    userID:string;

  constructor(private currentCollegeService:CurrentColleges,
              private dataService :DataService,
              private currentUserService:CurrentUser ) { }

  ngOnInit() {
      //this.userID=this.currentUserService.getCurrentUser()._id;
      this.userID='5b180bf36c2cba0c844c4920';
      this.College = this.currentCollegeService.getCurrentColleges();
      console.log("ngOnInit->intoCollege");
      console.log(this.College);

       $(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 200;  // How many characters are shown by default
    var moretext = "קרא עוד";
    var lesstext = "סגור";
    

    $('.more p').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + lesstext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
             $(this).html(lesstext);
        } else {
            $(this).addClass("less");
            $(this).html(moretext);
           
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});
      
      var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["ממוצע היום", "ממוצע אתמול", "ממוצע לפני יומיים", "ממוצע לפני 3 ימים", "ממוצע לפני 4 ימים", "ממוצע לפני 5 ימים"],
        datasets: [{
            label: 'שכירות ממוצעת באזור מוסד הלימוד',
            data: [3200, 4100, 3900, 3800, 3400, 3600],
            backgroundColor: [
                // 'rgba(255, 99, 132, 0.2)',
                // 'rgba(54, 162, 235, 0.2)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                // 'rgba(255,99,132,1)',
                // 'rgba(54, 162, 235, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
  }



  
goBack() {
    window.history.back();
}


rate(x){
    for(let i=0; i<this.stars.length; i++){
        this.stars[i]=false;
    }
    if(x==1){
        this.stars[0]=true;
        this.numOfStars=1;
    } 
    else if(x==2){
        this.stars[0]=true;
        this.stars[1]=true; 
        this.numOfStars=2;
    }
    else if(x==3){
        this.stars[0]=true;
        this.stars[1]=true;
        this.stars[2]=true;            
        this.numOfStars=3;
    }
    else if(x==4){
        this.stars[0]=true;
        this.stars[1]=true;
        this.stars[2]=true;
        this.stars[3]=true; 
        this.numOfStars=4;
    }   
    else if(x==5){
        this.stars[0]=true;
        this.stars[1]=true;
        this.stars[2]=true;
        this.stars[3]=true;
        this.stars[4]=true; 
        this.numOfStars=5;
    }

    this.dataService.rateColleges(this.userID,this.College.hebName,this.numOfStars,result=>{
          console.log(`response=${result}`);
          if(result) console.log('rate done');
          else  console.log('rate error');           
        });
}


}