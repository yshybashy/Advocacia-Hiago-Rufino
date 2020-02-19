//import { promises } from 'fs';

//const firebase = require('firebase');
//require('firebase/firestore');

class Firebase{

    constructor(){

        this._config = {
                apiKey: "AIzaSyAs0OT1Q-3mVS0Ygs4OZgJd4C-0uRERucI",
                authDomain: "chat-a1bbc.firebaseapp.com",
                databaseURL: "https://chat-a1bbc.firebaseio.com",
                projectId: "chat-a1bbc",
                storageBucket: "chat-a1bbc.appspot.com",
                messagingSenderId: "962933227648"
              };
 /*
        this.init();
    }   
    
   
    init(){
    
            if(!window._initializedFirebase){

          
          firebase.initializeApp(this._config);

            firebase.firestore().settings({
                //timestampsInSnapshots: true
            });

          window._initializedFirebase = true;
            }
    }

    static db(){ 

        return firebase.firestore();
    }

    static hd(){

        return firebase.storage();
    }
   /*
    initAuth(){
        
        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then(result =>{
                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token

                });
            })
            .catch(err=>{
                f(err);
            });
        });
       
    }
    */
}
}