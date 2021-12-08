import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-dashboard-chef',
  templateUrl: './dashboard-chef.component.html',
  styleUrls: ['./dashboard-chef.component.css']
})
export class DashboardChefComponent implements OnInit {

  id : any;
  title : any;
  plat : any={};
  plats:any;
  addPlatForm : FormGroup;
  connectedUser;
  myPlats : any=[];
  messageAdd : any;
  imagePreview : any;

  constructor(private fb : FormBuilder, 
              private router :Router,
              private platService : PlatService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit() {

    this.addPlatForm = this.fb.group({
      platName : [''],
      price : [''],
      description : [''],
      idChef : [''],
      img : ['']  
    })

    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    // console.log(this.connectedUser);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      //Edit
      this.title = 'Edit Plat'

      this.platService.getPlat(this.id).subscribe(
        (data) =>{
          this.plat = data.plat
        })
    }
    else
    {
      this.title = 'Add Plat'
    }


// Solution 1: filtrage dns Ts
    // this.platService.getPlats().subscribe(
    //   (data)=>{
    //     this.plats = data.plats
    //     console.log(this.plats);
    
    //     //filtrage
    //     for (let i = 0; i < this.plats.length; i++) {  
    //       if (this.plats[i].idChef == this.connectedUser._id) {
    //         console.log(this.plats[i].idChef );
            
    //         this.myPlats.push(this.plats[i]);
    //         console.log(this.myPlats);
            
    //       }
          
    //     }      
    //   }
    // )

//Solution 2
this.platService.getmyPlats(this.connectedUser._id).subscribe(
  (data)=>{
this.myPlats = data.myPlats
  })
    
  
   }

refresh(){
  this.router.navigate(['dashboardChef']);
}



  addPlat(){

    if (this.id) {
      //Edit
      
      this.platService.updatePlat(this.plat).subscribe(
        (data) => {
          console.log(data.message);
          
        }
      )
      
    } else {

      // Add Plat
   
      this.plat.idChef = this.connectedUser._id;
      console.log(this.connectedUser._id);
      
      this.platService.addPlat(this.plat, this.addPlatForm.value.img).subscribe(
        (data)=>{
          console.log(data.message);
          this.messageAdd = data.message;
        })
    //   let idPlat =  JSON.parse(localStorage.getItem("idPlat") || "1");
    // this.plat.id = idPlat;
  
  
   
    
    // this.plats.push(this.plat);
  
    // localStorage.setItem("plats",JSON.stringify(this.plats));
  
    // localStorage.setItem("idPlat" , idPlat + 1);

    }



   

}


deletePlat(id:any){
  this.platService.deletePlat(id).subscribe(
(data)=> {
console.log(data.message);

//Refresh Table without Reloading
this.platService.getmyPlats(this.connectedUser._id).subscribe(
  (data)=>{
    this.myPlats = data.myPlats
  })
})
}

displayPlat(id:any){
  this.router.navigate([`displayPlat/${id}`]);
}

editPlat(id:any){
  this.router.navigate([`editPlat/${id}`]);
}

onImageSelected(event: Event) {
  //Selection du fichier
  const file = (event.target as HTMLInputElement).files[0];
  // Ajout d'un attribut img dans l'objet Plat
  this.addPlatForm.patchValue({ img: file });
  // Mise à jour des valeurs du form
  this.addPlatForm.updateValueAndValidity();
  // Creation d'une variable reader pour lire le contenu de fichiers
  const reader = new FileReader();
  //Déclenchement du event load lors d'une lecture de fichier avec succès
  reader.onload = () => {
  //affecter le résultat de la lecture dans la variable imagePreview
  this.imagePreview = reader.result as string
  };
  // lecture du contenu du fichier Blob ou File
  reader.readAsDataURL(file);
  }
  




}

