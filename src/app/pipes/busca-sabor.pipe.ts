import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscaSabor'
})
export class BuscaSaborPipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.sabor.toLowerCase().includes(terms); // only filter country name
    });
  }

}
