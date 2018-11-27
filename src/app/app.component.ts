import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		screenOrientation: ScreenOrientation,
		msAdal: MSAdal
	) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.

			if (platform.is('cordova')) {
				//console.log('got cordova');
				statusBar.hide();
				splashScreen.hide();
				screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
			}

			let authContext: AuthenticationContext = msAdal.createAuthenticationContext('https://login.windows.net/common/common');

			console.log('authContext',authContext);
			authContext.acquireTokenAsync('https://graph.windows.net', '4345a7b9-9a63-4910-a426-35363201d503', 'http://localhost:8100/', '3909edbe-9fcd-4935-bddf-c5f4d43940ad', null)
				.then((authResponse: AuthenticationResult) => {
					console.log('Token is', authResponse.accessToken);
					console.log('Token will expire on', authResponse.expiresOn);
				})
				.catch((e: any) => {
					console.log('Authentication failed', e);
				});
		});
	}
}

