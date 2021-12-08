import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user :any={};
  loginForm : FormGroup;
  findedUser : any;
  
  constructor(private fb : FormBuilder, private router : Router, private userService : UserService) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email : [''],
      password : [''],
    })
  }

// login(){
// let users = JSON.parse(localStorage.getItem("users") || "[]");

// for (let i = 0; i < users.length; i++) {
//   if ( (users[i].email == this.user.email ) && (users[i].password == this.user.password) ){
//     this.findedUser = users[i];
//   }
  
//   console.log(this.findedUser);

//   if (this.findedUser) {
//     //Sauvegarde dans LS
//     localStorage.setItem("connectedUser", JSON.stringify(this.findedUser) )
//       switch (this.findedUser.role) {
//         case 'admin':
//           this.router.navigate(['dashboardAdmin'])
//           break;
//         case 'client':
//           this.router.navigate([''])
//           break;
//           case 'chef':
//             this.router.navigate(['dashboardChef'])
//             break;
        
      
//         default:
//           break;
//       }
//   }
  
// }

// }

login(){
this.userService.login(this.user).subscribe(
  (data)=>{
    console.log("findedUser",data.findedUser);
    
    if (data.findedUser.role) {
      localStorage.setItem("connectedUser", JSON.stringify(data.findedUser));
      //Redirection
      switch (data.findedUser.role) {
        case 'admin':
          this.router.navigate(['dashboardAdmin'])
          break;
        
        case 'client':
          this.router.navigate([''])
           break;

        case 'chef':
          this.router.navigate(['dashboardChef'])
          break;
      
        default:
          break;
      }
      
    }

  }
)
}



}
