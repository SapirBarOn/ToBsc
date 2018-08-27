import { Injectable, EventEmitter } from '@angular/core';
import { Question } from '../model/Qustion.model';

@Injectable()
export class CurrentQuestion{

    currentQuestion:Question ;

    constructor(){}

    change(question:Question){
        this.currentQuestion = question;
        console.log(this.currentQuestion);
    }

    getCurrentQuestion(){
        return this.currentQuestion;
    }

}