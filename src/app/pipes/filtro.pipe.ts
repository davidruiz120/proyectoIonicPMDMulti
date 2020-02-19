import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( array : any[], texto: string): any[] {

    //console.log(array);

    if(texto === undefined || texto === ''){
      return array; // No hacer una búsqueda/aplicar filtro si no hay texto para buscar
    }

    
    texto = texto.toLowerCase();
    return array.filter( item => {
      return item.modelo.toLowerCase(texto).includes(texto)
    })
  }

}
