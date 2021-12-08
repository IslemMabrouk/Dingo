import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from '../confirmPwd';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
user :any;
title = "newSite";
image = "assets/img/logo.png";

signupForm : FormGroup;
  constructor(private fb : FormBuilder,  private userService : UserService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName : ['',[Validators.minLength(3),Validators.required]],
      lastName : ['',[Validators.minLength(5),Validators.required]],
      email : ['',[Validators.email,Validators.required]],
      password : ['',[Validators.minLength(8),Validators.required]],
      confirmPassword : ['',[Validators.required]],
      phone : ['',[Validators.minLength(8),Validators.maxLength(13),Validators.required]]
    },

    {
      validator: MustMatch('password','confirmPassword')
      }
    );
  }

signup(s:any){
// console.log(s);

// let idUser =  JSON.parse(localStorage.getItem("idUser") || "1");


// s.id = idUser;
s.role = "client";

// let users = JSON.parse(localStorage.getItem("users") || "[]");

// users.push(s);

// localStorage.setItem("users",JSON.stringify(users));

// localStorage.setItem("idUser" , idUser + 1);
 
// }

this.userService.createUser(s).subscribe(
  (data)=>{
    console.log(data.message);
    
  }
)


}
}
