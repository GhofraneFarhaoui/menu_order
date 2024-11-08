import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    const date = this.parseDate(value);
    if (!date || isNaN(date.getTime())) {
      throw new BadRequestException(
        'Invalid date format. Please provide a valid date.'
      );
    }
    return date;
  }
  private parseDate(value: string): Date | null {
    const dateFormats = [
      /^\d{4}-\d{2}-\d{2}$/,
      /^\d{2}\/\d{2}\/\d{4}$/,
      /^\d{4}\/\d{2}\/\d{2}$/,
      /^\d{2}-\d{2}-\d{4}$/,
      /^\d{2}\.\d{2}\.\d{4}$/,
    ];

    for (const format of dateFormats) {
      if (format.test(value)) {
        return this.convertToDate(value);
      }
    }

    return null;
  }
  private convertToDate(value: string): Date {
    let [year, month, day] = [0, 0, 0];

    if (value.includes('-')) {
      [year, month, day] = value.split('-').map(Number);
      if (year < 1000) [day, month, year] = [year, month, day];
    } else if (value.includes('/')) {
      const parts = value.split('/');
      if (parts[2].length === 4) {
        [day, month, year] = parts.map(Number);
      } else {
        [year, month, day] = parts.map(Number);
      }
    } else if (value.includes('.')) {
      [day, month, year] = value.split('.').map(Number);
    }

    return new Date(year, month - 1, day);
  }
}
