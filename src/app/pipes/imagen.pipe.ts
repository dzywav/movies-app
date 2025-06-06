import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen',
  standalone : false,
})
export class ImagenPipe implements PipeTransform {

transform(img: string, size: string = 'w500'): string {
  if (!img) {
    return './assets/no-image-banner.jpg';
  }

  // Asegura que comience con "/"
  if (!img.startsWith('/')) {
    img = '/' + img;
  }

  return `${URL}/${size}${img}`;
}

}
