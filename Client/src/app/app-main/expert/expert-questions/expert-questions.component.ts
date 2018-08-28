import { Component, OnInit , Input } from '@angular/core';
import { DataService } from '../../../data.service';
import { Question } from '../../../model/Qustion.model';
import { Router } from '@angular/router';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig ,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentQuestion } from '../../../app-shared/current-question';
declare var $:any;

@Component({
  selector: 'app-expert-questions',
  templateUrl: './expert-questions.component.html',
  styleUrls: ['./expert-questions.component.css']
})
export class ExpertQuestionsComponent implements OnInit {

    modalReference:NgbModalRef= null;     
    alertMassege:string;

    questions:Question[]=[];
    Qchoosed:Question;
    closeResult: string;

    rForm: FormGroup;
    post:any;          // A property for our submitted form
    question:string;
    Wchemistry:number;
    Wsoftware:number;
    Welectronic:number;
    Wmedical:number;
    Wmanagement:number;
    Wbuilding:number;
    Wmachine:number;

     @Input() public alerts: Array<string> = [];

  constructor(private dataService : DataService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private alertConfig: NgbAlertConfig,
              private router:Router,
              private currentQuestionService:CurrentQuestion) {

     alertConfig.type = 'success';
     alertConfig.dismissible = false;
   }

  ngOnInit() {

    this.dataService.allQuestions((result) =>{
        this.questions=result;
        console.log(this.questions);      

    });

    this.rForm = this.fb.group({
      'question': [null],
      'Wchemistry': [null],
      'Wsoftware': [null],
      'Welectronic': [null],
      'Wmedical': [null],
      'Wmanagement': [null],
      'Wbuilding': [null],
      'Wmachine': [null]
    });
  }


  openAdd(content) {
    this.alertConfig.dismissible = false;
    this.modalReference=this.modalService.open(content,{ centered: true });
  }

  addPost(post) {
    this.question = post.question;
    this.Wchemistry = post.Wchemistry;
    this.Wsoftware = post.Wsoftware;
    this.Welectronic = post.Welectronic;    
    this.Wmedical = post.Wmedical;
    this.Wmanagement = post.Wmanagement;
    this.Wbuilding = post.Wbuilding;
    this.Wmachine = post.Wmachine;
    this.createQuestion();
    this.modalReference.close();
    this.alertMassege="השאלה נוספה בהצלחה";
    $(".alert").show();
  }


  openUpdate(content,q) {
    this.alertConfig.dismissible = false;
    this.Qchoosed=q;
    this.modalReference=this.modalService.open(content,{ centered: true });
  }

  updatePost(post) {
    this.question = post.question;
    this.Wchemistry = post.Wchemistry;
    this.Wsoftware = post.Wsoftware;
    this.Welectronic = post.Welectronic;    
    this.Wmedical = post.Wmedical;
    this.Wmanagement = post.Wmanagement;
    this.Wbuilding = post.Wbuilding;
    this.Wmachine = post.Wmachine;
    console.log("updatePost---->>");
    console.log(post.question,post.Wchemistry,post.Wsoftware);
    this.update();
    this.modalReference.close();
    this.alertMassege="השאלה עודכנה בהצלחה";
    $(".alert").show();
  }

  openDelete(content,q) {
    this.alertConfig.dismissible = false;
    this.Qchoosed=q;
    this.modalReference=this.modalService.open(content,{ centered: true });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  update(){
    this.dataService.updateQuestion(this.Qchoosed.questionId,
                                    this.question,
                                    this.Wchemistry,
                                    this.Wsoftware,
                                    this.Welectronic,    
                                    this.Wmedical,
                                    this.Wmanagement,
                                    this.Wbuilding,
                                    this.Wmachine,result=>{
      console.log(`response=${result}`);
      if(result == "data update"){
        this.alertConfig.dismissible=true;
        this.ngOnInit();
      }        
    });
  }

  delete(){
    this.dataService.deleteQuestion(this.Qchoosed.questionId,result=>{
                          if(result == "question deleted"){
                              this.alertConfig.dismissible=true;
                              this.ngOnInit();
                          }        
    });
    this.modalReference.close();
    this.alertMassege="השאלה נמחקה בהצלחה";
    $(".alert").show();
  }


  createQuestion(){
    this.questions.length++;
    this.dataService.createQuestion(this.questions.length,
                                    this.question,
                                    this.Wchemistry,
                                    this.Wsoftware,
                                    this.Welectronic,    
                                    this.Wmedical,
                                    this.Wmanagement,
                                    this.Wbuilding,
                                    this.Wmachine,result=>{
                console.log(`response=${result}`);
                if(result == "data saved"){
                    this.alertConfig.dismissible=true;
                    this.ngOnInit();
                }          
            })
   };
 
  openChart(q){
      this.currentQuestionService.change(q);
      this.router.navigateByUrl('/chart-pie');
  }



}


