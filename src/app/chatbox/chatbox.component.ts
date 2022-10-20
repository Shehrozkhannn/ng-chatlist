import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  defaultId = 1;
  userId :any;
  value:any;
  chatInput : any;
  // chatList = [
  //   {
  //     id : 1,
  //     message:"Hello there",
  //     name : "Lesnar",
  //     image : "../../assets/user1.jpg",
  //     date: new Date()
  //   },
  //   {
  //     id : 2,
  //     message:"Hi",
  //     name : "James",
  //     image : "../../assets/user2.jpg",
  //     date: new Date()
  //   },
  //   {
  //     id : 3,
  //     message:"Perfectly fine",
  //     name : "Emily",
  //     image : "../../assets/user3.jpg",
  //     date: new Date()
  //   },
  // ];
  chatList : any = [];
  allData:any
  constructor(private router : Router , public authService : AuthService) {
   }
  ngOnInit(): void {  
    this.allData = this.chatList;
    this.authService.getMessages().subscribe((data)=>{
      this.chatList = data.map((e: any)=>{
        e.payload.doc.data()['date'] = new Date(e.payload.doc.data()['date']);
        const newData = {...e.payload.doc.data(), id: e.payload.doc.id }
        return newData;
      })
      console.log(this.chatList);
    })
    // console.log(this.chatList);
    this.userId = localStorage.getItem('id');
    
    
    
  }
  addInTheList(text:any){
    // let user: any = this.chatList.find((item:any) => item.id === this.defaultId);
    // user = {...user, message: text.value, date: new Date()};
    // this.chatList.push(user);
    // this.allData = this.chatList;
    // text.value = "";
    // if(this.defaultId === 3) {
    //   this.defaultId = 1;
    // } else {
    //   this.defaultId = this.defaultId + 1;
    // }
     const newMessage = {
      userId: this.userId,
      message: text.value,
      date: new Date().toString(),
      image : '../../assets/user1.jpg' 
     }
     console.log(newMessage);
     
    this.authService.addMessage(newMessage).then(res => {
      this.chatInput = "";
    }).catch(error => {
      console.log(error);
      
    })
  }
  showUserDetails(user:any){
    this.router.navigate(["/userDetails/" + user.id ], {queryParams: {data: JSON.stringify(user)}});
  }
  deleteTheMsg(id :any){ 
    // let userMessage = this.chatList[index].message;
    // console.log(userMessage);
    // this.chatList = this.chatList.filter((el:any)=> userMessage !== el.message);
    this.authService.deleteMessage(id);
  }

  search(filterValue:any){
    this.value = filterValue.value;
    this.chatList = this.allData.filter((item:any)=> item.message.toLowerCase().startsWith(this.value));
  } 
}
