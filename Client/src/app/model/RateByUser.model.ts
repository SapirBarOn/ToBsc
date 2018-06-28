export class RateByUser {
    public userID: string;
    public rate: [[{'college':string,'numOfStars':number}]];
    constructor(userID:string,rate: [[{'college':string,'numOfStars':number}]]){
        this.userID = userID;
        this.rate=rate;
    }
}
