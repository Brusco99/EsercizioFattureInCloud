import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fattura } from '../model/Fattura';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   readonly API_ENDPOINT="http://staccah.fattureincloud.it/testfrontend/data.json";
  constructor(private http:HttpClient) { }

  public getData() : Promise<Fattura[]>
  {
      return this.http.get(this.API_ENDPOINT).toPromise().then(data=>
         {
            console.log(data)
            let fatture:Fattura[]=[];
            let mesi=(data as any).mesi
            for( let i=0;i< mesi.length;i++)
            {
               let element=mesi[i];
               fatture.push(new Fattura(element["documenti"],element["importo"],i+1))   
            }
                       
            return fatture;
         });
  }
}
