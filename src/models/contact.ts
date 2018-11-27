export class Contact {
	displayName?: string;
	firstName?: string;
	lastName?: string;
	title?: string;
	department?: string;
	email?: string;
	employeeId?: string;
	telephone?: string;
	fullAddress?: string;
	directReports?: Array<RJS.IContact>;
	manager?: RJS.IContact;
	fullTelephone?: string;
	telephoneExtension?: string;
	mailNickname?: string;
	street?: string;
	city?: string;
	state?: string;
	postalCode?: string;
	thumbnailPhoto?: string;
	constructor(obj: RJS.IContact) {
		this.displayName = obj.displayName;
		this.firstName = obj.firstName;
		this.lastName = obj.lastName;
		this.title = obj.title;
		this.department = obj.department;
		this.email = obj.email;
		this.telephone = obj.telephone;
		this.fullAddress = obj.fullAddress;
		this.directReports = obj.directReports;
		this.manager = obj.manager;
		this.fullTelephone = obj.fullTelephone;
		this.telephoneExtension = obj.telephoneExtension;
		this.mailNickname = obj.mailNickname;
		this.street = obj.street;
		this.city = obj.city;
		this.state = obj.state;
		this.postalCode = obj.postalCode;
		this.thumbnailPhoto = obj.thumbnailPhoto;
		this.employeeId = obj.employeeId;
	}

}
