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
import { Colleges } from '../../model/Colleges.model';

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

flag:boolean=false;
DistanceFromMe:Colleges[]=[];
subEngNearest:Subject[]=[];
myLocationLat:number;
myLocationLong:number;

messages:Message []=[];
messages1:Message[]=[];
messageResult:Message[]=[];
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
showP1:boolean=false;
showP2:boolean=false;
buttonSubEng:boolean=false;
  constructor(private dataService : DataService,private currentUserService : CurrentUser, private router: Router) {  
   }

  ngOnInit() {
    this.user=this.currentUserService.getCurrentUser();

    if (this.user!=undefined){
      this.id=this.user.getId();
    //this.id='29833232528394'; For Testing
      this.dataService.getORcreateSubEngByUser(this.id, (result)=>{
      this.subEngForUser=result;
      if (this.subEngForUser.software!=0 || this.subEngForUser.chemistry!=0 || this.subEngForUser.electronic!=0 ||
          this.subEngForUser.medical!=0 || this.subEngForUser.management!=0 || 
          this.subEngForUser.building!=0 || this.subEngForUser.machine!=0){
            if (confirm("לפי נתוני המערכת ביצעת שיחה עם נציגנו בעבר ונמצאו לך תחומי הנדסה מתאימים. האם תרצה לבצע שיחה מחדש?\nבלחיצה על 'אישור' נתוניך יתאפסו ונבצע שיחה חדשה.")) {
              this.subEngForUser.software=0 
              this.subEngForUser.chemistry=0 
              this.subEngForUser.electronic=0
              this.subEngForUser.medical=0 
              this.subEngForUser.management=0 
              this.subEngForUser.building=0 
              this.subEngForUser.machine=0
                  this.dataService.updateSubEngWeights(this.id,this.subEngForUser.chemistry,this.subEngForUser.software,this.subEngForUser.electronic,
    this.subEngForUser.medical,this.subEngForUser.management,this.subEngForUser.building,this.subEngForUser.machine, (result)=>{})
              console.log("You pressed OK!");
            }else{
                console.log("You pressed Cancel!");
                this.router.navigateByUrl('/enter');
            }
      }
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
          for (let i=0; i<result.length; i++){
              this.questionsForBuilding.push(result[i]);
              this.questionsForChemistry.push(result[i]); 
              this.questionsForElectronic.push(result[i]);
              this.questionsForMachine.push(result[i]);  
              this.questionsForManagement.push(result[i]);
              this.questionsForMedical.push(result[i]);
              this.questionsForSoftware.push(result[i]);   
              let maxWeight=Math.max(this.questionsByDiff[i].Wsoftware, this.questionsByDiff[i].Wmedical, this.questionsByDiff[i].Wchemistry, this.questionsByDiff[i].Wbuilding, this.questionsByDiff[i].Welectronic, this.questionsByDiff[i].Wmachine, this.questionsByDiff[i].Wmanagement);
              let minWeight=Math.min(this.questionsByDiff[i].Wsoftware, this.questionsByDiff[i].Wmedical, this.questionsByDiff[i].Wchemistry, this.questionsByDiff[i].Wbuilding, this.questionsByDiff[i].Welectronic, this.questionsByDiff[i].Wmachine, this.questionsByDiff[i].Wmanagement);
              this.questionsByDiff[i].Wdifferent=maxWeight-minWeight;
          }
          this.questionsByDiff.sort(function(a, b){return b.Wdifferent - a.Wdifferent});
          console.log('questions by dif',this.questionsByDiff);
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
          $('.select button').css('visibility','hidden');
           this.timer = setTimeout(() => {
              this.showP1=true;
        },1000);
            this.timer = setTimeout(() => {
              this.showP2=true;
        },2000);
               this.timer = setTimeout(() => {
                this.ChatAlgorithm();
        },3000);

          });
      });

    }

   else{
      alert('על מנת לבצע את שיחת הצאט מול הפסיכולוגית שלנו עליך להתחבר למערכת.')
      this.router.navigateByUrl('/login')
   }
}

ChatAlgorithm(){
  this.totalSubEng.sort(function(a, b){return a.total - b.total});
      console.log(this.totalSubEng);
  this.maxWeight=this.totalSubEng[this.totalSubEng.length-1];
  this.minWeight=this.totalSubEng[0];
     console.log(this.maxWeight);
     console.log(this.minWeight);

  if(this.maxWeight.total==this.minWeight.total){
    if (this.flag==false) this.getUserPosition();
    else this.getQuestionByDiff();
  }else{
     this.getQuestionFromSubEng();
  }
}

