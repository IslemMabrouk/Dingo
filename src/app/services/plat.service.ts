import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatService {
  SERVER_URL:string="http://localhost:3000";

  constructor(private httpClient : HttpClient) { }


  public addPlat(plat:any, img : File){
    let formData = new FormData();
    formData.append('platName', plat.platName);
    formData.append('price', plat.price);
    formData.append('description', plat.description);
    formData.append('idChef', plat.idChef);
    formData.append('img', img);
    
    return this.httpClient.post<{message : string}>(this.SERVER_URL + '/api/addPlat', formData)
}

public getPlats(){
  return this.httpClient.get<{plats : any}>(this.SERVER_URL + '/api/allPlats');
}

public getPlat(platId){
  return this.httpClient.get<{plat : any}>(`${this.SERVER_URL + '/api/allPlats'}/${platId}`);
}

public deletePlat(platId){
  return this.httpClient.delete<{message : string}>(`${this.SERVER_URL + '/api/allPlats'}/${platId}`)
}

public getmyPlats(idChef){
  return this.httpClient.get<{myPlats : any}>(`${this.SERVER_URL + '/api/myPlats'}/${idChef}`);
}

public updatePlat(plat: any){
  return this.httpClient.put<{message : string}>(`${this.SERVER_URL + '/api/allPlats'}/${plat._id}`,plat)
}

}

