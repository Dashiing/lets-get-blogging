import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'howLong'
})
export class HowLongPipe implements PipeTransform {

  transform(value: string): string {
    const currentDate = new Date();
    const date = new Date(value);

    const yearsAgo = currentDate.getFullYear() - date.getFullYear();
    const monthsAgo = currentDate.getMonth() - date.getMonth();
    const daysAgo = currentDate.getDate() - date.getDate();

    if (yearsAgo > 0) {
      return `${yearsAgo} years ago`;
    }

    if (monthsAgo > 0) {
      return `${monthsAgo} months ago`;
    }

    if (daysAgo > 0) {
      return `${daysAgo} days ago`;
    }

    return 'Today';
  }
}
