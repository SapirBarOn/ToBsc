import { Component, OnInit } from '@angular/core';
import {CurrentColleges} from '../../app-shared/current-college';
import {CurrentUser} from '../../app-shared/current-user';
import { User } from '../../model/user.model';
import { DataService } from '../../data.service';
import { Colleges } from '../../model/Colleges.model';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent implements OnInit {
favoriteColleges:string[]=[];
user:User;
myCollges:Colleges[]=[];
  constructor(private dataService : DataService,
              private currentUserService : CurrentUser,
              private CurrentCollegesService:CurrentColleges) { }

  ngOnInit() {
      this.CurrentCollegesService.setAllColleges();
      this.user=this.currentUserService.getCurrentUser();
        this.getfavorite();
  }
   getfavorite(){
        this.dataService.getFavoriteUserId(this.user.getId(),result=>{
                console.log(`response=${result}`);
                if(result) {
                  this.favoriteColleges= result.liked;
                  console.log('this.favoriteColleges-->');
                  console.log(this.favoriteColleges);
                    this.dataService.getAllColleges((result) =>{
                      console.log(result);
                      for(let i=0;i<result.length;i++){
                           for(let j=0;j<this.favoriteColleges.length;j++){
                             if(result[i].hebName==this.favoriteColleges[j]){
                              console.log(result[i].hebName);
                               this.myCollges.push(result[i]);
                               console.log(this.myCollges);
                             }
                            }
                      }
                    });

                }
                else  console.log('error');           
            });

  }
  openColleges(c){
    console.log("openColleges!!!!!!!!!!!!!!!!");
    console.log(c);
    this.CurrentCollegesService.check(c);
  }
}
