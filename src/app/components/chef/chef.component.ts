import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
//Etape 2 Déclaration de la variable @Input
@Input() childChef : any;
@Output() newchefs = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }


delete(id:any){
  let allchefs = JSON.parse(localStorage.getItem("users") || "[]");
  let pos;
  for (let i = 0; i < allchefs.length; i++) {
    if (allchefs[i].id == id) {
      pos = i;
    }
  }
  allchefs.splice(pos,1);
  localStorage.setItem("users", JSON.stringify(allchefs) );
  
  //Declanchement de l'evenement
  this.newchefs.emit(allchefs);
}


}
