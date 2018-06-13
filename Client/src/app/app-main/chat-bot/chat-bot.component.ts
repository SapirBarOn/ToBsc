import { Component, OnInit } from '@angular/core';
import  { DataService } from '../../data.service';
import { NgModel } from '@angular/forms';
import { Message } from '../../model/Message';
import { Router } from '@angular/router';
import {CurrentUser} from '../../app-shared/current-user';
import { User } from '../../model/user.model';
import {Question} from'../../model/Qustion.model' ;
import {SubEngByUser} from'../../model/SubEngByUser.model';
import { Subject } from '../../model/subject.model';


declare var $:any;
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})

export class ChatBotComponent implements OnInit {
questionsByDiff:Question[]=[];
questionsForSoftware:Question[]=[];
questionsForMedical:Question[]=[];
questionsForChemistry:Question[]=[];
questionsForBuilding:Question[]=[];
questionsForElectronic:Question[]=[];
questionsForMachine:Question[]=[];
questionsForManagement:Question[]=[];
askedQuestions:Question[]=[];
nextQuestion: Question;
maxWeight: Subject;
minWeight: Subject;
subEngForUser:SubEngByUser;
totalSubEng:Subject[]=[];
userTotalSubEng:Subject[]=[];
canAsk: boolean;
popCount: number=0;

messages:Message []=[];
result;
questionNum:number=1;
messageToCheak:string [];
arrayCorrectAnswer:number [];
content="";
timer: any;
typing="מקליד...";
user:User;
id:string;
resultAfterTyping;
today = new Date();
selects = [
       {id: 1, name: "כן"},
       {id: 2, name: "אולי"},
       {id: 3, name: "לא"}
       
     ];

  constructor(private dataService : DataService,private currentUserService : CurrentUser) {  
   }

