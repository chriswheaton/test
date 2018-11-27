
declare module "rjs" {
	export = RJS;
}
declare module RJS {
	interface KeyValue {
		key?: string;
		value?: any;
	}
	interface KeyValueObj {
		[key: string]: KeyValue;
	}

	interface IContactBook {
		[key: string]: Array<IContact>;
	}

	interface IContact {
		city?: string;
		department?: string;
		directReports?: Array<IContact>;
		displayName?: string;
		email?: string;
		firstName?: string;
		fullAddress?: string;
		fullTelephone?: string;
		employeeId?: string
		lastName?: string;
		mailNickname?: string;
		manager?: IContact;
		postalCode?: string;
		telephone?: string;
		telephoneExtension?: string;
		thumbnailPhoto?: string;
		title?: string;
		state?: string;
		street?: string;
	}

}
