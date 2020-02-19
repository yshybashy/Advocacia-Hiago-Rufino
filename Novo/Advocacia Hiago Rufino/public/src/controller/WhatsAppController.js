
/*
import {Format} from './../util/Format';
import {CameraController} from './CameraController';
import {MicrophoneController} from './MicrophoneController';
import {DocumentPreviewController} from './DocumentPreviewController';
import{ Firebase } from './../util/Firebase'
*/
//import { start } from 'repl';


  class WhatsAppController{
    
    constructor(){
        
      
        //console.log(localStorage.email);

        //this._firebase = new Firebase();
        //this.initAuth();
        this.elementPrototype();
        this.loadElements();
        this.initEvents();
        //this.initContacts();

     
        
        
        
    }

    /*
     initAuth(){

        this._firebase.initAuth()
        .then(response=>{
            this._user = response.user;
          

        }).catch(err=>{
            console.error(err);
        });
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

    getContacts(){
        return new Promise((s, f)=>{
            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').onSnapshot(docs =>{

                let contacts = []; 

                docs.forEach(doc => {

                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);
                });
                    trigger('contactschange', docs);
                    s(contacts);

            });
            
        });

    }
      
    initContacts(){

       

           // on('contactschange', docs =>{

                
            //});
         // getContacts();  

    }
        */

       

    loadElements(){
        this.el = {};
        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    elementPrototype(){

        Element.prototype.hide = function(){

            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function(){

            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function(){

            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        Element.prototype.on = function (events, fn){

            events.split(' ').forEach(event=>{
                this.addEventListener(event, fn);
                
            });
            return this;
        }
        Element.prototype.css = function(styles){ 
            for(let name in styles){ 
                this.style[name] = styles[name];
            }

        }
        Element.prototype.addClass = function(name){
            this.classList.add(name);
            return this;
        }

        Element.prototype.removeClass = function(name){
            this.classList.remove(name);
            return this;
        }

        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name);
            return this;
        }

        Element.prototype.hasClass = function(name){
           return this.classList.contains(name);
            
        }

        HTMLFormElement.prototype.getForm = function (){

            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function (){

            let json = {};
            this.getForm().forEach((value, key)=> {

                json[key] = value;
            });

            return json;
        }
       
    }

    
    
    initEvents(){

        
        this.el.myPhoto.on('click' , e=> {

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open');
            }, 300);
            
            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).onSnapshot(function(doc){
                //console.log(doc.data().foto);
                if(doc.data().foto){
                    let user = doc.data();
                    let foto = document.getElementById('photo-container-edit-profile').querySelector('img');
                    foto.src = user.foto;
                    foto.show();
                    document.getElementById('img-default-panel-edit-profile').hide();

                    
                }
            });

        });

        this.el.btnNewContact.on('click', e=> {
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(()=>{
                this.el.panelAddContact.addClass('open');
            }, 300);
            
           

        });

        this.el.btnClosePanelEditProfile.on('click', e=>{

            this.el.panelEditProfile.removeClass('open');   

        });

        this.el.btnClosePanelAddContact.on('click', e=> {

            this.el.panelAddContact.removeClass('open');
        });

        this.el.photoContainerEditProfile.on('click', e=> {

            this.el.inputProfilePhoto.click();

        });
        function upload3(file, from){

            return new Promise((s,f)=>{
                
                let uploadTask = firebase.storage().ref(from).child(Date.now() + '_' + file.name).put(file);
                //console.log(uploadTask.snapshot.getdownloadURL);
             
            
            uploadTask.on('state_changed', e=>{
             console.info('upload', e);
            }, err =>{
                f(err);
            }, () =>{

               s(uploadTask.snapshot);
            
            //console.log(uploadTask.snapshot.downloadURL);
        });
            });
           
        }

        this.el.inputProfilePhoto.on('change', e =>{
                if(this.el.inputProfilePhoto.files.length > 0){
                    let file = this.el.inputProfilePhoto.files[0];

                    upload3(file, localStorage.email).then(snapshot=>{

                        //console.log(snapshot.downloadURL);
                        snapshot.ref.getDownloadURL().then(downloadURL => {
                        firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).set({
                            foto: downloadURL

                        }, {
                            merge: true
                                }).then(()=>{

                                    
                                });
                        }); 
                    });
                }

        });

        this.el.inputNamePanelEditProfile.on('keypress', e=> {

            if(e.key === 'Enter'){

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }
        });
        /*
        this.el.btnSavePanelEditProfile.on('click', e=> {

           console.log(this.el.inputNamePanelEditProfile.innerHTML); 
        });
*/
        this.el.formPanelAddContact.on('submit', e=>{


            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact);

        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{

             

            item.on('click', e=>{
                this.el.home.hide();
                this.el.main.css({
                    display:'flex'

                
                });
            });
        });

        this.el.btnAttach.on('click', e=>{

            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));
        });

        this.el.btnAttachPhoto.on('click', e=>{

            this.el.inputPhoto.click();

        });
        // this.el.inputPhoto.on('change', e=>{
        //     console.log(this.el.inputPhoto.files);

        //     [...this.el.inputPhoto.files].forEach(file=> {

                

        //     });
        // });

       

        this.el.btnAttachCamera.on('click', e=> {

            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)'
            });

            this._camera = new CameraController(this.el.videoCamera);
        });

        this.el.btnClosePanelCamera.on('click',e=>{

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
            this._camera.stop();


        });

        this.el.btnTakePicture.on('click', e=>{

           let dataUrl = this._camera.takePicture();
           this.el.pictureCamera.src = dataUrl;
           this.el.pictureCamera.show();
           this.el.videoCamera.hide();
           this.el.btnReshootPanelCamera.show();
           this.el.containerTakePicture.hide();
           this.el.containerSendPicture.show();

           
        });

        this.el.btnReshootPanelCamera.on('click', e=>{
            
           this.el.pictureCamera.hide();
           this.el.videoCamera.show();
           this.el.btnReshootPanelCamera.hide();
           this.el.containerTakePicture.show();
           this.el.containerSendPicture.hide();

        });

        this.el.btnSendPicture.on('click', e=>{
           

        });
        /*
        this.el.btnAttachDocument.on('click', e=> {

            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open')
            this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 120px)'
            });
            
            this.el.inputDocument.click();

        });
        
        this.el.inputDocument.on('change', e=>{
            if(this.el.inputDocument.files.length){

                this.el.panelDocumentPreview.css({
                    'height': '1%'
                });

                let file = this.el.inputDocument.files[0];
                this._documentPreviewController = new DocumentPreviewController(file);


                this._documentPreviewController.getPreviewData().then(result =>{

                    this.el.imgPanelDocumentPreview.src = result.src;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.imagePanelDocumentPreview.show();
                    this.el.filePanelDocumentPreview.hide();

                    this.el.panelDocumentPreview.css({
                        'height': 'calc(100% - 120px)'
                    });
                }).catch(err=>{

                    this.el.panelDocumentPreview.css({
                        'height': 'calc(100% - 120px)'
                    });
                    localStorage.setItem('type', file.type);
                   switch (file.type) {

                        case'application/vnd.ms-excel':
                        case'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';
                        break;

                        case'application/vnd.ms-powerpoint':
                        case'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                        this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
                        break;

                        case'application/msword':
                        case'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                        break;

                        default:
                        this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                        break;
                   } 
                   this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                   this.el.imagePanelDocumentPreview.hide();
                    this.el.filePanelDocumentPreview.show();
                });
            }    
        });
*/
        this.el.btnClosePanelDocumentPreview.on('click', e=>{
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();


        });
