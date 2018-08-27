import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { CurrentQuestion } from '../../../app-shared/current-question';
import  {Question} from '../../../model/Qustion.model';

@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {

    Qchoosed:Question;

  constructor(private currentQuestionService:CurrentQuestion) { }

  ngOnInit() {

        this.Qchoosed=this.currentQuestionService.getCurrentQuestion();

        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["18-21","22-25","26-29","30 ומעלה"],
                datasets: [{
                    label: 'גיל',
                    data: [this.Qchoosed.Age18To21,this.Qchoosed.Age22To25,this.Qchoosed.Age26To29,this.Qchoosed.up30],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                }]
            },
        });

        var ctx1 = document.getElementById("myChart1");
        var myChart = new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: ["ללא נסיון","שיווק","מלצרות","מכירות","ניהול"],
                datasets: [{
                    label: 'נסיון תעסוקתי',
                    data: [this.Qchoosed.inexperienced,this.Qchoosed.Marketing,this.Qchoosed.Waitress,this.Qchoosed.Sales,this.Qchoosed.Management],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 140, 68, 0.2)',                        
                    ],
                }]
            },
        });
    
        var ctx2 = document.getElementById("myChart2");
                var myChart = new Chart(ctx2, {
                    type: 'pie',
                    data: {
                        labels: ["זכר","נקבה"],
                        datasets: [{
                            label: 'מין',
                            data: [this.Qchoosed.female,this.Qchoosed.male],
                            backgroundColor: [
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 140, 68, 0.2)',                       
                            ],
                        }]
                    },
                });


    }



}
