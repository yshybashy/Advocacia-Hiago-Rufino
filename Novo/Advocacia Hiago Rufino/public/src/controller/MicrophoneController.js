//import { ClassEvent } from "../util/ClassEvent";



class MicrophoneController  { 


    constructor(){

        //super();
        this._events = {
            
        };

        this._mimeType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices.getUserMedia({

            audio: true
        }).then(stream=> {
            
            this._available = true;
            this._stream = stream;

            

            this.trigger('ready', this._stream);
            
            
        }).catch(err=>{
            console.error(err);
        });
    }
    //events
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
     //fim events

    stop(){

        this._stream.getTracks().forEach(track=> {
            track.stop();

        });
    }

    isAvailable(){

        return this._available;
    }
    startRecorder(){
        if(this.isAvailable()){

            this._mediaRecorder = new MediaRecorder(this._stream,  {

                mimeType: this._mimeType
            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavailable', e =>{

                if(e.data.size > 0) this._recordedChunks.push(e.data);

            });
            
            this._mediaRecorder.addEventListener('stop', e =>{

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });
                let filename = `rec${Date.now()}.webm`

                let audioContext = new AudioContext();

                let reader = new FileReader();

                reader.onload = e=>{

                    audioContext.decodeAudioData(reader.result).then(decode =>{
                        let file = new File([blob], filename,{
                            type: this._mimeType,
                            lastModified: Date.now()
                        });

                        this.trigger('recorded', file, decode);

                    });

                   
                }   

                reader.readAsArrayBuffer(blob);

               

                //console.log('reader file', file);

            
            });

            this._mediaRecorder.start();

            this.startTimer();
        }


    }

    stopRecorder(){

        if(this.isAvailable()){

            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();

        }
    }

    startTimer(){
        let start = Date.now();
        
        this._recordMicrophoneInterval = setInterval(()=> {

             
            this.trigger('recordtimer', (Date.now() - start)); 
        }, 100);
    }

    stopTimer(){

        clearInterval(this._recordMicrophoneInterval);
    }

    }
