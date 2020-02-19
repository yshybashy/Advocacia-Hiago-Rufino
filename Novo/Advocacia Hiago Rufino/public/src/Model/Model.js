class Model{
    constructor(){

         //constructor class events
         this._events = {
            
        };
        // Fim constructor class events

        this._data = {};
    }

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

    fromJSON(json){
        this._data = Object.assign(this._data, json);
        this.trigger('datachange', this.toJSON());
    }

    toJSON(){

        return this._data;
    }
    
}