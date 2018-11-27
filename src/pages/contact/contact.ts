import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
	@ViewChild(Content) content: Content;
	public contact: RJS.IContact;
	public starred: Array<RJS.IContact> = [];
	public isStarred: boolean = false;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public userProvider: UserProvider) {
	}

	ionViewDidLoad() {
		this.userProvider.getStarred().then(starred => {
			this.starred = starred;
			this.contact = this.navParams.get('contact');
			this.starred.forEach(f => {
				if(f.employeeId === this.contact.employeeId) this.isStarred = true;
			});
		});
	}
	ionViewDidEnter(){
		if (this.content.getContentDimensions().scrollTop > 0) this.content.scrollToTop();
	}

	modifyFavorite(contact: RJS.IContact, isStarred){
		this.userProvider.modifyStarred(contact, isStarred).then(favorites => {
			this.isStarred = !isStarred;
			// for(let i=0; i<favorites.length; i++){
			// 	if (favorites[i].employeeId === contact.employeeId){
			// 		this.isFavorite = true;
			// 		break;
			// 	} else {
			// 		this.isFavorite = false;
			// 	}
			// }
			// // this.favorites.forEach(f => {
			// // 	if (f.employeeId === this.contact.employeeId) this.isFavorite = true;
			// // });
		});
	}

	viewContact(contact: RJS.IContact){
		this.navCtrl.push(ContactPage, { contact: contact });
	}
}