getQuestionByDiff(){
  if(this.questionsByDiff.length!=0){
    this.nextQuestion=this.questionsByDiff.pop();
          console.log(this.nextQuestion)
    this.canAsk= this.checkIfAsked(this.nextQuestion.questionId)
    if (this.canAsk == true){
      this.timer = setTimeout(() => {
        this.resultAfterTyping = new Message (this.typing);
          this.messages.push(this.resultAfterTyping)
            $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '100px'
            }, 10);
        this.timer = setTimeout(() => {
       this.messages.pop();
       this.messages.push(new Message(this.nextQuestion.questionData));
        $('.select button').css('visibility','visible');
     },2000);
      },1000);
        this.askedQuestions.push(this.nextQuestion);
    }
    else this.ChatAlgorithm();
  }
  else {
      this.userTotalSubEng=this.totalSubEng
      this.finishAndGetResults();
  }
}

  getQuestionFromSubEng(){
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
          console.log(this.nextQuestion)
          this.timer = setTimeout(() => {
        this.resultAfterTyping = new Message (this.typing);
          this.messages.push(this.resultAfterTyping)
            $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '100px'
            }, 10);
        this.timer = setTimeout(() => {
       this.messages.pop();
       this.messages.push(new Message(this.nextQuestion.questionData));
        $('.select button').css('visibility','visible');
     },2000);
      },1000);
        this.askedQuestions.push(this.nextQuestion);
        }
        else{
          this.ChatAlgorithm();          }
        }

      else {
        this.userTotalSubEng.push(this.totalSubEng.pop());
        console.log(this.userTotalSubEng);
        this.popCount++;
        if (this.popCount<4){
          this.ChatAlgorithm();            
        }
        else this.finishAndGetResults();
      }

  }

  finishAndGetResults(){
    this.dataService.updateSubEngWeights(this.id,this.subEngForUser.chemistry,this.subEngForUser.software,this.subEngForUser.electronic,
    this.subEngForUser.medical,this.subEngForUser.management,this.subEngForUser.building,this.subEngForUser.machine, (result)=>{})
    this.userTotalSubEng.sort(function(a, b){return b.total - a.total});
      console.log('עדיפות ראשונה', this.userTotalSubEng[0])
      console.log('עדיפות שנייה', this.userTotalSubEng[1])
      console.log('עדיפות שלישית', this.userTotalSubEng[2])
    let OneSub=this.userTotalSubEng[0].type,
        TwoSub=this.userTotalSubEng[1].type,
        ThreeSub=this.userTotalSubEng[2].type;

    if (this.userTotalSubEng[0].total==0 && this.userTotalSubEng[1].total==0 && this.userTotalSubEng[2].total==0){
   this.timer = setTimeout(() => {
        this.resultAfterTyping = new Message (this.typing);
          this.messages.push(this.resultAfterTyping)
            $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '80px'
            }, 10);
        this.timer = setTimeout(() => {
       this.messages.pop();
       $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '150px'
            }, 10);
      this.messages.push(new Message('משיחתי איתך, נראה כי אינך מתעניין בלימודי תחומי ההנדסה הקיימים. חשוב אולי כדאי לשקול תחומים אחרים'));
      this.buttonSubEng=true;
     },2000);
      },1000);
    }

    else if(this.userTotalSubEng[0].total==this.userTotalSubEng[1].total){
      this.timer = setTimeout(() => {
        this.resultAfterTyping = new Message (this.typing);
          this.messages.push(this.resultAfterTyping)
            $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '80px'
            }, 10);
        this.timer = setTimeout(() => {
       this.messages.pop();
       $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '150px'
            }, 10);
        this.messages.push(new Message('משיחתי איתך, נראה כי קיימים 2 תחומים התאימים לך ביותר ובמידה שווה,התחום '+OneSub+
        ' והתחום '+TwoSub+' . התחום הנוסף התאים לך הוא '+ThreeSub+'.'));
       this.buttonSubEng=true;
     },2000);
      },1000);
      
    }

    else if(this.userTotalSubEng[1].total==this.userTotalSubEng[2].total){
      this.timer = setTimeout(() => {
        this.resultAfterTyping = new Message (this.typing);
          this.messages.push(this.resultAfterTyping)
            $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '80px'
            }, 10);
        this.timer = setTimeout(() => {
       this.messages.pop();
       $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '150px'
            }, 10);
       this.messages.push(new Message('משיחתי איתך, נראה כי התחום המתאים לך ביותר הוא '+OneSub+' . כעדיפות שנייה התחומים '+TwoSub+ ' ו'+ThreeSub+' מצאו גם כן מתאימים לך באופן שווה'));
       this.buttonSubEng=true;
     },2000);
      },1000);
    }
    else if(this.userTotalSubEng[2].total==this.userTotalSubEng[3].total){
      this.timer = setTimeout(() => {
        this.resultAfterTyping = new Message (this.typing);
          this.messages.push(this.resultAfterTyping)
            $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '80px'
            }, 10);
        this.timer = setTimeout(() => {
       this.messages.pop();
       $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '150px'
            }, 10);
       this.messages.push(new Message('שיחתי איתך נראה כי התחום המתאים לך ביותר הוא '+OneSub+
        '.\n כעדיפות שנייה התחום המתאים לך הוא '+TwoSub+'.'));
       this.buttonSubEng=true;
     },2000);
      },1000);
    }    

    else{
         this.timer = setTimeout(() => {
        this.resultAfterTyping = new Message (this.typing);
          this.messages.push(this.resultAfterTyping)
            $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '80px'
            }, 10);
        this.timer = setTimeout(() => {
       this.messages.pop();
       $('html, #chat').animate({
              scrollTop: $("#chat").offset().top+ '120px'
            }, 10);
       this.messages.push(new Message('משיחתי איתך נראה כי התחום המתאים לך ביותר הוא '+OneSub+
        '.\n כעדיפות שנייה התחום המתאים לך הוא '+TwoSub+'.\nוכעדיפות שלישית ניתן לראות שתחום '+
        ThreeSub+'\n מתאים לך.'));
             this.buttonSubEng=true;

     },2000);
      },1000);
    }


