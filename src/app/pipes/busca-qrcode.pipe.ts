import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscaQRCode'
})
export class BuscaQRCodePipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.mesa.toString().toLowerCase().includes(terms); // only filter country name
    });
  }

}
