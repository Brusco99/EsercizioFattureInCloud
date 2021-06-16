import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Fattura } from 'src/app/model/Fattura';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-balance-graph',
  templateUrl: './balance-graph.component.html',
  styleUrls: ['./balance-graph.component.css']
})
export class BalanceGraphComponent implements OnInit {
   apiService:ApiService;
   fatture:Fattura[]=[];
   altezze:number[]=[];
   mapFatturaAltezza:Map<Fattura,number>=new Map();
   selectedFatture:Fattura[]=[];
   firstSelection:number;
   secondSelection:number;
  constructor(private http:HttpClient) 
  { 
     this.apiService=new ApiService(http);
  }

   month:string[]=["Gennaio","Febbratio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"]

  async ngOnInit() 
  {
     await this.apiService.getData().then(response=>this.fatture=response);
     let max :number=this.computeMax(this.fatture);
     for(let fattura of this.fatture)
     {
        let altezza=(100*fattura.importo)/max;
        this.mapFatturaAltezza.set(fattura,altezza)
     }
  }

  computeMax(fatture:Fattura[])
  {
      let max=fatture[0].importo;
      fatture.forEach(item=>max= item.importo>max?item.importo:max);
      return max;
  }

  getHeight(fattura:Fattura)
  {
     return this.mapFatturaAltezza.get(fattura)
  }

  selectMese(fattura:Fattura,mese:string)
  {
      this.selectedFatture=[];
      this.selectedFatture.push(fattura)
  }

  compute()
  {
      this.selectedFatture=[];
       this.fatture.forEach(item=>
         {
            if(item.month<=this.secondSelection && item.month>=this.firstSelection)
               this.selectedFatture.push(item)
         })
  }

  isSelected(fattura:Fattura):boolean
  {
     return this.selectedFatture.includes(fattura)
  }
}