  ngOnInit() {
    this.user=this.currentUserService.getCurrentUser();
    this.id=this.user.getId();
    // this.id='29837528394';
    //this.id='5ac35e2ee92c8230100e21c4';
    this.dataService.getORcreateSubEngByUser(this.id, (result)=>{
    this.subEngForUser=result;
    this.totalSubEng.push(
                            new Subject("הנדסת תוכנה",this.subEngForUser.software),
                            new Subject("הנדסה כימית",this.subEngForUser.chemistry),
                            new Subject("הנדסת אלקטרוניקה",this.subEngForUser.electronic),
                            new Subject("הנדסה רפואית",this.subEngForUser.medical),
                            new Subject("הנדסה תעשיה וניהול",this.subEngForUser.management),
                            new Subject("הנדסת בניין/אזרחית",this.subEngForUser.building),
                            new Subject("הנדסת מכונות",this.subEngForUser.machine)
                        );

          this.dataService.allQuestions((result) =>{
          this.questionsByDiff=result;
          console.log(this.questionsByDiff.length)

            for (let i=0; i<this.questionsByDiff.length; i++){
                 let maxWeight=Math.max(this.questionsByDiff[i].Wsoftware, this.questionsByDiff[i].Wmedical, this.questionsByDiff[i].Wchemistry, this.questionsByDiff[i].Wbuilding, this.questionsByDiff[i].Welectronic, this.questionsByDiff[i].Wmachine, this.questionsByDiff[i].Wmanagement);
                 let minWeight=Math.min(this.questionsByDiff[i].Wsoftware, this.questionsByDiff[i].Wmedical, this.questionsByDiff[i].Wchemistry, this.questionsByDiff[i].Wbuilding, this.questionsByDiff[i].Welectronic, this.questionsByDiff[i].Wmachine, this.questionsByDiff[i].Wmanagement);
                 this.questionsByDiff[i].Wdifferent=maxWeight-minWeight;
            }

        this.questionsByDiff.sort(function(a, b){return b.Wdifferent - a.Wdifferent});
            console.log('difffffff',this.questionsByDiff);
          //   this.kuku(result);
        for (let j=0 ; j< result.length ; j++){
          this.questionsForBuilding.push(result[j]);
          this.questionsForChemistry.push(result[j]); 
          this.questionsForElectronic.push(result[j]);
          this.questionsForMachine.push(result[j]);  
          this.questionsForManagement.push(result[j]);
          this.questionsForMedical.push(result[j]);
          this.questionsForSoftware.push(result[j]);   
        }
        this.questionsForBuilding.sort(function(a, b){return a.Wbuilding - b.Wbuilding});
         console.log('Building',this.questionsForBuilding);
         this.questionsForChemistry.sort(function(a, b){return a.Wchemistry - b.Wchemistry});
         console.log('Chemistry',this.questionsForChemistry);
         this.questionsForSoftware.sort(function(a, b){return a.Wsoftware - b.Wsoftware});
         console.log('software',this.questionsForSoftware);
         this.questionsForElectronic.sort(function(a, b){return a.Welectronic - b.Welectronic});
         console.log('Electronic',this.questionsForElectronic);
         this.questionsForMedical.sort(function(a, b){return a.Wmedical - b.Wmedical});
         console.log('Medical',this.questionsForMedical);
         this.questionsForManagement.sort(function(a, b){return a.Wmanagement - b.Wmanagement});
         console.log('Management',this.questionsForManagement);
         this.questionsForMachine.sort(function(a, b){return a.Wmachine - b.Wmachine});
         console.log('Machine',this.questionsForMachine);

      this.ChatAlgorithm();

        });
    })
  }

ChatAlgorithm(){
  this.totalSubEng.sort(function(a, b){return a.total - b.total});
      console.log(this.totalSubEng);
     this.maxWeight=this.totalSubEng[this.totalSubEng.length-1];
     this.minWeight=this.totalSubEng[0];
     console.log(this.maxWeight);
     console.log(this.minWeight);

     if(this.maxWeight.total==this.minWeight.total){
        this.nextQuestion=this.questionsByDiff.pop();
        console.log(this.nextQuestion)
        this.canAsk= this.checkIfAsked(this.nextQuestion)
        if (this.canAsk == true){
          this.messages.push(new Message(this.nextQuestion.questionData,"../../../assets/images/chat_bot.png"));
          this.askedQuestions.push(this.nextQuestion);
          $('.select button').css('visibility','visible')
        }

        else this.ChatAlgorithm();
      }

      else{
        let subEngMax= this.maxWeight.type;
        let subEngWeight;

        if (subEngMax=='הנדסה כימית'){
          this.nextQuestion=this.questionsForChemistry.pop();
          this.subEngForUser.chemistry=this.maxWeight.total;
          subEngWeight= this.nextQuestion.Wchemistry;
        }

        else if (subEngMax=='הנדסת תוכנה'){
          this.nextQuestion=this.questionsForSoftware.pop();
          this.subEngForUser.software=this.maxWeight.total;
          subEngWeight= this.nextQuestion.Wsoftware;
        }

        else if (subEngMax=='הנדסת אלקטרוניקה'){
          this.nextQuestion=this.questionsForElectronic.pop();
          this.subEngForUser.electronic=this.maxWeight.total;
          subEngWeight= this.nextQuestion.Welectronic;
        }

        else if (subEngMax=='הנדסה רפואית'){
          this.nextQuestion=this.questionsForMedical.pop();
          this.subEngForUser.medical=this.maxWeight.total;
          subEngWeight= this.nextQuestion.Wmedical;
        }

        else if (subEngMax=='הנדסה תעשיה וניהול'){
          this.nextQuestion=this.questionsForManagement.pop();
          this.subEngForUser.management=this.maxWeight.total;
          subEngWeight= this.nextQuestion.Wmanagement;
        }
        else if (subEngMax=='הנדסת בניין/אזרחית'){
          this.nextQuestion=this.questionsForBuilding.pop();
          this.subEngForUser.building=this.maxWeight.total;
          subEngWeight= this.nextQuestion.Wbuilding;
        }
        else if (subEngMax=='הנדסת מכונות'){
          this.nextQuestion=this.questionsForMachine.pop();
          this.subEngForUser.machine=this.maxWeight.total;
          subEngWeight= this.nextQuestion.Wmachine;
        }

        if (subEngWeight>2){
          this.canAsk=this.checkIfAsked(this.nextQuestion.questionId);
          console.log(this.canAsk)
          if (this.canAsk == true){
            this.messages.push(new Message(this.nextQuestion.questionData,"../../../assets/images/chat_bot.png"));
            $('.select button').css('visibility','visible')
            this.askedQuestions.push(this.nextQuestion);
          }
          else{
           this.ChatAlgorithm();
          }
        }

        else {
          this.userTotalSubEng.push(this.totalSubEng.pop());
           console.log(this.userTotalSubEng);
           this.popCount++;
           if (this.popCount<4){
            this.ChatAlgorithm();            
           }

           else{
              this.dataService.updateSubEngWeights(this.id,this.subEngForUser.chemistry,this.subEngForUser.software,this.subEngForUser.electronic,this.subEngForUser.medical,this.subEngForUser.management,this.subEngForUser.building,this.subEngForUser.machine, (result)=>{
             })
             this.userTotalSubEng.sort(function(a, b){return b.total - a.total});
             console.log('עדיפות ראשונה', this.userTotalSubEng[0])
             console.log('עדיפות שנייה', this.userTotalSubEng[1])
             console.log('עדיפות שלישית', this.userTotalSubEng[2])
           }


        }

      }

  }

