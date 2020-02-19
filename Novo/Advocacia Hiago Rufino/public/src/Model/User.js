

class User {
     constructor(id){ // possivel erro, id = email (da pra fazer uma gambi)

        
        //constructor class events
        this._events = {
            
        };
        // Fim constructor class events
        
        //Constructor Firebase
        this._config = {
            apiKey: "AIzaSyAs0OT1Q-3mVS0Ygs4OZgJd4C-0uRERucI",
            authDomain: "chat-a1bbc.firebaseapp.com",
            databaseURL: "https://chat-a1bbc.firebaseio.com",
            projectId: "chat-a1bbc",
            storageBucket: "chat-a1bbc.appspot.com",
            messagingSenderId: "962933227648"
          };

    this.init();
        //Fim Constructor Firebase
        
        //Constructor Model
        //this._data = {};
        //FIm Constructor Model

        // Constructor Util
          this._data = {};
          if(id) this.getById(id);

        //FIm Constructor util
        var email = localStorage.email;
    } 
        
        //Firebase
        init(){
    
            if(!window._initializedFirebase){

          
          Firebase.firebase.initializeApp(this._config);

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
        //Fim Firebase
        
        // Class Events
    on(eventName, fn){

        if(!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(fn);
    }

    trigger(){

       let args = [...arguments];
       let eventName = args.shift();

       args.push(new Event(eventName));
       if(this._events[eventName]instanceof Array){

        this._events[eventName].forEach(fn =>{

            fn.apply(null, args);


        });
       }
    }
    //Fim Class Events
    //Model 
    fromJSON(json){
        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());
    }

    toJSON(){

        return this._data;
    }
    //Fim Model
    // User

        get nome(){return this._data.nome;}
        set nome(value){this._data.nome = value;}

        get email(){return this._data.email;}
        set email(value){this._data.email = value;}

        get photo(){return this._data.photo;}
        set photo(value){this._data.photo = value;}

        getById(id){

            return new Promise((s, f)=> {
                    // id === email 
                User.findByEmail(id).get().then(doc =>{
                    this.fromJSON(doc.data());

                    s(doc);
                    
                }).catch(err=>{
                    f(err);
                });
            });
        }

        save(){

            return User.findByEmail(this.email).set(this.toJSON());
        }

        static getRef(){

            return Firebase.db().collection('/Usuarios');
        }
            
        static findByEmail(email){
           return User.getRef().doc(email); 
        }
    //FIM User
}