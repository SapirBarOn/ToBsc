import { Component, OnInit } from '@angular/core';
import  { DataService } from '../../data.service';
import { NgModel } from '@angular/forms';
import { Message } from '../../model/Message';
import { Router } from '@angular/router';
import {CurrentUser} from '../../app-shared/current-user';
import { User } from '../../model/user.model';
declare var $:any;
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
user:User;
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
selects = [
       {id: 1, name: "כן"},
       {id: 2, name: "אולי"},
       {id: 3, name: "לא"}
       
     ];

  constructor(private newService : DataService,private currentUserService : CurrentUser) {  
   }

  ngOnInit() {
            this.timer=setTimeout(()=>{
            this.newService.getQuestionById( this.questionNum,(results) => {
           this.messages.push(new Message(results));
           $('.select').css('display','block')
           this.questionNum++;
           // var scroll = $("#chat");
           //  scroll.scrollTop = scroll.scrollHeight;

         });
       },1500)
  }
  send(content){
    let message =new Message(content);
    this.messages.push(message)
    $('.select').css('display','none');
    this.ngOnInit();
  }
 

    getAnswer(){
      console.log("befor Sub",this.arrayCorrectAnswer);
          this.user=this.currentUserService.getCurrentUser();
          this.user.setAnswers(this.arrayCorrectAnswer);         
    }
}