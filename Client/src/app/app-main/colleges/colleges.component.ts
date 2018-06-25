import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Colleges } from '../../model/Colleges.model';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from '../../model/subject.model';
import { CurrentColleges } from '../../app-shared/current-college';
import { CurrentUser } from '../../app-shared/current-user';

import { Router } from '@angular/router';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {


  colleges:Colleges[]=[];
  DistanceFromMe:Colleges[]=[];
  myform: FormGroup;
  cChoosed:Colleges;
  myLocationLat:number;
  myLocationLong:number;
  extend:boolean=false;
  userID:string;
  checkLike:boolean;
  favoriteColleges:string[]=[];
  extend:boolean=false;

  locations: string[] = [
    'מרכז',
    'שרון',
    'ירושלים',
    'דרום',
    'שומרון',
    'צפון'
  ]  

  institute: string[] = [
    'אוניברסיטה',
    'מכללה'
  ]
  
  subEngs: string[] = [
    'הנדסת כימיה',
    'הנדסת תוכנה',
    'הנדסת אלקטרוניקה',
    'הנדסת מכונות',
    'הנדסת בניין',
    'הנדסת תעשייה וניהול',
    'הנדסה רפואית'
  ]  

  salary: string[] = [
    'שכ"ל אוניברסיטאי',
    'ללא שכ"ל אוניברסיטאי'
  ]

  dorms: string[] = [
    'קיום מעונות',
    'ללא מעונות'
  ]

  psychometric: string[]= [
    'יש',
    'אין'
  ]

  math: string[]= [
    '3',
    '4',
    '5'
  ]

  english: string[]= [
    '3',
    '4',
    '5'
  ]

  physics: string[]= [
    '3',
    '4',
    '5'
  ]

  constructor(private dataService:DataService,
              private modalService: NgbModal,
              private alertConfig: NgbAlertConfig,
              private router:Router ,
              private currentCollegeService:CurrentColleges,
              private currentUserService:CurrentUser) { }


  ngOnInit() {

    this.myform = new FormGroup({
       'location': new FormControl(),
       'subEng':new FormControl(),
       'institute':new FormControl(),
       'salary':new FormControl(),
       'dorms':new FormControl(),
       'psychometric':new FormControl(),
       'psychometricGrade': new FormControl(),
       'mathUnits':new FormControl(),
       'mathGrade':new FormControl(),
       'englishUnits':new FormControl(),
       'englishGrade':new FormControl(),
       'physicsUnits':new FormControl(),
       'physicsGrade':new FormControl()
    });

    this.dataService.getAllColleges((result) =>{
        this.colleges=result;
        //this.distance(result);

    this.userID=this.currentUserService.getCurrentUser()._id;

    this.dataService.getFavoriteUserId(this.userID,result=>{
                if(result) {
                  this.favoriteColleges= result.liked;
                  this.setFavoriteColleges();
                }
                else  console.log('error');           
            });
    });

  }

  setFavoriteColleges(){
    for(let i=0; i<this.favoriteColleges.length; i++){
      for(let j=0; j<this.colleges.length; j++){
        console.log(this.favoriteColleges[i],this.colleges[j].hebName);
        if(this.favoriteColleges[i] == this.colleges[j].hebName){
            this.colleges[j].liked=true;
        }
      }
    }

  }

  getUserLocation(result) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position,result);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