  checkIfAsked(questionID){
    let flag=true;
    if (this.askedQuestions.length != 0){
         for (let q=0 ; q< this.askedQuestions.length; q++){
             if (this.askedQuestions[q].questionId == questionID){
               flag=false;
             }
          }
    }
       return flag;
  }

  send(content){
    let numForAddTotal;
     $('.select button').css('visibility','hidden');
    let message =new Message(content,"../../../assets/images/chat_bot.png");
    this.messages.push(message)
    $('html, #chat').animate({
    scrollTop: $("#chat").offset().top+ '100px'
    }, 10);

    if (content=="כן") {
      numForAddTotal=1;
    }

    else if (content=="אולי") {
      numForAddTotal=0;
    }
    else if(content=="לא") {
      numForAddTotal=-1;
    }

    for (let t=0 ; t< this.totalSubEng.length; t++) {
      console.log(this.totalSubEng[t].type);
      if (this.totalSubEng[t].type == 'הנדסת תוכנה'){
        this.totalSubEng[t].total+=this.askedQuestions[this.askedQuestions.length-1].Wsoftware*numForAddTotal;
      }

      else if (this.totalSubEng[t].type == 'הנדסה כימית'){
        this.totalSubEng[t].total+=this.askedQuestions[this.askedQuestions.length-1].Wchemistry*numForAddTotal;
      }
      else if (this.totalSubEng[t].type == 'הנדסת אלקטרוניקה'){
        this.totalSubEng[t].total+=this.askedQuestions[this.askedQuestions.length-1].Welectronic*numForAddTotal;
      }
      else if (this.totalSubEng[t].type == 'הנדסה רפואית'){
        this.totalSubEng[t].total+=this.askedQuestions[this.askedQuestions.length-1].Wmedical*numForAddTotal;
      }
      else if (this.totalSubEng[t].type == 'הנדסה תעשיה וניהול'){
        this.totalSubEng[t].total+=this.askedQuestions[this.askedQuestions.length-1].Wmanagement*numForAddTotal;
      }
      else if (this.totalSubEng[t].type == 'הנדסת בניין/אזרחית'){
        this.totalSubEng[t].total+=this.askedQuestions[this.askedQuestions.length-1].Wbuilding*numForAddTotal;
      } 
      else if (this.totalSubEng[t].type == 'הנדסת מכונות'){
        this.totalSubEng[t].total+=this.askedQuestions[this.askedQuestions.length-1].Wmachine*numForAddTotal;
      }      
    }

    this.ChatAlgorithm();
  }
    getAnswer(){
      console.log("befor Sub",this.arrayCorrectAnswer);
          this.user=this.currentUserService.getCurrentUser();
          this.user.setAnswers(this.arrayCorrectAnswer);         
    }
}