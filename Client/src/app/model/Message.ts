export class Message {
  content: string;
  img:string;
  time:number
  constructor(content: string,img:string,time:number){
    this.content = content;
    this.img=img;
    this.time=time;
  }
}