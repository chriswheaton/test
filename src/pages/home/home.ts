import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { AllContactsPage } from '../all-contacts/all-contacts';
import { ContactPage } from '../contact/contact';
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	animations: [
		trigger('listStagger', [
			transition('* <=> *', [
				query(':enter', [
					style({ opacity: 0, transform: 'translateY(-15px)' }),
					stagger('50ms',
						animate('550ms ease-out', style({ opacity: 1, transform: 'translateY(0px)' }))
					)
				],
				{ optional: true }),
				query(':leave', animate('50ms', style({ opacity: 0 })), {
					optional: true
				})
			])
		])
	]
})
export class HomePage {
	public searchVal: string;
	public starred: Array<RJS.IContact> = [];
	public contacts: Array<RJS.IContact> = [];
	public searchResults: Array<RJS.IContact> = [];
    constructor(
		public navCtrl: NavController,
		private userProvider: UserProvider
	) {}

	goToAllContacts(){
		this.navCtrl.push(AllContactsPage);
	}

	viewContact(contact: RJS.IContact) {
		this.navCtrl.push(ContactPage, { contact: contact});
	}

	cancelContacts(){
		console.log("cancelContacts");
	}

	clearContacts(){
		console.log("clearContacts");
	}

	searchContacts(ev: any) {
		let val = ev.target.value;
		if (val && val.trim() !== '') {
			this.searchResults = this.contacts.filter(c => {
				let fn = c.firstName.toLowerCase().includes(val.toLowerCase());
				let ln = c.lastName.toLowerCase().includes(val.toLowerCase());
				return fn ? fn : ln;
			});
		} else {
			this.searchResults = [];
		}
	}

	ionViewDidEnter() {
		this.userProvider.getContacts().then(contacts => {
			this.contacts = contacts;
		});
		this.userProvider.getStarred().then(starred => {
			this.starred = starred;
		});
	}

}