/*
        this.el.btnSendDocument.on('click', e=>{
            console.log('enviou documento')
        });
*/

        this.el.btnSendMicrophone.on('click', e=>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            

            this._microphoneController = new MicrophoneController();

            this._microphoneController.startRecorder();

            this._microphoneController.on('ready', audio=>{
                
             
                this._microphoneController.startRecorder();
            });

            this._microphoneController.on('recordtimer', timer =>{

                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
            });
        });

        this.el.btnCancelMicrophone.on('click', e=>{

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();

        });

       
       

        this.el.inputText.on('keypress', e => {

            if (e.key === 'Enter' && !e.ctrlKey){
                e.preventDefault();
                this.el.btnSend.click();
            }
        });

        this.el.inputText.on('keyup', e=> {

            if(this.el.inputText.innerHTML.length){

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            }else{
                this.el.inputPlaceholder.show();
                //this.el.btnSendMicrophone.show();
                //this.el.btnSend.hide();
            }
        });
         /*
        this.el.btnSend.on('click', e=>{

            

            console.log(this.el.inputText.innerHTML);
        });
        */
        this.el.btnEmojis.on('click', e =>{
            
            this.el.panelEmojis.toggleClass('open');

        }); 

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji=>{

            emoji.on('click', e=>{
               

                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name=>{
                    img.classList.add(name);
                });

                let cursor = window.getSelection();

                if(cursor.focusNode || !cursor.focusNode.id == 'input-text'){
                    
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                let range = document.createRange();
                range = cursor.getRangeAt(0);
                range.deleteContents();

                let frag  = document.createDocumentFragment();

                frag.appendChild(img);

                range.insertNode(frag);

                range.setStartAfter(img);

                this.el.inputText.dispatchEvent(new Event('keyup'));

            });
        });
        
        //document.addEventListener('DOMContentLoaded', function(){

            
            //consulta no firebase
            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).onSnapshot(function(doc){

                document.getElementById('input-name-panel-edit-profile').innerHTML = doc.data().nome;
            });
            /*
        firebase.firestore().collection('Usuarios').doc(localStorage.email).get().then(doc=>{

            if(!doc.exists){
    
                console.log('nao existe');
            }else{
                var EEmail = (doc.data().nome);
                console.log(EEmail);

                document.getElementById('input-name-panel-edit-profile').innerHTML = EEmail;
            }
        
            }).catch(err=>{
                console.log('error doido');
            });
            */

            //Pesquisa Contatos

           
                //Mostra contatos
           function getContacts(filter = ''){  
            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).get().then(doc =>{
                //console.log(doc.data().foto);
                if(doc.data().foto){
            let foto2 = document.getElementById('my-photo').querySelector('img');
                    foto2.src = doc.data().foto;
                    foto2.show();   
                }

            });
             /*
             //FAZ FOTO DO CONTATO APARECER
       firebase.firestore().collection('Usuarios').doc(btoa(localStorage.contact)).get().then(infoContact =>{
        console.log(infoContact.data().foto);
         if(infoContact.data().foto){

             console.log('fiz o role da foto');
             firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(contact.email)).set({

                 foto: infoContact.data().foto
             }, {

                 merge: true
             });   
         }
     });
     */

   
           document.getElementById('contacts-messages-list').innerHTML = '';
           firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').where('nome', '>=', filter).onSnapshot(docs =>{
           // document.getElementById('contacts-messages-list').innerHTML = '';
           document.getElementById('contacts-messages-list').innerHTML = '';
            docs.forEach(doc=>{
                function dateToTime2(date, locale = 'pt-BR'){
                    return date.toLocaleTimeString(locale, {
                        hour: '2-digit',
                        minute: '2-digit'
                        
                    });
                  }

                function timeStampToTime2(timeStamp){
                    return (timeStamp && typeof timeStamp.toDate === 'function')? 
                    dateToTime2(timeStamp.toDate()) : '';
                }
               let contact = doc.data();
               
               let div = document.createElement('div');

               div.className = 'contact-item';
       
               div.innerHTML= `
               <div class="dIyEr" id="_${contact.chatId}">
                   <div class="_1WliW" style="height: 49px; width: 49px;" >
                       <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                       <div class="_3ZW2E">
                           <span data-icon="default-user" class="">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                   <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                   <g fill="#FFF">
                                       <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                   </g>
                               </svg>
                           </span>
                       </div>
                   </div>
               </div>
               <div class="_3j7s9">
                   <div class="_2FBdJ">
                       <div class="_25Ooe">
                           <span dir="auto" title="${contact.nome}" class="_1wjpf">${contact.nome}</span>
                       </div>
                       <div class="_3Bxar">
                           <span class="_3T2VG">${timeStampToTime2(contact.lastMessageTime)}</span>
                       </div>
                   </div>
                   <div class="_1AwDx">
                   
                       <div class="_itDl">
                           <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>
       
                           <span class="_2_LEW last-message">
                               <div class="_1VfKB">
                               <!-- <span data-icon="status-dblcheck" class=""> -->
                               <!--    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"> -->
                               <!--     <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path> -->
                               <!--   </svg> -->
                               <!--  </span> -->
                               </div>
                               <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                               <div class="_3Bxar">
                                   <span>
                                       <div class="_15G96">
                                           <span class="OUeyt messages-count-new" id="${contact.email}" style="display:none;">!</span>
                                       </div>
                               </span></div>
                               </span>
                       </div>
                      
                   </div>
               </div>`
               ; 
      

        //    }
            //    if(contact.contador>0){
            //     // document.getElementById('contador').css({

            //     //     display: 'block'
            //     // });

            //     let divCont = document.createElement('div');

            //    divCont.className = '_15G96';

            //    divCont.innerHTML= ` 
            //                 <!-- CONTADOR -->
            //                 <div id="contador" style="display:block; float: right; border: 2px solid #C18F2E;
            //             width: 30px;
            //             height: 30px;
            //             background-color: #222021;
            //             border-radius: 5px; text-align: center; position: relative">
            //             <a style= color:#C18F2E; float: left;
            //         height: 50%;
            //         width: 100%;
            //         margin-top: 15%" > <b>!</b> </a>
            //         </div>
            //         <!-- FIMCONTADOR -->
               
            //    `
            //    document.getElementById('_3Bxar').appendChild(divCont);
            // }
               
                   firebase.firestore().collection('Usuarios').doc(btoa(contact.email)).get().then(verFoto =>{
                    if(verFoto.data().foto){ 
                   
                   let img = div.querySelector('.photo');
                   img.src = verFoto.data().foto;
                   img.show();
               }

              
                       if(contact.contador>0){
                document.getElementById(contact.email).css({

                    display: 'block'
                });
               }
            });

               //clica na div do contato

               
               
                 
               // evento click no contato 
               let aux;
               // let contador;
                
               div.on('click', e =>{
                // contador = 0;
                
                firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(contact.email)).set({
                   contador: 0
                }, {
                    merge: true
                }).then(()=>{

                   
                });
               

                aux = 1;
                document.getElementById('active-name').innerHTML = contact.nome;
                //document.getElementById('active-status').innerHTML = contact.status;
               // document.getElementById('active-email2').innerHTML = contact.email;
                localStorage.setItem('contact', contact.email);
                
                document.getElementById('active-email2').css({

                    display: 'none'
                });
                document.getElementById('active-status').css({

                    display: 'none'
                });

                
                firebase.firestore().collection('Usuarios').doc(btoa(contact.email)).get().then(verFoto =>{
                    if(verFoto.data().foto){ 
                    let img = document.getElementById('active-photo');
                    img.src = verFoto.data().foto;
                   img.show();
                }
            });
                
                

                document.getElementById('home').hide();
                document.getElementById('main').css({

                    display: 'flex'
                });
                    // captura e envia mensagem txt
                   
                document.getElementById('btn-send').onclick = function(e){
                    
                    let txt;
                    txt = document.getElementById('input-text').innerHTML;
                  
    
                    document.getElementById('input-text').innerHTML = "";
                    document.getElementById('panel-emojis').removeClass('open');
                   
                    // captura e envia mensagem txt
                   
        

                        // grava mensagem no firebase
                        //firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(contact.email)).get().then(chatid =>{
                          //  let chat = chatid.data();
                           // new Promise ((s,f)=>{
                              
                                // TENHO QUE VIR AQUI 
                               firebase.firestore().collection('Chats').doc(localStorage.chatAux).get().then(a=>{
                                let cont = a.data();

                               // msgCont = cont.contMsg;
                            
                            
                            firebase.firestore().collection('Chats').doc(localStorage.chatAux).collection('Mensagens').add({
                                from: localStorage.email,
                                txt,
                                timeStamp: new Date(),
                                status: 'wait',
                                type: 'txt',
                                contMsg: cont.contMsg
    
                            }).then(result=>{

                                
                                result.parent.doc(result.id).set({
                                    status:'sent'
                                }, {
                                    merge: true
                                }).then(()=>{

                                   // s();
                                });

    
                                firebase.firestore().collection('Chats').doc(localStorage.chatAux).set({
                                    contMsg: cont.contMsg+1
                                },{
                                    merge: true
                                });
    
                            });
                        });
                            // PAREI AQUI
                            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(contact.email)).set({
                                lastMessage: txt,
                                lastMessageTime: new Date()
                            }, {
                                merge: true
                            }).then(()=>{

                               // s();
                            });                   
                      // });
                   // });
                       //fim grava mensagem no firebase                  
                   }

                   
                        //getRef() = firebase.firestore().collection('Chats')

                        //Mostra mensagem na tela 

                        let chatAux;
                        if(aux===1){
                            
                           // chatAux = contact.chatId;
                            //caso nao esteja funcionando ativar os dois comandos
                            localStorage.setItem('chatAux', contact.chatId); //<-- ESSE 1
                            
                            aux = 0;
                         }
                              // if(localStorage.chatAux === contact.chatId){ // <-- ESSE 2
                            
                            //if(chatAux === contact.chatId){
                                
                                
                        firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(localStorage.contact)).get().then(chatid =>{
                            let chat = chatid.data();
                           
                            

                                //msgCont = cont.contMsg;
                           
                            //if(localStorage.chatAux == contact.chatId){
                                //console.log(localStorage.chatAux, contact.chatId, 'antes do onSnapshot');
                        firebase.firestore().collection('Chats').doc(localStorage.chatAux).collection('Mensagens').orderBy('contMsg')
                        .onSnapshot(docs =>{
                            
                            
                            if(localStorage.chatAux == contact.chatId){
                            //console.log(localStorage.chatAux, contact.chatId);
                            
                            // if(docs){
                            //     console.log('tem mensagem');
                            // }
                            //console.log(chatAux, chat.email);
                           //if(chat.chatId === docs.data().id){}
                            //scroll 
                            let scrollTop = document.getElementById('panel-messages-container').scrollTop;
                            let scrollTopMax = (document.getElementById('panel-messages-container').scrollHeight -
                                            document.getElementById('panel-messages-container').offsetHeight);
                            let autoScroll = (scrollTop >= scrollTopMax);                  
                            //fim do scroll

                            document.getElementById('panel-messages-container').innerHTML = "";
                            //document.getElementById('panel-messages-container').innerHTML = ""; <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                            docs.forEach(docs =>{
                                
                                let data = docs.data();
                         
                                //atualiza segundos pra horas

                
                                  function dateToTime(date, locale = 'pt-BR'){
                                    return date.toLocaleTimeString(locale, {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                        
                                    });
                                  }

                                  function timeStampToTime(timeStamp){
                                      return (timeStamp && typeof timeStamp.toDate === 'function')? 
                                      dateToTime(timeStamp.toDate()) : '';
                                  }

                                 
                                //Fim atualiza segundos pra horas
                                
                                
                                function getStatusViewElement(){
                
                                    let div = document.createElement('div');
                                    div.className = 'message-status';
                                      switch (data.status){
                      
                                          case 'wait':
                                                      div.innerHTML = `
                                                        <span data-icon="msg-time">
                                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                                          <path fill="#859479" d="M9.75 7.713H8.244V5.359a.5.5 0 0 0-.5-.5H7.65a.5.5 0 0 0-.5.5v2.947a.5.5 0 0 0 .5.5h.094l.003-.001.003.002h2a.5.5 0 0 0 .5-.5v-.094a.5.5 0 0 0-.5-.5zm0-5.263h-3.5c-1.82 0-3.3 1.48-3.3 3.3v3.5c0 1.82 1.48 3.3 3.3 3.3h3.5c1.82 0 3.3-1.48 3.3-3.3v-3.5c0-1.82-1.48-3.3-3.3-3.3zm2 6.8a2 2 0 0 1-2 2h-3.5a2 2 0 0 1-2-2v-3.5a2 2 0 0 1 2-2h3.5a2 2 0 0 1 2 2v3.5z"></path>
                                                      </svg>
                                                  </span>
                                                  `
                                          break;
                      
                                          case 'sent':
                                                  div.innerHTML = `
                                                  
                                                          <span data-icon="msg-check">
                                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                                                  <path fill="#92A58C" d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                                              </svg>
                                                          </span>
                                              
                                                  `
                                          break;
                      
                                          case 'received':
                                                      div.innerHTML = `
                                                              <span data-icon="msg-dblcheck">
                                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                                                  <path fill="#92A58C" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                                              </svg>
                                                          </span>
                                                      `   
                                          break;
                      
                                          case 'read':
                                                  div.innerHTML = `
                                                              
                                                  <span data-icon="msg-dblcheck-ack">
                                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15">
                                                          <path fill="#4FC3F7" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                                      </svg>
                                                  </span>
                                     
                                      `
                                          break;

                                          
                                      }
                                     
                                      return div;
                                      
                                  }
                                  

                                    
                                if(!document.getElementById('panel-messages-container').querySelector('#_'+ docs.id)){  

                                     //Mostra status da mensagem
                                      // upa imgem no storage
                                      /*
                                        get; preview(); {return this._data.preview;}
                                        set; preview(); { return this._data.preview = value}

                                        */
                                       firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).get().then(user =>{ 
                                           localStorage.setItem('userFoto', user.data().foto);
                                       });
                                      function getViewElement(me, type){

                                        let div = document.createElement('div');
                                        div.className = 'message';
                                
                                        switch(type){
                                
                                           case 'txt':
                                           
                                           div.innerHTML = `    
                                    
                                           <div class="font-style _3DFk6 tail" id="_${docs.id}">
                                           <span class="tail-container"></span>
                                           <span class="tail-container highlight"></span>
                                           <div class="Tkt2p">
                                               <div class="_3zb-j ZhF0n">
                                                   <span dir="ltr" class="selectable-text invisible-space message-text">${data.txt}</span>
                                               </div>
                                               <div class="_2f-RV">
                                                   <div class="_1DZAH">
                                                       <span class="message-time">${timeStampToTime(data.timeStamp)}</span>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                             
                                       
                                           `;
                                           break;
                                            case 'image':
                                            
                                                div.innerHTML = `    
                                                <div class="_3_7SH _3qMSo " id="_${docs.id}">
                                                    <div class="KYpDv">
                                                        <div>
                                                            <div class="_3v3PK" style="width: 330px; height: 330px;">
                                                                <div class="_34Olu">
                                                                    <div class="_2BzIU">
                                                                        <div class="_2X3l6">
                                                                            <svg class="_1UDDE" width="50" height="50" viewBox="0 0 43 43">
                                                                                <circle class="_3GbTq _2wGBy" cx="21.5" cy="21.5" r="20" fill="none" stroke-width="3"></circle>
                                                                            </svg>
                                                                        </div>
                                                                        <div class="_1l3ap">
                                                                            <span data-icon="media-disabled" class="">
                                                                                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44">
                                                                                    <path fill="#FFF" fill-opacity=".4" d="M29.377 16.099l-1.475-1.475L22 20.525l-5.901-5.901-1.476 1.475L20.525 22l-5.901 5.901 1.476 1.475 5.9-5.901 5.901 5.901 1.475-1.475L23.475 22l5.902-5.901z"></path>
                                                                                </svg>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <img src="${data.content}" class="_1JVSX message-photo" style="width: 100%; display:none">
                                                                <div class="_1i3Za"></div>
                                                            </div>
                                                            
                                                            <div class="_2TvOE">
                                                                <div class="_1DZAH text-white" role="button">
                                                                    <span class="message-time">${timeStampToTime(data.timeStamp)}</span>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                
                                                    <div class="_3S8Q-" role="button">
                                                        <span data-icon="forward-chat">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25">
                                                                <path fill="#FFF" d="M14.2 9.5V6.1l5.9 5.9-5.9 6v-3.5c-4.2 0-7.2 1.4-9.3 4.3.8-4.2 3.4-8.4 9.3-9.3z"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                   
                                                   <!--  <a href="${data.content}" download="imagem.jpg">download</a> -->
                                                </div>
                                                
                                                `;
                                            

                                                div.children[0].on('click', e =>{
                                                    window.open(data.content);
                                                    /*
                                                    closeAllMainPanel2();
                                                    document.getElementById('panel-document-preview').addClass('open');
                                                    document.getElementById('panel-document-preview').css({
                                                        'height': 'calc(100% - 120px)'
                                                    });
                                                  document.getElementById('btn-send-document').hide();
                                                    document.getElementById('img-panel-document-preview').src = data.content;

                                                    
                                                    document.getElementById('tamanho').css({

                                                        height: '140%', 
                                                        width: '100%',
                                                       

                                    
                                                    });
                                                    // document.getElementById('img-panel-document-preview').css({

                                                    //     height: '100%', 
                                                    //     width: '100%',
                                                    //     marginTop: '-100px'

                                    
                                                    // });
                                                    document.getElementById('image-panel-document-preview').show();
                                                    document.getElementById('info-panel-document-preview').hide();
                                                    */
                                                });
                                                div.querySelector('.message-photo').on('load', e=>{
                                                    div.querySelector('.message-photo').show();
                                                    div.querySelector('._34Olu').hide();
                                                    div.querySelector('._3v3PK').css({
                                                        height:'auto'
                                                    });

                                                    
                                                });
                                            break;
                                
                                            case'document':

                                            
                                                div.innerHTML = `    
                                                <div class="_3_7SH _1ZPgd "id="_${docs.id}">
                                                    <div class="_1fnMt _2CORf">
                                                        <a class="_1vKRe" href="#">
                                                            <div class="_2jTyA" style="background-image: url()"></div>
                                                            <div class="_12xX7">
                                                                <div class="_3eW69">
                                                                    <div class="JdzFp message-file-icon ${data.icon}"></div>
                                                                </div>
                                                                <div class="nxILt">
                                                                    <span dir="auto" class="message-filename">${data.filename}</span>
                                                                </div>
                                                                <div class="_17viz">
                                                                    <span data-icon="audio-download" class="message-file-download">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="34" height="34">
                                                                            <path fill="#263238" fill-opacity=".5" d="M17 2c8.3 0 15 6.7 15 15s-6.7 15-15 15S2 25.3 2 17 8.7 2 17 2m0-1C8.2 1 1 8.2 1 17s7.2 16 16 16 16-7.2 16-16S25.8 1 17 1z"></path>
                                                                            <path fill="#263238" fill-opacity=".5" d="M22.4 17.5h-3.2v-6.8c0-.4-.3-.7-.7-.7h-3.2c-.4 0-.7.3-.7.7v6.8h-3.2c-.6 0-.8.4-.4.8l5 5.3c.5.7 1 .5 1.5 0l5-5.3c.7-.5.5-.8-.1-.8z"></path>
                                                                        </svg>
                                                                    </span>
                                                                    <div class="_3SUnz message-file-load" style="display:none">
                                                                        <svg class="_1UDDE" width="32" height="32" viewBox="0 0 43 43">
                                                                            <circle class="_3GbTq _37WZ9" cx="21.5" cy="21.5" r="20" fill="none" stroke-width="3"></circle>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                        <div class="_3cMIj">
                                                            <span class="PyPig message-file-info">${data.info}</span>
                                                            <span class="PyPig message-file-type">${data.fileType}</span>
                                                            <span class="PyPig message-file-size">${data.size}</span>
                                                        </div>
                                                        <div class="_3Lj_s">
                                                            <div class="_1DZAH" role="button">
                                                                <span class="message-time">${timeStampToTime(data.timeStamp)}</span>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                                `;

                                                div.children[0].onclick = function(e){
                                                    window.open(data.content);
                                                    //console.log(div.children[0]);
                                                }
                                                
                                                // div.on('click', e=>{
                                                //     window.open(data.content);
                                                // });


                                                
                                            break;
                                
                                            case 'audio':

                                              
                                            div.innerHTML = `   
                                                <div class="_3_7SH _17oKL " id="_${docs.id}">
                                                    <div class="_2N_Df LKbsn">
                                                        <div class="_2jfIu">
                                                            <div class="_2cfqh">
                                                                <div class="_1QMEq _1kZiz fS1bA">
                                                                    <div class="E5U9C">
                                                                        <svg class="_1UDDE audio-load" width="34" height="34" viewBox="0 0 43 43">
                                                                            <circle class="_3GbTq _37WZ9" cx="21.5" cy="21.5" r="20" fill="none" stroke-width="3"></circle>
                                                                        </svg>
                                                                        <button class="_2pQE3 audio-play" style="display:none">
                                                                            <span data-icon="audio-play">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="34" height="34">
                                                                                    <path fill="#263238" fill-opacity=".5" d="M8.5 8.7c0-1.7 1.2-2.4 2.6-1.5l14.4 8.3c1.4.8 1.4 2.2 0 3l-14.4 8.3c-1.4.8-2.6.2-2.6-1.5V8.7z"></path>
                                                                                </svg>
                                                                            </span>
                                                                        </button>
                                                                        <button class="_2pQE3 audio-pause" style="display:none">
                                                                            <span data-icon="audio-pause">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="34" height="34">
                                                                                    <path fill="#263238" fill-opacity=".5" d="M9.2 25c0 .5.4 1 .9 1h3.6c.5 0 .9-.4.9-1V9c0-.5-.4-.9-.9-.9h-3.6c-.4-.1-.9.3-.9.9v16zm11-17c-.5 0-1 .4-1 .9V25c0 .5.4 1 1 1h3.6c.5 0 1-.4 1-1V9c0-.5-.4-.9-1-.9 0-.1-3.6-.1-3.6-.1z"></path>
                                                                                </svg>
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="_1_Gu6">
                                                                        <div class="message-audio-duration">0:00</div>
                                                                        <div class="_1sLSi">
                                                                            <span class="nDKsM" style="width: 0%;"></span>
                                                                            <input type="range" min="0" max="100" class="_3geJ8" value="0">
                                                                            <audio src="${data.content}" preload="auto"></audio>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="_1mbqw">
                                                                <div class="QnDup">
                                                                    <span data-icon="ptt-out-blue">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 26" width="19" height="26">
                                                                            <path fill="#DDF6C9" d="M9.217 24.401c-1.158 0-2.1-.941-2.1-2.1v-2.366c-2.646-.848-4.652-3.146-5.061-5.958l-.052-.357-.003-.081a2.023 2.023 0 0 1 .571-1.492c.39-.404.939-.637 1.507-.637h.3c.254 0 .498.044.724.125v-6.27A4.27 4.27 0 0 1 9.367 1a4.27 4.27 0 0 1 4.265 4.265v6.271c.226-.081.469-.125.723-.125h.3c.564 0 1.112.233 1.501.64s.597.963.571 1.526c0 .005.001.124-.08.6-.47 2.703-2.459 4.917-5.029 5.748v2.378c0 1.158-.942 2.1-2.1 2.1h-.301v-.002z"></path>
                                                                            <path fill="#03A9F4" d="M9.367 15.668a2.765 2.765 0 0 0 2.765-2.765V5.265a2.765 2.765 0 0 0-5.529 0v7.638a2.764 2.764 0 0 0 2.764 2.765zm5.288-2.758h-.3a.64.64 0 0 0-.631.598l-.059.285a4.397 4.397 0 0 1-4.298 3.505 4.397 4.397 0 0 1-4.304-3.531l-.055-.277a.628.628 0 0 0-.629-.579h-.3a.563.563 0 0 0-.579.573l.04.278a5.894 5.894 0 0 0 5.076 4.978v3.562c0 .33.27.6.6.6h.3c.33 0 .6-.27.6-.6V18.73c2.557-.33 4.613-2.286 5.051-4.809.057-.328.061-.411.061-.411a.57.57 0 0 0-.573-.6z"></path>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="_2fuJy">
                                                                <div class="_1WliW" style="height: 55px; width: 55px;">
                                                                    <img src="#" class="Qgzj8 gqwaM message-photo" style="display:none">
                                                                    <div class="_3ZW2E">
                                                                        <span data-icon="default-user">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                                                                <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                                                                <g fill="#FFF">
                                                                                    <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                                                                </g>
                                                                            </svg>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="_27K_5">
                                                            <div class="_1DZAH" role="button">
                                                                <span class="message-time">17:48</span>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                
                                                    <div class="_3S8Q-" role="button">
                                                        <span data-icon="forward-chat">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="25" height="25">
                                                                <path fill="#FFF" d="M14.2 9.5V6.1l5.9 5.9-5.9 6v-3.5c-4.2 0-7.2 1.4-9.3 4.3.8-4.2 3.4-8.4 9.3-9.3z"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                           
                                                `;
                                                if(data.from === localStorage.email){
                                                    firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).get().then(verFoto =>{
                                                        if(verFoto.data().foto){ 
                                                    
                                                        let img = div.querySelector('.message-photo');
                                                        img.src = verFoto.data().foto;
                                                        img.show();
                                                    }
                                                }); 
                                        }else{
                                            firebase.firestore().collection('Usuarios').doc(btoa(contact.email)).get().then(verFoto =>{
                                                if(verFoto.data().foto){ 
                                            
                                                let img = div.querySelector('.message-photo');
                                                img.src = verFoto.data().foto;
                                                img.show();
                                            }
                                        });
                                        }

                                                let audioEl = div.querySelector('audio');
                                                let loadEl = div.querySelector('.audio-load');
                                                let btnPlay = div.querySelector('.audio-play');
                                                let btnPause = div.querySelector('.audio-pause');
                                                let inputRange = div.querySelector('[type=range]');
                                                let audioDuration = div.querySelector('.message-audio-duration');
                                                let aux =0;
                                                
                                                //if(aux === 0){
                                                audioEl.onloadeddata = e=>{
                                                    loadEl.hide();
                                                    btnPlay.show();
                                                    //aux = 1;
                                                }
                                           //}
                                            //btnPlay.show();
                                                audioEl.onplay = e => {
                                                    btnPlay.hide();
                                                    btnPause.show();
                                                }

                                                audioEl.onpause = e => {
                                                    audioDuration.innerHTML = Format.toTime(data.duration*1000);
                                                    btnPlay.show();
                                                    btnPause.hide();
                                                }

                                                audioEl.onended = e => {
                                                    audioEl.currentTime = 0;
                                                }

                                                audioEl.ontimeupdate = e => {
                                                    btnPlay.hide();
                                                    btnPause.hide();
                                                    audioDuration.innerHTML = Format.toTime(audioEl.currentTime * 1000);
                                                    inputRange.value = (audioEl.currentTime * 100) / data.duration; 
                                                   
                                                    if(audioEl.paused){
                                                        btnPlay.show();

                                                    }else {
                                                        btnPause.show();
                                                    }
                                                }

                                                btnPlay.on('click', e=>{
                                                    audioEl.play();
                                                   
                                                    
                                                });

                                                btnPause.on('click', e=>{
                                                    audioEl.pause();
                                                });

                                                inputRange.on('change', e=>{
                                                    audioEl.currentTime = (inputRange.value * data.duration)/100;
                                                    
                                                });
                                               // btnPlay.show();
                                           
                                            break;
                                
                                            default:
                                            div.innerHTML = `    
                                            <div class="font-style _3DFk6 tail" id="_${docs.id}">
                                                <span class="tail-container"></span>
                                                <span class="tail-container highlight"></span>
                                                <div class="Tkt2p">
                                                    <div class="_3zb-j ZhF0n">
                                                        <span dir="ltr" class="selectable-text invisible-space message-text">Oi!</span>
                                                    </div>
                                                    <div class="_2f-RV">
                                                        <div class="_1DZAH">
                                                            <span class="msg-time">11:33</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            `;
                                
                                
                                        }
                                
                                        let className = (me===0) ? 'message-out' : 'message-in';
                                
                                        div.firstElementChild.classList.add(className);
                                        if(me===0){div.querySelector('.message-time').parentElement.appendChild(getStatusViewElement());}
                                        
                                        document.getElementById('panel-messages-container').appendChild(div);
                                        return div;
                                
                                    }

                                    function closeAllMainPanel2(){
                                        document.getElementById('panel-messages-container').hide();
                                        document.getElementById('panel-document-preview').removeClass('open');
                                        document.getElementById('panel-camera').removeClass('open');
                                       }

                                    //TO AQUI  


                                    function send(chatId, from, type, content, fileType){

                                        return new Promise((s,f)=>{
                                            firebase.firestore().collection('Chats').doc(localStorage.chatAux).get().then(a=>{
                                                let contx = a.data();
                                            firebase.firestore().collection('Chats').doc(chatId).collection('Mensagens').add({         
                                            from,
                                             content,
                                             timeStamp: new Date(),
                                              status: 'wait',
                                              type,
                                              fileType,
                                              contMsg: contx.contMsg
    
                            }).then(result=>{

                                
                                result.parent.doc(result.id).set({
                                    status:'sent'
                                }, {
                                    merge: true
                                }).then(()=>{

                                    s();
                                });

                                firebase.firestore().collection('Chats').doc(localStorage.chatAux).set({
                                    contMsg: contx.contMsg+1
                                },{
                                    merge: true
                                });

                            });
                        });
                    });
                    }    
                    
                    function send2(chatId, from, type, content){
                        
                        return new Promise((s,f)=>{
                            firebase.firestore().collection('Chats').doc(localStorage.chatAux).get().then(a=>{
                                let contx = a.data();
                            firebase.firestore().collection('Chats').doc(chatId).collection('Mensagens').add({         
                            from,
                             content,
                             timeStamp: new Date(),
                              status: 'wait',
                              type,
                              icon: localStorage.type,
                              contMsg: contx.contMsg 
                        

            }).then(result=>{

                    let docRef = result.parent.doc(result.id);
                docRef.set({
                    status:'sent'
                }, {
                    merge: true
                }).then(()=>{

                    s(docRef);
                });

                firebase.firestore().collection('Chats').doc(localStorage.chatAux).set({
                    contMsg: contx.contMsg+1
                },{
                    merge: true
                });
            });
        });
    });
    }               
                    let atoa = 0;
                                    function sendImage(chatId, from, file){
                                        return new Promise((s,f)=>{
                                            let uploadTask = firebase.storage().ref(from).child(Date.now() + '_' + file.name).put(file);
                                                //console.log(uploadTask.snapshot.getdownloadURL);
                                             
                                            
                                            uploadTask.on('state_changed', e=>{
                                             console.info('upload', e);
                                            }, err =>{
                                                console.error(err);
                                            }, () =>{

                                                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                                              send(chatId, from, 'image', downloadURL, "").then(()=>{

                                                firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(contact.email)).set({
                                                    lastMessage: 'foto',
                                                    lastMessageTime: new Date()
                                                }, {
                                                    merge: true
                                                }).then(()=>{
                    
                                                    s();
                                                });
                                                

                                                s();
                                                
                                                  
                                              });
                                              
                                            });
                                            
                                            //console.log(uploadTask.snapshot.downloadURL);
                                        });
                                            
                                    });
                                      

                                    }
                                    

                                    document.getElementById('input-photo').onchange = function(e){

                                        [...document.getElementById('input-photo').files].forEach(file=> {
                                            

                                                
                                                sendImage(chat.chatId, localStorage.email, file);

                                           


                                           
                                           

                                        });
                                    }
                                    function getMimetype(urlBase64){

                                        let regex = /^data:(.+); base64, (.*)$/;
                                        let result = urlBase64.match(regex);
                                        return result [1];
                                    }

                                    function toFile(urlBase64){
                                        let mimeType = getMimetype(urlBase64);
                                        let ext = mimeType.split('/')[1];
                                        let filename = `file${Date.now()}.${ext}`;

                                       return fetch(urlBase64)
                                        .then(res => {return res.arrayBuffer();})
                                        .then(buffer => {return new File ([buffer], filename, { type:mimeType}); });
                                    }

                                    function upload(file, from){

                                        return new Promise((s,f)=>{
                                            
                                            let uploadTask = firebase.storage().ref(from).child(Date.now() + '_' + file.name).put(file);
                                            //console.log(uploadTask.snapshot.getdownloadURL);
                                         
                                        
                                        uploadTask.on('state_changed', e=>{
                                         console.info('upload', e);
                                        }, err =>{
                                            f(err);
                                        }, () =>{

                                           s(uploadTask.snapshot);
                                        
                                        //console.log(uploadTask.snapshot.downloadURL);
                                    });
                                        });
                                       
                                    }
                                    function sendDocument(chatId, from, file){
                                        send2(chatId, from, 'document', '' ).then(msgRef =>{
                                           // toFile(preview).then(filePreview =>{
                                                upload(file, from).then(snapshot =>{
                                                    snapshot.ref.getDownloadURL().then(downloadURL => {
                                                    let downloadFile = downloadURL;
                                                    
                                                    //  upload(filePreview, from).then(snapshot2 =>{
                                                    //     snapshot2.ref.getDownloadURL().then(downloadURL2 => {

                                                    //      console.log(downloadFile);
                                                    //      let downloadPreview = downloadURL2;

                                                        
                                                        msgRef.set({
                                                            content: downloadFile,
                                                            //preview: downloadPreview,
                                                            filename: file.name,
                                                            size: file.size,
                                                            fileType: file.type,
                                                            status: 'sent'
                                                        }, {
                                                            merge: true
                                                        });
                                                 
                                                      });
                                                    // });
                                                });
                                            //});
    
                                        });
                                        
                                        ////////////////////////////////////////////
                                        firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(contact.email)).set({
                                            lastMessage: 'Documento',
                                            lastMessageTime: new Date()
                                        }, {
                                            merge: true
                                        }).then(()=>{
            
                                          
                                        });
                                      

                                    }
                                    document.getElementById('btn-attach-document').onclick = function(e){

                                        closeAllMainPanel2();
                                        document.getElementById('panel-document-preview').addClass('open');
                                        document.getElementById('panel-document-preview').css({

                                            'height': 'calc(100% - 120px)'
                                        });

                                        document.getElementById('input-document').click();
                                    }

                                    document.getElementById('input-document').onchange = function(e){
                                       
                                            if(document.getElementById('input-document').files.length){

                                                document.getElementById('panel-document-preview').css({
                                                    'height': '1%'
                                                });

                                                let file = document.getElementById('input-document').files[0];

                                                this._documentPreviewController = new DocumentPreviewController(file);

                                                this._documentPreviewController.getPreviewData().then(result =>{

                                                    document.getElementById('img-panel-document-preview').src = result.src;
                                                    document.getElementById('info-panel-document-preview').innerHTML = result.info;
                                                    document.getElementById('image-panel-document-preview').show();
                                                    document.getElementById('file-panel-document-preview').hide();

                                                    document.getElementById('panel-document-preview').css({
                                                        'height': 'calc(100% - 120px)'
                                                    });
                                                }).catch(err=>{
                                                    document.getElementById('panel-document-preview').css({
                                                        'height': 'calc(100% - 120px)'
                                                    }); 

                                                    //localStorage.setItem('type', file.type);
                                                    switch (file.type) {
                                                         case 'application/pdf':
                                                         localStorage.setItem('type', 'jcxhw icon-doc-pdf');
                                                         document.getElementById('icon-panel-document-preview').className = 'jcxhw icon-doc-pdf';

                                                         break;
                                                        
                                                        case'application/vnd.ms-excel':
                                                        case'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                                                        // let icon = 'jcxhw icon-doc-xls'
                                                         localStorage.setItem('type', 'jcxhw icon-doc-xls');
                                                        document.getElementById('icon-panel-document-preview').className = 'jcxhw icon-doc-xls';
                                                        break;
                                
                                                        case'application/vnd.ms-powerpoint':
                                                        case'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                                                        // let icon = 'jcxhw icon-doc-ppt'
                                                         localStorage.setItem('type', 'jcxhw jcxhw icon-doc-ppt');
                                                        document.getElementById('icon-panel-document-preview').className = 'jcxhw icon-doc-ppt';
                                                        break;
                                
                                                        case'application/msword':
                                                        case'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                                                        // let icon = 'jcxhw icon-doc-doc'
                                                        
                                                         localStorage.setItem('type', 'jcxhw icon-doc-doc' );
                                                        document.getElementById('icon-panel-document-preview').className = 'jcxhw icon-doc-doc';
                                                        break;
                                
                                                        default:
                                                        // let icon = 'jcxhw icon-doc-generic'
                                                         localStorage.setItem('type', 'jcxhw icon-doc-generic');
                                                        document.getElementById('icon-panel-document-preview').className = 'jcxhw icon-doc-generic';
                                                        break;
                                                   } 
                                                   
                                                   document.getElementById('filename-panel-document-preview').innerHTML = file.name;
                                                   document.getElementById('image-panel-document-preview').hide();
                                                   document.getElementById('file-panel-document-preview').show();
                                                });

                                                document.getElementById('btn-send-document').onclick = function(e){
                                                        let file = document.getElementById('input-document').files[0];
                                                        let base64 = document.getElementById('img-panel-document-preview').src;

                                                        // if(file.type === 'application/pdf' ){
                                                        //     toFile(base64).then(filePreview =>{
                                                        //     sendDocument(chat.chatId, localStorage.email, file, filePreview, document.getElementById('info-document-preview').innerHTML);
                                                        //     });

                                                        // }else{
                                                        //     sendDocument(chat.chatId, localStorage.email, file);  
                                                        // }
                                                        
    
                                                        sendDocument(chat.chatId, localStorage.email, file);
                                                        document.getElementById('btn-close-panel-document-preview').click();
                                                } 
                                            }

                                            
                                    }
                                let eu = 0;
                                 
                               // if(localStorage.chatAux === contact.chatId){


                                if(data.from === localStorage.email){ //mostra minha mensagem
                                    
                                  
                                      
                                    
                                       
                                        
                                        if(data.type === 'txt'){
                                           
                                            getViewElement(eu, data.type);
                                        
                                       
                                        }
    
                                        else if(data.type === 'image'){
                                            

                                            getViewElement(eu, data.type);
                                          
                                           
                                        }
    
                                        else if(data.type === 'document'){
                                            
                                           

                                            getViewElement(eu, data.type);
                                            
                                        }
    
                                        else if(data.type === 'audio'){
                                            getViewElement(eu, data.type);
    
                                        }
    
                                        else {
    
                                        }
                                      
                                    
                                    
                                
                                    
                                    
                                    //document.getElementById('panel-messages-container').innerHTML = '';

                                    //if(data.timeStamp && typeof data.timeStamp.toDate === 'function'){} 

                                 
                                    //contatoAtivo = contact.email;

                                    
                                   
                                    
                                

                                   
                                   

                                    //fim upa imagem no storage
                                }else{ //mensagem do contato
                                    eu = 1;
                                    
                                    if(data.type === 'txt'){
                                        docs.ref.set({
                                            status: 'read'
                                        }, {
                                            merge: true
                                        });
                                        getViewElement(eu, data.type);
                                        
                                    
                                   
                                    }

                                    else if(data.type === 'image'){
                                        docs.ref.set({
                                            status: 'read'
                                        }, {
                                            merge: true
                                        });
                                        getViewElement(eu, data.type);
                                    }

                                    else if(data.type === 'document'){
                                        docs.ref.set({
                                            status: 'read'
                                        }, {
                                            merge: true
                                        });
                                        getViewElement(eu, data.type);
                                    }

                                    else if(data.type === 'audio'){

                                        docs.ref.set({
                                            status: 'read'
                                        }, {
                                            merge: true
                                        });
                                        getViewElement(eu, data.type);
                                    }

                                    else {

                                    }
                                    /*
                                    let div = document.createElement('div');
                                    div.className = 'message';
                                    div.innerHTML = `    

                                    <div class="font-style _3DFk6 message-in tail" id="_${docs.id}">
                                        <span class="tail-container"></span>
                                        <span class="tail-container highlight"></span>
                                        <div class="Tkt2p">
                                            <div class="_3zb-j ZhF0n">
                                                <span dir="ltr" class="selectable-text invisible-space message-text">${data.txt}</span>
                                            </div>
                                            <div class="_2f-RV">
                                                <div class="_1DZAH">
                                                    <span class="message-time">${timeStampToTime(data.timeStamp)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                                      
                                
                                    `;
                                  
                                   document.getElementById('panel-messages-container').appendChild(div);
                                   
                                    // caso eu nao for o emissor adicionar
                                    */
                                }

                           // }
                            }else if(data.from === localStorage.email){
                                let msgEl = document.getElementById('panel-messages-container').querySelector('#_' + docs.id);
                                msgEl.querySelector('.message-status').innerHTML = getStatusViewElement().outerHTML;
                            }

                            
                            });

                           


                          //var unsubscribe = 
                        //    firebase.firestore().collection('Chats').doc(localStorage.chatAux).collection('Mensagens').orderBy('timeStamp')
                        //       .onSnapshot(()=>{
                           
                        //       });
                              //unsubscribe();
                              if(autoScroll){

                                document.getElementById('panel-messages-container').scrollTop = 
                                (document.getElementById('panel-messages-container').scrollHeight -
                                document.getElementById('panel-messages-container').offsetHeight);
                            }else{
                                document.getElementById('panel-messages-container').scrollTop = scrollTop;

                            }  
                            // firebase.firestore().collection('Chats').doc(localStorage.chatAux).collection('Mensagens').orderBy('timeStamp')
                            //       .onSnapshot(()=>{});
                        }else{

                            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(contact.email)).set({
                                contador: 1
                             }, {
                                 merge: true
                             }).then(()=>{
             
                                
                             });
                        }
                                  
                        });
                   
                        // fim mostra mensagem na tela
                        // let chatAntigo = chat.chatId;

                        //      firebase.firestore().collection('Chats').doc(chatAntigo).collection('Mensagens').orderBy('timeStamp')
                   // }   //          .onSnapshot(()=>{});
                });

            
            //}
        
            }); 
               //fim clica na div do contato

               
               document.getElementById('contacts-messages-list').appendChild(div);
              
               
            //this._microphoneController
        
           });
        
       });
    
    }
    getContacts();
        //pesquisa contatos 
    document.getElementById('input-search-contacts').onkeyup = function(e){
            
        if( document.getElementById('input-search-contacts').value.length > 0){
            document.getElementById('input-search-contacts-placeholder').hide();
        }else{
            document.getElementById('input-search-contacts-placeholder').show();
        }   

            
            getContacts(document.getElementById('input-search-contacts').value);
    }
       
        //});

        //Fim Consulta no Firebase

        document.getElementById('btn-save-panel-edit-profile').onclick = function(e){

            var editName = document.getElementById('input-name-panel-edit-profile').textContent;
            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).update({nome: editName});

       

            e.preventDefault();
        }

         // Configurando Audio 

         function send3(chatId, from, type, content){
            firebase.firestore().collection('Chats').doc(localStorage.chatAux).get().then(a=>{
                let contx = a.data();
            return new Promise((s,f)=>{
                firebase.firestore().collection('Chats').doc(chatId).collection('Mensagens').add({         
                from,
                 content,
                 timeStamp: new Date(),
                  status: 'wait',
                  type,
                  icon: localStorage.type,
                  contMsg: cont.contMsg 
            

}).then(result=>{

        let docRef = result.parent.doc(result.id);
    docRef.set({
        status:'sent'
    }, {
        merge: true
    }).then(()=>{

        s(docRef);
    });

    firebase.firestore().collection('Chats').doc(localStorage.chatAux).set({
        contMsg: cont.contMsg+1
    },{
        merge: true
    });
});
});
});
}         
        function upload2(file, from){

            return new Promise((s,f)=>{
                
                let uploadTask = firebase.storage().ref(from).child(Date.now() + '_' + file.name).put(file);
                //console.log(uploadTask.snapshot.getdownloadURL);
             
            
            uploadTask.on('state_changed', e=>{
             console.info('upload', e);
            }, err =>{
                f(err);
            }, () =>{

               s(uploadTask.snapshot);
            
            //console.log(uploadTask.snapshot.downloadURL);
        });
            });
           
        }

        

         function sendAudio(chatId, from, file, metadata, photo){
            
            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').doc(btoa(localStorage.contact)).set({
                lastMessage: 'Audio',
                lastMessageTime: new Date()
            }, {
                merge: true
            }).then(()=>{

              
            });
                return send3(chatId, from, 'audio', '').then(msgRef => {

                    upload2(file, from).then(snapshot=>{

                        //let downloadFile = snapshot.downloadURL;

                        snapshot.ref.getDownloadURL().then(downloadURL => {
                        msgRef.set({
                            content: downloadURL,
                           
                            size: file.size,
                            fileType: file.type,
                            status: 'sent',
                            photo,
                            duration: metadata.duration

                        }, {
                            merge: true
                        });
                    });
                    });
                });

             
        }

        this.el.btnFinishMicrophone.on('click', e=>{ 

            firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).get().then(user =>{
                    this._userr = user.data();
            }); 
                //function getContacts(filter = ''){  
                    let filter = '';
                // firebase.firestore().collection('Usuarios').doc(btoa(localStorage.email)).collection('Contatos').where('nome', '>=', filter).onSnapshot(docs =>{
                //     // document.getElementById('contacts-messages-list').innerHTML = '';
                //      docs.forEach(doc=>{
                     
                //         let contact = doc.data();
                //     });

                        this._microphoneController.on('recorded', (file, metadata)=>{
                
                            sendAudio(
                                localStorage.chatAux,
                                localStorage.email,
                                file,
                                metadata,
                                this._userr.foto = ''
            
                            );
                        });
                        
                        
                        this._microphoneController.stopRecorder();
                        this.closeRecordMicrophone();
                    });
               // }
        
           
             
        //}); 

        //getContacts();
     
         //FIm Configurando Audio 



        
    }
  
  

    
    closeRecordMicrophone(){

        this.el.recordMicrophone.hide();
       // this.el.btnSendMicrophone.show();
        
    }

    closeAllMainPanel(){ 
        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');
    }

    closeMenuAttach(e){
        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
        
    }

    closeAllLeftPanel(){

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();
    }

    
    
}