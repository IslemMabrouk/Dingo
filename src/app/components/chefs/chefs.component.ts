import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
users:any;
chefs :any = [];
  constructor() { }

  ngOnInit() {
    //Etape 1 : Importation des chefs du Localstorage
    this.users = JSON.parse(localStorage.getItem('users') || "[]")

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].role == "chef") {
        this.chefs.push(this.users[i]);
        
      }
      
    }

    console.log("tab",this.chefs);
    


  }

  update(e){
    this.users = e;
  }


}
