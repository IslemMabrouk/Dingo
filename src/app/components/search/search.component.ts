import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
chef : any ={};
searchForm : FormGroup;
isDisplay : any;
chefs : any;
  constructor( private fb : FormBuilder,
               private userService : UserService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchValue : ['']
    })
  }



search(){
  
  this.userService.searchChef(this.chef).subscribe(
    (data) => {
      console.log(data.chefs);
      this.isDisplay = !this.isDisplay;
      this.chefs = data.chefs;
      
    }
  )

}


}
