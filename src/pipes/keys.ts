import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
	name: 'keys',
	pure: false
})
//usage <div *ngFor="let key of objs | keys">
export class KeysPipe implements PipeTransform {
	transform(value: any, args: any[] = null): any {
		return Object.keys(value);
	}
}