//get urls to subeng and colleges
     //  this.timer = setTimeout(() => {
     //   //  var number=this.messages.length;
     //   // console.log(number);
     //   //  if((number+1)%2==0){
     //   //  this.messages.length++;
     //   //    }
     //   //   console.log(this.messages.length);
     //    this.resultAfterTyping = new Message (this.typing);
     //      this.messageResult.push(this.resultAfterTyping)
     //        $('html, #chat').animate({
     //          scrollTop: $("#chat").offset().top+ '120px'
     //        }, 10);
     //    this.timer = setTimeout(() => {
     //   this.messageResult.pop();
     //   this.messageResult.push(new Message('ללמעבר לעמוד תחומי ההנדסה המתאימים לך ל'));
     // },2000);
     //  },5000);
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
       let message =new Message(content);
       this.messages.push(message)
    
    if (content=="כן") {
      numForAddTotal=1;
      console.log('The ques user answered YES',this.askedQuestions[this.askedQuestions.length-1]);
      //Check user's age
      console.log('User age',this.user.age);
      if (this.user.age<=21){
        this.askedQuestions[this.askedQuestions.length-1].Age18To21++;
      }else if (this.user.age>21 && this.user.age<=25){
        this.askedQuestions[this.askedQuestions.length-1].Age22To25++;
      }else if (this.user.age>25 && this.user.age<=29){
        this.askedQuestions[this.askedQuestions.length-1].Age26To29++;
      }else  if (this.user.age>29){
        this.askedQuestions[this.askedQuestions.length-1].up30++;
      }
      console.log('User work',this.user.WorkExperience);
      //User's workExp
      if (this.user.WorkExperience=="שיווק"){
        console.log('שיווק');
        this.askedQuestions[this.askedQuestions.length-1].Marketing++;
      }else if (this.user.WorkExperience=="מלצרות"){
        this.askedQuestions[this.askedQuestions.length-1].Waitress++;
      }else if(this.user.WorkExperience=="מכירות"){
        this.askedQuestions[this.askedQuestions.length-1].Sales++;
      }else if(this.user.WorkExperience=="ללא נסיון"){
        this.askedQuestions[this.askedQuestions.length-1].inexperienced++;
      }
      //User's gender
      console.log('User gender',this.user.gender);
      if(this.user.gender=="זכר"){
        this.askedQuestions[this.askedQuestions.length-1].male++;
      }else if(this.user.gender==="נקבה"){
        this.askedQuestions[this.askedQuestions.length-1].female++;
      }

      this.dataService.updateSumUsersUnsweredYES(this.askedQuestions[this.askedQuestions.length-1].questionId,
                 this.askedQuestions[this.askedQuestions.length-1].Marketing,
                 this.askedQuestions[this.askedQuestions.length-1].inexperienced,
                 this.askedQuestions[this.askedQuestions.length-1].Waitress,
                 this.askedQuestions[this.askedQuestions.length-1].Sales,
                 this.askedQuestions[this.askedQuestions.length-1].Management,
                 this.askedQuestions[this.askedQuestions.length-1].female,
                 this.askedQuestions[this.askedQuestions.length-1].male,
                 this.askedQuestions[this.askedQuestions.length-1].Age18To21,
                 this.askedQuestions[this.askedQuestions.length-1].Age22To25,
                 this.askedQuestions[this.askedQuestions.length-1].Age26To29,
                 this.askedQuestions[this.askedQuestions.length-1].up30,(result)=>{
                   this.result=result;
        console.log('After answered Yes:',this.result);
      });
    }

    else if (content=="אולי") {
      numForAddTotal=0;
    }
    else if(content=="לא") {
      numForAddTotal=-1;
    }

    for (let t=0 ; t< this.totalSubEng.length; t++) {
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
     // this.timer = setTimeout(() => {
     //    this.resultAfterTyping = new Message (this.typing);
     //      this.messages.push(this.resultAfterTyping)
     //   $('html, #chat').animate({
     //          scrollTop: $("#chat").offset().top+ '100px'
     //        }, 10);
     //    this.timer = setTimeout(() => {
     //   this.messages.pop();
     // },1000);
    this.ChatAlgorithm();
      // },3000);
  }


