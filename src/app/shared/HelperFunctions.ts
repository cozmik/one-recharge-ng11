/**
 * Created by macbook on 02/08/2017.
 */
export class HelperFunctions {
  static isElementsExistsInArray(element: any, compare_array: any): boolean {
  const type = typeof element;
  if (element instanceof Array) {
    for (const ele of element) {
      for (let i = 0; i < compare_array.length ; i++) {
        if (compare_array[i]  === ele) {
          return true;
        }
      }
    }
  }
  else if (type === 'string') {
    for ( let i = 0; i < compare_array.length; i++) {
      if ( compare_array[i] === element) {
        return true;
      }
    }
  }
  return false;
  }
}
