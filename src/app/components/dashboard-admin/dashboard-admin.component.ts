import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
tab : any;
users: any;
plats: any;
adminClients: any = [];
chefs: any = [];
  constructor(private router :Router,
              private userService : UserService,
              private platService : PlatService ) { }

  ngOnInit() {
  // this.users = JSON.parse(localStorage.getItem("users") || "[]");
  this.userService.getUsers().subscribe((data)=>{
    console.log(data.users);
    this.users = data.users;
   // for (let i = 0; i < this.users.length; i++) {
    //   if ( (this.users[i].role == "admin") || (this.users[i].role == "client") ) {
    //     this.adminClients.push(this.users[i])
    //   } else{
    //     this.chefs.push(this.users[i]);
    //   }
      
    // }
})

this.platService.getPlats().subscribe((data)=>{
  console.log(data.plats);
  this.plats = data.plats;
// for (let i = 0; i < this.users.length; i++) {
//   if ( (this.users[i].role == "admin") || (this.users[i].role == "client") ) {
//     this.adminClients.push(this.users[i])
//   } else{
//     this.chefs.push(this.users[i]);
//   }
  
// }
// for (let i = 0; i < this.plats.length; i++) {
//   let chef = this.searchById(this.plats[i].idChef, this.users);
//   console.log(chef);
  
//   this.plats[i].chefName = chef.firstName + ' ' + chef.lastName ;
  
// }

})




  // this.plats = JSON.parse(localStorage.getItem("plats") || "[]");

 



  this.tab = JSON.parse(localStorage.getItem("tab") || "[]");
// 


 




  }


  displayUser(id:any){
    this.router.navigate([`displayUser/${id}`]);
  }

  editUser(id:any, role:any){
    if (role == 'admin' || role == 'client') {
      this.router.navigate([`editUser/${id}`]);
    } else {
      this.router.navigate([`editChef/${id}`]);
    }
   
  }

  // deleteUser(id:any){
  
  //   let pos;
  //   for (let i = 0; i < this.users.length; i++) {
      
  //       if (this.users[i].id == id) {  
  //         pos = i;
  //       }
  //     }
       

      
  //     if (confirm ("Do you want delete this User")) {
  //       if (this.users[pos].role == "chef") {

  //         for (let i = 0; i < this.plats.length; i++) {
  //          if (this.plats[i].idChef != id) {           
  //            this.tab.push(this.plats[i]); 
  //          }
  //         }
  //         localStorage.setItem("plats", JSON.stringify(this.tab)); 
  //       }
  //         this.users.splice(pos,1);
  //       localStorage.setItem("users", JSON.stringify(this.users));
      
        
  //     }
     
  //     }


  deleteUser(id:any){
    this.userService.deleteUser(id).subscribe(
(data)=> {
  console.log(data.message);
  
  //Refresh Table without Reloading
  this.userService.getUsers().subscribe(
    (data)=>{
      this.users = data.users
    }
  )
}

    )
  }

  // editChef(id:any){
  //       this.router.navigate([`editChef/${id}`]);
  //     }


  searchById(id,key){
    let tab = JSON.parse(localStorage.getItem(key) || "[]" );
    let obj;
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].id == id) {
        obj =tab[i];
        
      } 
    }
    return obj;
  }
  
getColor(role){
  switch (role) {
    case 'admin':
      return 'green'
      break;
  
      case 'client':
        return 'blue'
      break;
  
      case 'chef':
        return 'red'
      break;
  }
}


getPdf(){
  this.userService.getPdf().subscribe(
  (data)=>{
  console.log(data.message);
  })
  }
  


  }