getUserPosition(){
    this.flag=true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position)
      },(Error)=>{
         this.showError(Error); 
      });

    } else { 
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

showPosition(position) {
  this.myLocationLat =position.coords.latitude;
  this.myLocationLong = position.coords.longitude;
   console.log("myLocationLat",this.myLocationLat);
   console.log("myLocationLong",this.myLocationLong);
  var a:number[]=[]
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  this.dataService.getAllColleges((result) =>{
  this.DistanceFromMe=result;

    for(let i=0;i<this.DistanceFromMe.length;i++){
      a.push( 0.5 - c((this.DistanceFromMe[i].latitude - position.coords.latitude) * p)/2 +
        c(this.myLocationLat * p) * c(this.DistanceFromMe[i].latitude * p) * 
        (1 - c((this.DistanceFromMe[i].longitude - position.coords.longitude) * p))/2)
    }
    for(let j=0;j<this.DistanceFromMe.length;j++){
      this.DistanceFromMe[j].distanceKM=12742 * Math.asin(Math.sqrt(a[j]));
    }

  this.DistanceFromMe.sort(function(a, b){return a.distanceKM - b.distanceKM});
  console.log('colleges by distance',this.DistanceFromMe);

      let countElectronic=0;
      let countSoftware=0;
      let countManagement=0;
      let countBuilding=0;
      let countMedical=0;
      let countMachine=0;
      let countChemistry=0;

      for (let c=0; c<4; c++){ //Getting the 3 most closely traced 
        for (let s=0; s<this.DistanceFromMe[c].subEng.length; s++){
          if (this.DistanceFromMe[c].subEng[s] == 'הנדסת אלקטרוניקה'){
            countElectronic++;
          }
          else if (this.DistanceFromMe[c].subEng[s] == 'הנדסת תוכנה'){
            countSoftware++;
          }
          else if (this.DistanceFromMe[c].subEng[s] == 'הנדסת תעשייה וניהול'){
            countManagement++;
          }
          else if (this.DistanceFromMe[c].subEng[s] == 'הנדסת בניין'){
            countManagement++;
          }
          else if (this.DistanceFromMe[c].subEng[s] == 'הנדסה רפואית'){
            countMedical++;
          }
          else if (this.DistanceFromMe[c].subEng[s] == 'הנדסה כימית'){
            countChemistry++;
         }
          else if (this.DistanceFromMe[c].subEng[s] == 'הנדסת מכונות'){
            countMachine++;
         }
       }
    }
      this.subEngNearest.push(
                            new Subject('הנדסת אלקטרוניקה',countElectronic),
                            new Subject('הנדסת תוכנה',countSoftware)),
                            new Subject('הנדסת תעשיה וניהולת', countManagement),
                            new Subject('הנדסת בניין',countBuilding),
                            new Subject('הנדסה רפואית',countMedical),
                            new Subject('הנדסה כימית', countChemistry),
                            new Subject('הנדסת תעשיה וניהולת', countManagement);
      this.subEngNearest.sort(function(a, b){return b.total - a.total});
      this.maxWeight=this.subEngNearest[0];
      this.getQuestionFromSubEng();
    });
}

  showError(error) {
    this.getQuestionByDiff();

      // switch(error.code) {
      //     case error.PERMISSION_DENIED:
      //         //x.innerHTML = "User denied the request for Geolocation."
      //         break;
      //     case error.POSITION_UNAVAILABLE:
      //         //x.innerHTML = "Location information is unavailable."
      //         break;
      //     case error.TIMEOUT:
      //         //x.innerHTML = "The request to get user location timed out."
      //         break;
      //     case error.UNKNOWN_ERROR:
      //         //x.innerHTML = "An unknown error occurred."
      //         break;
      // }
  }

  goBack() {
    window.history.back();
}

}