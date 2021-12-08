import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
//Déclaration des variables avant le constructeur

//Etape1
user : any={}; // any t5alih ya5ou ay type

//Etape2
addAdminForm : FormGroup;
id : any;
users : any;
title : string;
//Etape3
  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute,
              private userService : UserService) { } //Private t5dem bih kn fil"addAdmin"

//Etape4 (na3mlou blassa lilinput fil formroup)
  ngOnInit() {
   this.addAdminForm = this.formBuilder.group({
     firstName : [''],
     lastName : [''],
     email : [''],
     password : [''],
     confirmPassword : [''],
     phone : [''],
     role : ['']
   })

   this.id = this.activatedRoute.snapshot.paramMap.get('id');
   console.log('id',this.id);
   
   if (this.id ) {
     // Edit

     //:::::::Localsorage:::::://

      this.title = "Edit User"

      // this.users = JSON.parse(localStorage.getItem("users") || "[]");
      // for (let i = 0; i < this.users.length; i++) {
      //   if (this.users[i].id == this.id) {
      //     this.user = this.users[i]; 
      //   }
        
      // } 
//:::::::API fake:::::://

      this.userService.getUser(this.id).subscribe(
        (data)=>{
          this.user = data.user;
        }
      )

   } else {
     // Add
      this.title = "Add Admin"

   }


  }

  //Déclaration du fonction
  addAdmin(){
    if (this.id) {
        //Edit 

        //:::::::Localsorage:::::://

  // for (let i = 0; i < this.users.length; i++) {
  //   if (this.users[i].id == this.id) {
  //     this.users[i] = this.user;
      
  //   }
    
  // }    
  //  localStorage.setItem("users", JSON.stringify(this.users));

  //:::::::API fake:::::://

  this.userService.updateUser(this.user).subscribe(
    (data)=>{
      console.log(data.message);     
    }
  )

    } else {
        //Add 



        //:::::::Localsorage:::::://

  //   console.log(this.user);

    this.user.role = "admin";
  // console.log(this.user);

  // let idUser =  JSON.parse(localStorage.getItem("idUser") || "1");
  // this.user.id = idUser;

  // let users = JSON.parse(localStorage.getItem("users") || "[]");
  
  // users.push(this.user);

  // localStorage.setItem("users",JSON.stringify(users));

  // localStorage.setItem("idUser" , idUser + 1);


       //:::::::API fake:::::://

    this.userService.createUser(this.user).subscribe(
      (data)=>{
        console.log(data.message);
        
      }
    )
    
  }
}
}