import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../../models/contact';


@Injectable()
export class UserProvider {

	constructor(private http: HttpClient, private storage: Storage) {

	}

	getContacts(): Promise<Array<RJS.IContact>> {
		return new Promise(resolve => {
			this.getLocal('contacts').then(contacts => {
				if(!contacts || contacts.length < 1) this.buildContacts().then(res => {
					resolve(res.contacts);
				});
				else resolve(contacts);
			});
		});
	}

	getContactBook(){
		return new Promise(resolve => {
			this.getLocal('contactBook').then(contactBook => {
				if (!contactBook || contactBook.length < 1) this.buildContacts().then(res => {
					resolve(res.contactBook);
				});
				else resolve(contactBook);
			});
		});
	}

	buildContacts(): Promise<{ contacts: Array<RJS.IContact>, contactBook: RJS.IContactBook}>{
		return new Promise(resolve => {
			this.getFakeUser(1000).subscribe(data => {
				this.mapFakeUser(data.results).then(employees => {
					this.getFakeUser(50).subscribe(data => {
						this.mapFakeUser(data.results).then(managers => {
							this.mapDirectReports(managers, employees).then(contacts => {
								this.setLocal('contacts', contacts).then(c => {
									this.createBook(contacts).then(contactBook => {
										this.setLocal('contactBook', contactBook).then(contactBook => {
											resolve({ contacts: contacts, contactBook: contactBook });
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}

	getStarred(): Promise<Array<RJS.IContact>>{
		return new Promise(resolve => {
			this.getLocal('starred').then(favorites => {
				resolve(favorites ? favorites : []);
			});
		});
	}

	modifyStarred(contact: RJS.IContact, remove?: boolean): Promise<Array<RJS.IContact>>{
		return new Promise(resolve => {
			this.getStarred().then(starred => {
				if(remove){
					starred = (!starred) ? [] : starred.filter(f => { return f.employeeId !== contact.employeeId });
				} else {
					starred.push(contact);
				}
				this.setLocal('starred', starred).then(starred => {
					resolve(starred);
				});
			});
		});
	}

	allContacts(): Promise<RJS.IContactBook> {
		return new Promise(resolve => {
			this.getLocal('contactBook').then(c => { resolve(c); });
		});
	}

	public createBook(contacts: Array<RJS.IContact>) {
		return new Promise(resolve => {
			let contactBook: RJS.IContactBook = {};
			contacts.forEach(c => {
				if (!contactBook[c.firstName.charAt(0)]) {
					contactBook[c.firstName.charAt(0)] = [c];
				} else {
					contactBook[c.firstName.charAt(0)].push(c);
				}
			});
			this.setLocal('contactBook', contactBook).then(contactBook => {
				resolve(contactBook);
			});
		});
	}

	public sortBy(field?: any, reverse?: any, primer?: any, then?: any) {
		let get = function (obj, field) {
			return field ? obj[field] : obj;
		}
		let prime = function (obj) {
			return primer ? primer(get(obj, field)) : get(obj, field);
		};
		return function (a, b) {
			let A = prime(a),
				B = prime(b);
			return ((A < B) ? -1 : (A > B) ? 1 : (typeof then === 'function') ? then(a, b) : 0) * [1, -1][+!!reverse];
		};
	};

	public bySortedValue(obj, callback, reverse, context?) {
		let tuples = [];
		for (let key in obj) tuples.push([key, obj[key]]);
		tuples.sort(function (a, b) {
			return ((a[1] < b[1]) ? -1 : (a[1] > b[1]) ? 1 : 0) * [1, -1][+!!reverse];
		});
		let length = tuples.length;
		while (length--) callback.call(context, tuples[length][0], tuples[length][1]);
	}

	public sortByNested(field?: any, reverse?: any, then?: any) {
		let get = function (obj, field) {
			if (field) {
				let _obj = obj;
				let prop: Array<string> = field.split('.');
				if (prop.length > 1) {
					prop.forEach((param) => {
						_obj = _obj[param];
					});
				}
				obj = _obj;
			}
			return obj;
		}
		return function (a, b) {
			let A = get(a, field),
				B = get(b, field);
			return ((A < B) ? -1 : (A > B) ? 1 : (typeof then === 'function') ? then(a, b) : 0) * [1, -1][+!!reverse];
		};
	};

	getLocal(key: string): Promise<any>{
		return this.storage.get(key);
	}

	setLocal(key: string, value: any) {
		return this.storage.set(key, value);
	}

	deleteLocal(key: string) {
		this.storage.remove(key);
	}

	/**
    * Returns a random integer between min (inclusive) and max (inclusive)
    * Using Math.round() will give you a non-uniform distribution!
    */
	public getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomJobTitle(){
		let a = [
			"Lead",
			"Senior",
			"Direct",
			"Corporate",
			"Dynamic",
			"Future",
			"Product",
			"National",
			"Regional",
			"District",
			"Central",
			"Global",
			"Relational",
			"Customer",
			"Investor",
			"Dynamic",
			"International",
			"Legacy",
			"Forward",
			"Interactive",
			"Internal",
			"Human",
			"Chief",
			"Principal"
		];
		let b = [
			"Solutions",
			"Program",
			"Brand",
			"Security",
			"Research",
			"Marketing",
			"Directives",
			"Implementation",
			"Integration",
			"Functionality",
			"Response",
			"Paradigm",
			"Tactics",
			"Identity",
			"Markets",
			"Group",
			"Resonance",
			"Applications",
			"Optimization",
			"Operations",
			"Infrastructure",
			"Intranet",
			"Communications",
			"Web",
			"Branding",
			"Quality",
			"Assurance",
			"Impact",
			"Mobility",
			"Ideation",
			"Data",
			"Creative",
			"Configuration",
			"Accountability",
			"Interactions",
			"Factors",
			"Usability",
			"Metrics",
			"Team"
		];
		let c = [
			"Supervisor",
			"Associate",
			"Executive",
			"Liason",
			"Officer",
			"Manager",
			"Engineer",
			"Specialist",
			"Director",
			"Coordinator",
			"Administrator",
			"Architect",
			"Analyst",
			"Designer",
			"Planner",
			"Synergist",
			"Orchestrator",
			"Technician",
			"Developer",
			"Producer",
			"Consultant",
			"Assistant",
			"Facilitator",
			"Agent",
			"Representative",
			"Strategist"
		];
		return `${a[this.getRandomInt(0, a.length - 1)]} ${b[this.getRandomInt(0, b.length - 1)]} ${c[this.getRandomInt(0, c.length - 1)]}`;
	}

	randomDepartment(){
		let list = [
			"Corporate Financial",
			"Corporate Securities Research",
			"Corporate Statistical Financial",
			"Institutional Commodity",
			"Bank Compliance",
			"Bank Examiner",
			"Financial Compliance",
			"Home Mortgage Disclosure Act",
			"Payroll",
			"Pension",
			"IT Entrprs Svcs"
		];
		return list[this.getRandomInt(0, list.length-1)];
	}

	mapDirectReports(managers: Array<RJS.IContact>, employees: Array<RJS.IContact>): Promise<Array<RJS.IContact>> {
		return new Promise(resolve => {
			let eCount = 0;
			for (let i = 0; i < managers.length; i++) {
				managers[i].directReports = [];
				for (let j = 0; j <= 19; j++) {
					employees[eCount].manager = managers[i];
					managers[i].manager = (i > 0) ? managers[i - 1] : null;
					managers[i].directReports.push(employees[eCount]);
					eCount++;
				}
			}
			this.setLocal('contacts', employees.concat(managers)).then(c => {
				resolve(c);
			});
		});
	}

	mapFakeUser(users: Array<any>): Promise<Array<RJS.IContact>> {
		return new Promise(resolve => {
			let c = [];
			users.forEach((u) => {
				c.push(new Contact({
					city: u.location.city,
					department: this.randomDepartment(),
					directReports: [],
					displayName: `${u.name.first} ${u.name.last}`,
					email: u.email,
					firstName: u.name.first,
					fullAddress: `${u.location.street}<br/>${u.location.city}, ${u.location.state} ${u.location.postcode}`,
					fullTelephone: u.phone,
					employeeId: `${this.getRandomInt(10000, 99999)}`,
					lastName: u.name.last,
					mailNickname: `${u.name.first.charAt(0)}${u.name.last}`,
					manager: null,
					postalCode: u.location.postcode,
					telephone: u.phone,
					telephoneExtension: `x${this.getRandomInt(1000, 9999)}`,
					title: this.randomJobTitle(),
					thumbnailPhoto: u.picture.large,
					state: u.location.state,
					street: u.location.street
				}));
			});
			resolve(c.sort(this.sortBy('firstName', false)));
		});

		//return this.contacts;
		// let json = {
		// 	"gender": "female",
		// 	"name": {
		// 		"title": "mrs",
		// 		"first": "phoebe",
		// 		"last": "black"
		// 	},
		// 	"location": {
		// 		"street": "1764 herbert road",
		// 		"city": "kilcock",
		// 		"state": "louth",
		// 		"postcode": 35878,
		// 		"coordinates": {
		// 			"latitude": "22.9783",
		// 			"longitude": "62.2982"
		// 		},
		// 		"timezone": {
		// 			"offset": "-12:00",
		// 			"description": "Eniwetok, Kwajalein"
		// 		}
		// 	},
		// 	"email": "phoebe.black@example.com",
		// 	"login": {
		// 		"uuid": "c0802479-4593-4fa4-b9e1-3340feeb4b74",
		// 		"username": "bigduck284",
		// 		"password": "systems",
		// 		"salt": "wJo9NpBK",
		// 		"md5": "b1854010fce77eae846a50b7478faf67",
		// 		"sha1": "af6cb14e518954637a23a99c63584f5c745411b2",
		// 		"sha256": "a5fd84c12044d7c9d63594453cfe26ec5249620d623f20c90662afef0a25d8e0"
		// 	},
		// 	"dob": {
		// 		"date": "1960-03-10T00:42:19Z",
		// 		"age": 58
		// 	},
		// 	"registered": {
		// 		"date": "2002-06-15T23:33:35Z",
		// 		"age": 16
		// 	},
		// 	"phone": "071-872-7425",
		// 	"cell": "081-566-0403",
		// 	"id": {
		// 		"name": "PPS",
		// 		"value": "5954355T"
		// 	},
		// 	"picture": {
		// 		"large": "https://randomuser.me/api/portraits/women/92.jpg",
		// 		"medium": "https://randomuser.me/api/portraits/med/women/92.jpg",
		// 		"thumbnail": "https://randomuser.me/api/portraits/thumb/women/92.jpg"
		// 	},
		// 	"nat": "IE"
		// };
	}

	getFakeUser(count?:number): Observable<any>{
		return this.http.get(`https://randomuser.me/api/?results=${ count ? count : 50}&nat=us`);
	}
}
