import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MSAdal } from '@ionic-native/ms-adal';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ContactPage } from '../pages/contact/contact';
import { AllContactsPage } from '../pages/all-contacts/all-contacts';

import { UserProvider } from '../providers/user/user';
import { LdapProvider } from '../providers/ldap/ldap';


import { KeysPipe } from '../pipes/keys';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
		ContactPage,
		AllContactsPage,
		KeysPipe
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot({ name: '__rjs' })
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
		ContactPage,
		AllContactsPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		ScreenOrientation,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		UserProvider,
		LdapProvider,
		MSAdal
	]
})
export class AppModule {}
