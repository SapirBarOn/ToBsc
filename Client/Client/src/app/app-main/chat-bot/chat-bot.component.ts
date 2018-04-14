import { Component, OnInit } from '@angular/core';
import  { DataService } from '../../data.service';
import { NgModel } from '@angular/forms';
import { Message } from '../../model/Message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})

export class ChatBotComponent implements OnInit {


messages:Message []=[];
result;
questionNum:number=1;
messageToCheak:string [];
arrayCorrectAnswer:number [];
content="";
timer: any;
typing="מקליד...";
resultAfterTyping;
    weightsSub:number[];
    userAns:number[];
    softwareArr:number[];
    chemistryArr: number[];
    electronicArr: number[];
    medicalArr: number[];
    managementArr: number[];
    buildingArr: number[];
    machineArr: number[];


  constructor(private newService : DataService) {  
   }

  ngOnInit() {
            this.softwareArr = new Array();
        this.chemistryArr= new Array();
        this.electronicArr= new Array();
        this.medicalArr= new Array();
      this.arrayCorrectAnswer = new Array();
      this.ngOnInit1();
  }

  ngOnInit1(){
      this.timer = setTimeout(() => {
         this.newService.getQuestionById( this.questionNum,(results) => {
           this.result = results;
           this.messages.push(this.result);
         });
      }, 200);
  }

  send(content){
    let message =new Message(content);
    this.messages.push(message)
    this.messageToCheak=content;
    console.log("messageToCheak",this.messageToCheak);
    this.content="";
    if(this.messageToCheak.includes("לא")){
      if(this.messageToCheak.includes("לא יודע")||this.messageToCheak.includes("לא בטוח")){
        this.arrayCorrectAnswer.push(2);
      }
      else{
         this.arrayCorrectAnswer.push(1);
      }
      if(this.questionNum<12){
         this.questionNum++;
        console.log("this.arrayCorrectAnswer",this.arrayCorrectAnswer)
        this.timer = setTimeout(() => {
          this.resultAfterTyping = new Message (this.typing);
          this.messages.push(this.resultAfterTyping)
          this.timer = setTimeout(() => {
            this.newService.getQuestionById( this.questionNum,(results) => {
              this.messages.pop()
              this.messages.push(
              new Message(results)
              );
            });
          }, 1000);
        }, 1000);

      }

      console.log(this.messages);
      return this.messageToCheak;  
    }
    if(this.messageToCheak.includes("כן") || this.messageToCheak.includes("ברור")|| this.messageToCheak.includes("בטח")){
       if(this.questionNum<12){
            this.questionNum++;
            this.arrayCorrectAnswer.push(3);
            console.log("this.arrayCorrectAnswer",this.arrayCorrectAnswer)
            this.timer = setTimeout(() => {
              this.resultAfterTyping = new Message (this.typing)
              this.messages.push(this.resultAfterTyping)
              this.timer = setTimeout(() => {
                this.newService.getQuestionById( this.questionNum,(results) => {
                  this.messages.pop()
                  this.messages.push(
                  new Message(results)
                  );
                });  
              }, 1000);
            }, 1000);
        }
     console.log(this.messages);
    }
   else{
     this.timer = setTimeout(() => {
       this.resultAfterTyping = new Message (this.typing)
       this.messages.push(this.resultAfterTyping)
       this.timer = setTimeout(() => {
         this.messages.pop()
         let message = new Message ("לא הבנתי אותך, אנא נסה שנית")
         this.messages.push(message); 
        }, 1000);
      }, 1000);   
   }


  }


  handleSubmit(event) {
    if (event.keyCode === 13) {
        this.send(this.content);
      }
    }

    getAnswer(id){
         this.newService.myAnswers(this.arrayCorrectAnswer);
         // for(let id=1; id<13; id++){
             // this.newService.getWeightsById(id,(data)=>{
             //     console.log(data);
             //     console.log(data[0]);
             //     this.softwareArr.push(data[0]);
             //     this.chemistryArr.push(data[1]);
             //     this.electronicArr.push(data[2]);
             //     this.medicalArr.push(data[3]);
             //    this.managementArr.push(data[4]);
             //   this.buildingArr.push(data[5]);
             //   this.machineArr.push(data[6]);

             //     console.log(`softwareArr[]=${this.softwareArr}`);
             //     console.log(`electronicArr[]=${this.electronicArr}`);
             // this.chemistryArr.push(data[1]);
             // this.electronicArr.push(data[2]);
             // this.medicalArr.push(data[3]);
             // this.managementArr.push(data[4]);
             // this.buildingArr.push(data[5]);
             // this.machineArr.push(data[6]);
             //});

        //}
    }
}


