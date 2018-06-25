export class LikedByUser {
    public userID: string;
    public liked: [string];

    constructor(userID:string,liked: [string]){
        this.userID = userID;
        this.liked=liked;
    }
}
