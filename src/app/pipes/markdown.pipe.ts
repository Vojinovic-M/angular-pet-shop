import { Pipe, PipeTransform } from '@angular/core';
import {marked} from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return <string>marked(value);  // Convert markdown to HTML
  }

}
