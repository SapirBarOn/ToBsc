import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../model/user.model';

@Injectable()
export class CurrentUser{

    currentUser:User ;

    constructor(){}

    change(user:User){
        this.currentUser = user;
        console.log(this.currentUser);
    }

    getCurrentUser(){
        return this.currentUser;
    }

}