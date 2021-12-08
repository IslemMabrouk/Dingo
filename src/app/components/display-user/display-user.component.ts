import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
  id : any;
  user : any;
  constructor(private activatedRouter : ActivatedRoute,
              private userService : UserService) { }
    
  ngOnInit() {
  //Récupération de l'id à partir de pat actuel
  this.id = this.activatedRouter.snapshot.paramMap.get('id');
  console.log(this.id);

  // let users = JSON.parse(localStorage.getItem("users") || "[]");

    // for (let i = 0; i < users.length; i++) {
    //   if (users[i].id == this.id) {
    //     this.user = users[i];
    //   }
      
    // }
  


    this.userService.getUser(this.id).subscribe(
      (data)=>{
        this.user = data.user;
        console.log(this.user);

      }
    )
    
  }

}