showPosition(position,result) {
    this.myLocationLat = position.coords.latitude;
    this.myLocationLong = position.coords.longitude;
    console.log("myLocationLat",this.myLocationLat);
    console.log("myLocationLong",this.myLocationLong);
    this.distance(result);
  }



    distance(result){
      var a:number[]=[]
      var x:Colleges[]=[]
      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;

      for(let i=0;i<result.length;i++){
        a.push( 0.5 - c((result[i].latitude - this.myLocationLat) * p)/2 + 
              c(this.myLocationLat * p) * c(result[i].latitude * p) * 
              (1 - c((result[i].longitude - this.myLocationLong) * p))/2)
      }

      for(let j=0;j<result.length;j++){
        result[j].distanceKM=12742 * Math.asin(Math.sqrt(a[j]));
        this.DistanceFromMe.push(result[j]);
        //x.push(new Subject(result[j].hebName,12742 * Math.asin(Math.sqrt(a[j]))))
      }

     this.DistanceFromMe.sort(function(a, b){return a.distanceKM - b.distanceKM});
     console.log('colleges by distance',this.DistanceFromMe);
     this.colleges=this.DistanceFromMe;
  }

  openMap(content) {
    this.alertConfig.dismissible = false;
    this.modalService.open(content,{ centered: true });
  }


  filter(post){
    this.dataService.filterColleges(post.location,
                        post.subEng,
                        post.dorms,
                        post.salary,
                        post.institute,result=>{
                console.log(`response=${result}`);
                if(result){
                  this.colleges = result;
                  this.setFavoriteColleges();
                  for (let c=0; c<this.colleges.length; c++){
                    let psychometryPercent= post.psychometricGrade/this.colleges[c].psychometry;
                    if (psychometryPercent>1) psychometryPercent=1;
                    
                    let mathPercent=0;
                    for(let m=0;m<this.colleges[c].mathGrades.length;m++){
                      if(this.colleges[c].mathGrades[m].units==0){
                        mathPercent=1;
                      }
                      else{
                        if(post.mathUnits==this.colleges[c].mathGrades[m].units){
                          mathPercent=post.mathGrade/this.colleges[c].mathGrades[m].grade;
                        }
                      }
                    }

                    let engPercent=0;
                    for(let e=0; e<this.colleges[c].engGrades.length; e++){
                      if(this.colleges[c].engGrades[e].units==0){
                        engPercent=1;
                      }
                      else{
                        if(post.englishUnits==this.colleges[c].engGrades[e].units){
                          engPercent=post.englishGrade/this.colleges[c].engGrades[e].grade;
                        }                        
                      }
                    }

                    let physPercent=0;
                    for(let p=0; p<this.colleges[c].physicsGrades.length; p++){
                      if(this.colleges[c].physicsGrades[p].units==0){
                        physPercent=1;
                      }
                      else{
                        if(post.physicsUnits==this.colleges[c].physicsGrades[p].units){
                          physPercent=post.physicsGrade/this.colleges[c].physicsGrades[p].grade;
                        }
                      }
                    }
                    console.log(psychometryPercent,mathPercent,engPercent,physPercent)
                    this.colleges[c].userProbability=0.25*psychometryPercent+0.25*mathPercent+0.25*engPercent+0.25*physPercent;
                    if(this.colleges[c].userProbability>1){
                      this.colleges[c].userProbability=0.99
                    }
                    this.colleges[c].userProbability=Math.round(this.colleges[c].userProbability*100);
                    //this.colleges[c].userProbability.toFixed(2);
                    console.log(this.colleges[c].hebName,this.colleges[c].userProbability) 
                  }  
                } 
                else  console.log('filter error');           
            })
  };

  intoCollege(c) {
      this.cChoosed=c;
      this.currentCollegeService.change(c);
      console.log("intoCollege-->");
      console.log(c);
      this.router.navigateByUrl('/intoCollege');
  }

  ExtendedFilter(){
    if(this.extend == false) this.extend=true;
    else this.extend=false;
  }

  liked(c){
    this.currentCollegeService.change(c);
    console.log(this.currentCollegeService.getCurrentColleges().hebName);
    console.log(this.currentCollegeService.getliked());
    this.checkLike = this.currentCollegeService.getliked();
    if(this.checkLike == null) {
      this.currentCollegeService.setliked(false);
      console.log('like null->false');
      this.checkLike=false;
    }
    console.log(this.currentCollegeService.getliked());

    if(this.checkLike == false){
      this.currentCollegeService.setliked(true);
      this.dataService.favoriteColleges(this.userID,c.hebName,result=>{
          console.log(`response=${result}`);
          if(result) console.log('favorite done');
          else  console.log('favorite error');           
        });
    }
    else{
      this.currentCollegeService.setliked(false);
      this.dataService.unFavoriteColleges(this.userID,c.hebName,result=>{
          console.log(`response=${result}`);
          if(result) console.log('unfavorite done');
          else  console.log('unfavorite error');           
        });
    }
  }


}
