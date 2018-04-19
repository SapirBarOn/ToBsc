import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../model/user.model';

@Injectable()
export class CurrentUser{
    currentUser:User ;
    availableVar:boolean;

    constructor(){
        this.availableVar = false;
    }
    updateId(id:string){
        this.currentUser.setId(id);
    }
    change(user:User){
        // console.log(`change(${user.getId()})`);
        // this.currentUser.next(user);
        this.currentUser = user;
        // this.currentUser.setId(user.getId);
        // console.log(`change(${this.currentUser.getId()})`);
    }

    available(){
        this.availableVar = true;
    }

    getAvailable(){
        return this.availableVar;
    }
    getCurrentUser(){
        return this.currentUser;
    }
}