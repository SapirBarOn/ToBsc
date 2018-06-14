import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Colleges } from '../../model/Colleges.model';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from '../../model/subject.model';

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



  constructor(private dataService:DataService,
              private modalService: NgbModal,
              private alertConfig: NgbAlertConfig) { }

  ngOnInit() {
     
    this.dataService.getAllColleges((result) =>{
        this.colleges=result;
        console.log(this.colleges);      
        this.distance(result);
    });


    this.myform = new FormGroup({
       'location': new FormControl(),
       'subEng':new FormControl(),
       'institute':new FormControl(),
       'salary':new FormControl(),
       'dorms':new FormControl()
    });


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
                if(result) this.colleges = result;
                else  console.log('filter error');           
            })
  };


  openInfo(content,c) {
    this.cChoosed=c;
    this.alertConfig.dismissible = false;
    this.modalService.open(content,{ centered: true });
  }
}
