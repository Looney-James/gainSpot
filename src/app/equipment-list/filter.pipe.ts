import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, properties?: string[], selectedStatus?: string): any[] {
    if (!items) return [];
    if (!searchTerm && !selectedStatus) return items;

    searchTerm = searchTerm ? searchTerm.toLowerCase() : '';

    return items.filter((item) => {
      let match = true;
      if (selectedStatus && item.status !== selectedStatus) {
        match = false;
      }
      if (match && searchTerm) {
        if (properties && properties.length > 0) {
          for (const property of properties) {
            if (item[property] && item[property].toString().toLowerCase().includes(searchTerm)) {
              return true;
            }
          }
          return false;
        } else {
          return item.toString().toLowerCase().includes(searchTerm);
        }
      }
      return match;
    });
  }
}
