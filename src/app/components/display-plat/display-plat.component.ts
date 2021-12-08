import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';


@Component({
  selector: 'app-display-plat',
  templateUrl: './display-plat.component.html',
  styleUrls: ['./display-plat.component.css']
})
export class DisplayPlatComponent implements OnInit {
  id : any;
  plat : any;
  constructor( private activatedRoute : ActivatedRoute,
    private platService : PlatService) { }

  ngOnInit() {
  //Récupération de l'id à partir de pat actuel
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  console.log(this.id);

  this.platService.getPlat(this.id).subscribe(
    (data)=>{
      this.plat = data.plat
      console.log(this.plat);
    
    })
  }
}
