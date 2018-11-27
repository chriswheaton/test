import { Component, ViewChild, NgZone } from '@angular/core';

import { Content, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-all-contacts',
  templateUrl: 'all-contacts.html',
})
export class AllContactsPage {
	@ViewChild(Content) content: Content;
	public contacts: RJS.IContactBook;
	public contactLetters: Array<{ active: boolean, letter: string}> = [
		{
			active: true,
			letter: "A"
		},
		{
			active: false,
			letter: "B"
		},
		{
			active: false,
			letter: "C"
		},
		{
			active: false,
			letter: "D"
		},
		{
			active: false,
			letter: "E"
		},
		{
			active: false,
			letter: "F"
		},
		{
			active: false,
			letter: "G"
		},
		{
			active: false,
			letter: "H"
		},
		{
			active: false,
			letter: "I"
		},
		{
			active: false,
			letter: "J"
		},
		{
			active: false,
			letter: "K"
		},
		{
			active: false,
			letter: "L"
		},
		{
			active: false,
			letter: "M"
		},
		{
			active: false,
			letter: "N"
		},
		{
			active: false,
			letter: "O"
		},
		{
			active: false,
			letter: "P"
		},
		{
			active: false,
			letter: "Q"
		},
		{
			active: false,
			letter: "R"
		},
		{
			active: false,
			letter: "S"
		},
		{
			active: false,
			letter: "T"
		},
		{
			active: false,
			letter: "U"
		},
		{
			active: false,
			letter: "V"
		},
		{
			active: false,
			letter: "W"
		},
		{
			active: false,
			letter: "X"
		},
		{
			active: false,
			letter: "Y"
		},
		{
			active: false,
			letter: "Z"
		}
	];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public userProvider: UserProvider,
		public zone: NgZone) {
	}

	viewContact(contact: RJS.IContact) {
		this.navCtrl.push(ContactPage, { contact: contact });
	}

	updateActiveLetter(letter: string) {
		this.zone.run(() => {
			this.contactLetters.forEach(c => {
				c.active = false;
				if (c.letter.toLowerCase() === letter.toLowerCase()) c.active = true;
			});
		});
	}

	ngAfterViewInit() {
		this.content.ionScroll.subscribe((ev) => {
			let scroll = {
				scrollTop: ev.scrollTop,
				contentHeight: ev.contentHeight,
				total: ev.scrollTop + ev.contentHeight
			};
			let elements = ev.scrollElement.children[1].children;
			let elementLength = elements.length;
			let content = {
				prev: 0,
				curr: 0,
				total: 0
			};
			for (let i = 0; i < elementLength; i++) {
				content.curr = elements[i].clientHeight;
				content.total = content.prev + content.curr;
				if((scroll.scrollTop > content.prev) && (scroll.scrollTop < content.total)) {
					this.updateActiveLetter(elements[i].id);
				}
				content.prev += elements[i].clientHeight;
			}
		});
	}

	ionViewDidLoad() {
		this.userProvider.allContacts().then(contacts => {
			this.contacts = contacts;
		});
	}

}
