export class Fattura
{
   constructor(documenti:number=null,importo:number=null,month:number=null)
   {
      this.documenti=documenti;
      this.importo=importo
      this.month=month;
   }
   public documenti:number=null;
   public importo:number=null;

   //number rapresent month of year from 1 to 12
   public month:number=null;
}