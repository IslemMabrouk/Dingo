import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { title } from 'process';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.css']
})
export class AddChefComponent implements OnInit {
  //Déclaratipn des variables Globales (avant le constructeur)
  //Etape1
  
  chef : any={}; // any t5alih ya5ou ay type
   id : any;
   title : string;
   users : any;
//Etape2
  addChefForm : FormGroup;
//Etape3 
  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute, private userService : UserService) { }   //Private t5dem bih kn fil"addAdmin"

//Etape4 (na3mlou blassa lilinput fil formroup)  
  ngOnInit() {
    this.addChefForm= this.formBuilder.group({
     firstName : [''],
     lastName : [''],
     email : [''],
     password : [''],
     speciality : [''],
     experience : [''],
     dateOfBirth : ['']
    })
  this.id = this.activatedRoute.snapshot.paramMap.get('id');

   if (this.id) {
     //Edit
     this.title = "Edit Chef"
     this.userService.getUser(this.id).subscribe(
       (data) =>{
         this.chef = data.user;
       }
     )
    //  this.users = JSON.parse(localStorage.getItem("users") || "[]")

    //  for (let i = 0; i < this.users.length; i++) {
    //    if (this.users[i].id == this.id) {
    //      this.chef = this.users[i];
    //    }
       
    //  }
   
    
  } else {
    //Add
    this.title = "Add Chef"
  }


  }



  addChef(){
    if (this.id) {
      //Edit

      this.userService.updateUser(this.chef).subscribe(
        (data) =>{
          console.log(data.message);
          
        }
      )
  // for (let i = 0; i < this.users.length; i++) {
  //   if (this.users[i].id == this.id) {
  //     this.users[i] = this.chef;
      
  //   }
    
  // }
  // localStorage.setItem("users", JSON.stringify(this.users));
    
  // console.log(this.chef);

} else {
  //Add 
  this.chef.role = "chef";


  // let idChef =  JSON.parse(localStorage.getItem("idUser") || "1");
  // this.chef.id = idChef;

  // let users = JSON.parse(localStorage.getItem("users") || "[]");
  
  // users.push(this.chef);

  // localStorage.setItem("users",JSON.stringify(users));

  // localStorage.setItem("idUser" , idChef + 1);
  this.userService.createUser(this.chef).subscribe(
    (data)=>{
      console.log(data.message);
      
    }
  )


}
}
}
