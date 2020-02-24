import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  /**
   * Función que se encargará de buscar cierto dato, en este caso,
   * un conjunto de carácteres (texto) en un array
   * 
   * @param array El array en el que se quiere buscar
   * @param texto El texto que se quiere buscar en el array
   */
  transform( array : any[], texto: string): any[] {

    /**
     * Si el texto está vació o indefinido, se devolverá
     * el array sin ninguna modificación
     */
    if(texto === undefined || texto === ''){
      return array;
    }

    /**
     * Se convierte todas las mayúsculas en minúsculas.
     * Y se devolverá el array después de realizar la
     * búsqueda
     */
    texto = texto.toLowerCase();
    return array.filter( item => {
      return item.modelo.toLowerCase(texto).includes(texto)
    })
  }

}
