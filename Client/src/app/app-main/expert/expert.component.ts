import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import  {DataService} from '../../data.service';
import  {Question} from '../../model/Qustion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {

  questions:Question[]=[];
  Qchoosed:Question;

  choosedUpdate:boolean=false;
  choosedCreate:boolean=false;

    //for Add question
    @ViewChild('question') questionInputRef : ElementRef;
    @ViewChild('Wchemistry') WchemistryInputRef : ElementRef;
    @ViewChild('Wsoftware') WsoftwareInputRef : ElementRef;
    @ViewChild('Welectronic') WelectronicInputRef : ElementRef;
    @ViewChild('Wmedical') WmedicalInputRef : ElementRef;
    @ViewChild('Wmanagement') WmanagementInputRef : ElementRef;
    @ViewChild('Wbuilding') WbuildingInputRef : ElementRef;
    @ViewChild('Wmachine') WmachineInputRef : ElementRef;

    //for Update question
    @ViewChild('q') qInputRef : ElementRef;
    @ViewChild('Wchem') WchemiInputRef : ElementRef;
    @ViewChild('Wsoft') WsoftInputRef : ElementRef;
    @ViewChild('Welectro') WelectroInputRef : ElementRef;
    @ViewChild('Wmedic') WmedicInputRef : ElementRef;
    @ViewChild('Wmanage') WmanageInputRef : ElementRef;
    @ViewChild('Wbuild') WbuildInputRef : ElementRef;
    @ViewChild('Wmac') WmachInputRef : ElementRef;

  constructor(private dataService : DataService) { }

  ngOnInit() {

    this.dataService.allQuestions((result) =>{
        this.questions=result;
        console.log(this.questions);      

    });

  }

  chooseForUpdate(q){
    if (this.chooseForCreate)   this.choosedCreate=false;
    this.choosedUpdate=true;
    this.Qchoosed=q;
    console.log(this.Qchoosed.questionData);    
  }


  chooseForCreate(){
    if (this.choosedUpdate) this.choosedUpdate = false;
    this.choosedCreate=true;
  }


  update(){
    console.log(`Qid= ${this.Qchoosed.questionId}`);    
    console.log(`qInputRef= ${this.qInputRef.nativeElement.value}`);

    this.dataService.updateQuestion(this.Qchoosed.questionId,
                        this.qInputRef.nativeElement.value,
                        this.WchemiInputRef.nativeElement.value,
                        this.WsoftInputRef.nativeElement.value,
                        this.WelectroInputRef.nativeElement.value,
                        this.WmedicInputRef.nativeElement.value,
                        this.WmanageInputRef.nativeElement.value,
                        this.WbuildInputRef.nativeElement.value,
                        this.WmachInputRef.nativeElement.value,result=>{
      console.log(`response=${result}`);
      if(result == "data update"){
        document.getElementById('res').innerHTML="העדכון בוצע בהצלחה";
        this.ngOnInit();
        // this.popup.show();
      }
      else{
        document.getElementById('res').innerHTML='ישנה שגיאה,אנא נסה שנית';
      }              

  });
    

  }

  delete(q){
    this.dataService.deleteQuestion(q.questionId,result=>{
                          if(result == "question deleted"){
                              this.ngOnInit();
                          }        
    });
  }


  createQuestion(){
    this.dataService.createQuestion(this.questions.length,
    this.questionInputRef.nativeElement.value,
    this.WchemistryInputRef.nativeElement.value,
    this.WsoftwareInputRef.nativeElement.value,
    this.WelectronicInputRef.nativeElement.value,
    this.WmedicalInputRef.nativeElement.value,
    this.WmanagementInputRef.nativeElement.value,
    this.WbuildingInputRef.nativeElement.value,
    this.WmachineInputRef.nativeElement.value,result=>{
                console.log(`response=${result}`);
                if(result == "data saved"){
                    this.ngOnInit();
                }            
            })
        };

  }

