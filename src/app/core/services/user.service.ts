import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { firebaseConfig } from '../../environment';
import * as firebase from 'firebase';

@Injectable()
export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router ) {
        firebase.initializeApp(firebaseConfig);
        //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string){
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .catch(function(error) {
        //         alert(`${error.message} Please Try Again!`);
        //     });
    }

    verifyUser() {
        console.log('verifyUser');
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }

    login(loginEmail: string, loginPassword: string){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
          .catch(function(error) {
              alert('${error.message} Unable to login. Try Again!');
          });
        
          //return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(error);
        });
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function(){
            console.log('Logged Out');
        }, function(error) {
            alert('${error.message} Unabled to logout. Try again!');
        });
    }
}
