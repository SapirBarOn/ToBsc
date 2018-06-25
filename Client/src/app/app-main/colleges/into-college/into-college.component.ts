import { Component, OnInit } from '@angular/core';
import { Colleges } from '../../../model/Colleges.model';
import { CurrentColleges } from '../../../app-shared/current-college';
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
  constructor(private currentCollegeService:CurrentColleges) { }

  ngOnInit() {
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

}
