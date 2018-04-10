import { Component, OnInit } from '@angular/core';
import  { DataService } from '../../data.service';
import { NgModel } from '@angular/forms';
import { Message } from '../../model/Message';

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

  constructor(private newService : DataService) {  
   }

  ngOnInit() {
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
    console.log(this.messages);
    return this.messageToCheak;  
    }
    if(this.messageToCheak.includes("כן") || this.messageToCheak.includes("ברור")|| this.messageToCheak.includes("בטח")){
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
}

