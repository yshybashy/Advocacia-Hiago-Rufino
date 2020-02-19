

 class indexController{
   
        
        constructor(){

            
            
         this.elementPrototype();
         this.loadElements();
         this.initEvents();
         
         

        
        }
        
        
        
        loadElements(){
            this.el = {};
            document.querySelectorAll('[id]').forEach(element=>{
    
                this.el[Formats.getCamelCase(element.id)] = element;
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

        
        
       

                var cont = 0;
                
                this.el.imguser.on('click', e =>{
                    
                    
                    if(cont === 0){
                    this.el.fntdroplogout.css({
                        display: 'flex'
                       
                    });
                    cont = 1;
                    
                }else{  
                        this.el.fntdroplogout.css({
                            display: 'none'
                           
                        });
                        cont = 0;
                        
                    }  
                });
                   
                this.el.logout.on('click', e=>{
                  

                    //Aparece botao entre em contato
                    document.getElementById('entreEmContato').css({ 

                        display: 'flex'
        
                    });
                    //FIM Aparece botao entre em contato

                    //logout do firebase
                    firebase.auth().signOut().then(() =>{
            
                        alert('Efetuada Saída, volte sempre!');
                        
                        this.el.imguser.css({
                            display: 'none'
                           
                        });
                        window.location="index.html";
                    });

                    
                    
                });
                var cont1 = 0;
               this.el.fntesquecisenha.on('click', e=>{
               
                if(cont1 === 0){
                    this.el.txtesquecisenhaemail.css({
                        display:'block'
                    });

                    this.el.btnesquecisenha.css({
                        display:'block'
                    });
                    cont1 = 1;


                    this.el.btnesquecisenha.on('click', e=>{

                        var EsqueciSenhaEmail = document.getElementById('txtEsqueciSenhaEmail').value;

                        if(EsqueciSenhaEmail===""){

                            alert('Por favor, informe o seu email');
                        }else{
                        //traduz email de redefiniçao de senha
                        firebase.auth().languageCode = 'pt';
                        firebase.auth().useDeviceLanguage();

                        firebase.auth().sendPasswordResetEmail(EsqueciSenhaEmail).then(()=> {

                            alert('Foi enviado para o seu email uma mensagem de redefinição de senha');
                        });

                        this.el.txtesquecisenhaemail.css({
                            display:'none'
                        });
    
                        this.el.btnesquecisenha.css({
                            display:'none'
                        });

                     }
                    });
                }else{
                    this.el.txtesquecisenhaemail.css({
                        display:'none'
                    });

                    this.el.btnesquecisenha.css({
                        display:'none'
                    });
                    cont1 = 0;
                }
                    
                    
               }); 

               document.getElementById('btnVideo').onclick = function(e){
                window.location="index.html";
               }  

    function validaCPF(cpf){
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
          return false;
    for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
        return false;
  }

  function getArtigo(){

    //  <div class="col-md-4 d-flex ftco-animate">
     // </div>
        firebase.firestore().collection('Blog').doc('Info').get().then(docx => {

            let info = docx.data();


         
      
        firebase.firestore().collection('Blog').doc('Info').collection('Artigos').orderBy("Data", "desc").limit(3).get().then(docs =>{
    
            docs.forEach(doc=>{
                let artigo = doc.data();
                
                function dateToTimeMes(date, locale = 'pt-BR'){
                    return date.toLocaleDateString(locale, {
                        // day: '2-digit',
                        // year: 'numeric',
                        month: 'long'
                        
                        
                    });
                  }
                  function dateToTimeAno(date, locale = 'pt-BR'){
                    return date.toLocaleDateString(locale, {
                        // day: '2-digit',
                        // year: 'numeric',
                        year: 'numeric'
                        
                        
                    });
                  }
                  function dateToTimeDia(date, locale = 'pt-BR'){
                    return date.toLocaleDateString(locale, {
                        // day: '2-digit',
                        // year: 'numeric',
                        day: '2-digit'
                        
                        
                    });
                  }
    
                let div = document.createElement('div');
                div.className = 'col-md-4 d-flex ftco-animate fadeInUp ftco-animated';
                div.innerHTML = `
                            <a href="#" >
                            <div class="blog-entry justify-content-end">
                            <img src="${artigo.foto}"  class="block-20"  ;">
                           
                            <div class="text p-4 float-right d-block">
                                <div class="topper d-flex align-items-center">
                                    <div class="one py-2 pl-3 pr-1 align-self-stretch">
                                        <span class="day">${dateToTimeDia(artigo.Data, 'pt-BR')}</span>
                                    </div>
                                    <div class="two pl-0 pr-3 py-2 align-self-stretch">
                                        <span class="yr" style="margin-left: 20%">${dateToTimeMes(artigo.Data, 'pt-BR')}</span>
                                        <span class="mos" style="margin-left: 20%">${dateToTimeAno(artigo.Data, 'pt-BR')}</span>
                                    </div>
                                </div>
                                <h3 class="heading mt-2"><a href="#">${artigo.titulo}</a></h3>
                                
                            </div>
                            </div>
                       
                        </a>
                `
                ;
    
                document.getElementById('listaArtigo').appendChild(div);
    
                
                div.on('click', e =>{
                    window.location="blog-single.html";
                    localStorage.setItem('blog', artigo.titulo);
                   

                });
    
                //console.log(dateToTime(artigo.Data, 'pt-BR'));
            });
        });
    
            

    });
    
        
    }
    getArtigo();
  

   //window.location="Chat.html";
   

  
                
      

            /* FAZER LOGGOUT DO USUARIO
            function logout(){

                firebase.auth().signOut().then(() =>{
            
                    alert('Usuário deslogou');
                });
            }    
       */
    function getArea(){
        firebase.firestore().collection('Area').doc('Info').collection('Atua').get().then(docx =>{

            docx.forEach(doc=>{
                let area = doc.data();

                let div = document.createElement('div');
                div.className = `col-md-3 col-lg-2 text-center`;
                div.innerHTML = `
                
        		<div class="practice-area ftco-animate fadeInUp ftco-animated">
        			<div class="icon d-flex justify-content-center align-items-center">
        				<span class="${area.icon}"></span>
        			</div>
        			<h3><a href="#">${area.titulo}</a></h3>
        		</div>
        	
                `;

                document.getElementById('listaArea').appendChild(div);

                div.on('click', e =>{
                    localStorage.setItem('area', area.titulo);
                    window.location="practice-single.html";
                    
                });
            });
        });
    }

     getArea(); 
      document.addEventListener('DOMContentLoaded', function(){
        var aux;
        var aux1;
        firebase.auth().onAuthStateChanged((usuario) => {

            if(usuario){

                //console.log(usuario.email);
                    aux1 = 0;
                    
                firebase.firestore().collection('Usuarios').doc(btoa(usuario.email)).get().then(user =>{

                    if(user.data().nome){
                    if(aux==1){
                        if(aux1==0){
                                window.location="Chat.html";
                               
                
                        }
                    }
                }
            }); 
                  //sumir com botao Entre em contato 
                  document.getElementById('entreEmContato').css({ 

                    display: 'none'

                });

                // fim sumir com botao entre em contato
                
                document.getElementById('imgUser').css({
                    display: 'flex'
                });
                //Verifica adm
               if(usuario.email === "hiago.rufino@hotmail.com"){

                

               }

               document.getElementById('consultoria').onclick = function(e){

                  window.location="Chat.html";
                  localStorage.setItem('email', usuario.email);

               }

               //Fim verifica adm 
               

                var cont = 0;
                
                document.getElementById('imgUser').onclick = function(e){
                    
                    
                    if(cont == 0){
                        document.getElementById('fntDropLogout').css({
                        display: 'flex'
                       
                    });
                    cont = 1;
                    
                }else{  
                    document.getElementById('fntDropLogout').css({
                            display: 'none'
                           
                        });
                        cont = 0;

                      
                        
                    }  

                    e.preventDefault();
                }
                 
                document.getElementById('logout').onclick = function(e) {
                  
                    //Aparece botao entre em contato
                    document.getElementById('entreEmContato').css({ 

                        display: 'flex'
        
                    });
                    //FIM Aparece botao entre em contato

                    //logout do firebase
                    firebase.auth().signOut().then(() =>{
            
                        
                        document.getElementById('fntDropLogout').css({
                            display: 'none'
                           
                        });

                      
                        
                    });
                    
                   
                    e.preventDefault();
                 
                }
                        
                   
    
                
                     
            }else{
                
                
              
                
                document.getElementById('btnLoginEntrar').onclick = function(e){
                    
   
                    var email = document.getElementById('loginEmail').value;
                    var senha = document.getElementById('loginSenha').value;
                   // localStorage.setItem('email', email);
                    firebase.auth().signInWithEmailAndPassword(email, senha).then(() =>{
                        
                       alert('Bem vindo!');
                
                      //sumir com botao Entre em contato 
                      document.getElementById('entreEmContato').css({ 
                
                       display: 'none'
                
                   });
                
                   // fim sumir com botao entre em contato
                
                       document.getElementById('imgUser').css({
                           display: 'flex'
                       });
                
                       localStorage.setItem('email', email);
                       aux = 1;
                
                    }).catch(err => {
                       alert('email ou senha inválidos');
                       console.log('error', err);
                   });
                  
                   
                   e.preventDefault();
                
                  
                  
                            
                           
                   
                    
                }

                document.getElementById('btnConcluir').onclick = function(e){

 
                    var cadNome = document.getElementById('cadNome').value;
                    var cadEmail = document.getElementById('cadEmail').value;
                    var cadSenha = document.getElementById('cadSenha').value;
                    var cadConfSenha = document.getElementById('cadConfSenha').value;
                    var cadCpf = document.getElementById('cadCpf').value;
             
                    //validaCPF(cadCpf);
                    let emailAdm = 'hiago.rufino@hotmail.com';
                   
                    if((validaCPF(cadCpf) == true)){
                       if(cadSenha == cadConfSenha){
             
                            //sumir com botao Entre em contato 
                            /*
                            var usuario = {
             
                                nome: cadNome, 
                                email: cadEmail,
                                cpf: cadCpf
                            }
                            */
                            // fim sumir com botao entre em contato
                           
                            firebase.auth().createUserWithEmailAndPassword(cadEmail, cadSenha).then(userr => {
                               
                                
                            //console.log('usuario', user);
                            
             
             
                            //Firebase
                           // let emailAdm = 'hiago.rufino@hotmail.com';
                                
                            firebase.firestore().collection('Usuarios').doc(btoa(cadEmail)).set({ 
                                nome: cadNome, 
                                email: cadEmail,
                                cpf: cadCpf
                               
                            }).then(user =>{ 
                               
                               
                           
                            });
                           /*
                            firebase.firestore().collection('Usuarios').doc(btoa('hiago.rufino@hotmail.com')).collection('Contatos').doc(btoa(cadEmail)).set({  
                                 nome: cadNome, 
                                email: cadEmail,
                                cpf: cadCpf
                            }).then(user =>{ 
                               
                                console.log('Criado contato');
                            });
*/                                                  


                            
                                

                               let users = {};

                            users[btoa(cadEmail)] = true;
                            users[btoa(emailAdm)] = true;
                            //getRef() = firebase.firestore().collection('Chats')
                            firebase.firestore().collection('Chats').add({
                                users,
                                timeStamp: new Date(),
                                contMsg: 0
                                


                                }).then(chat =>{
                                    alert('Cadastro efetuado com sucesso!');
                                    if(cadEmail!==emailAdm){
                                    firebase.firestore().collection('Usuarios').doc(btoa(cadEmail)).collection('Contatos').doc(btoa(emailAdm)).set({  
                                        nome: 'Hiago Rufino', 
                                        email: 'hiago.rufino@hotmail.com',
                                       chatId: chat.id
                                    
                                    });
                                }
                                    firebase.firestore().collection('Usuarios').doc(btoa(emailAdm)).collection('Contatos').doc(btoa(cadEmail)).set({  
                                        nome: cadNome, 
                                        email: cadEmail,
                                        cpf: cadCpf,
                                        chatId: chat.id
            
                                      });
                                       // console.log(chat.id);
                                       if(cadEmail!==emailAdm){
                                       window.location = 'chat.html';
                                    }
                                       aux = 1;
                                }).catch(err =>{
                                    alert(err);
                                });

                                
                              /*
                            firebase.firestore().collection('Chats').doc().get(function(doc){
                                firebase.firestore().collection('Usuarios').doc(btoa(cadEmail)).collection('Contatos').doc(btoa('hiago.rufino@hotmail.com')).set({  
                                    chatId: doc.id
                        
                                  });

                                  firebase.firestore().collection('Usuarios').doc(btoa('hiago.rufino@hotmail.com')).collection('Contatos').doc(btoa(cadEmail)).set({  
                                    chatId: idChat
        
                                  });
                            });

                           */
                           
                            
                       

                            
                             
                            // find(cadEmail, emailAdm);
                            //create(cadEmail, emailAdm );

                                            

                            document.getElementById('entreEmContato').css({ 
             
                                display: 'none'
             
                            });
                            //FIM Firebase
                         
                            
                           
                        }).catch(err => {
             
                            alert('Email já cadastrado');
                        });
                        
                        
                    }else{
             
                        alert('As senhas nao são iguais, por favor digite novamente');
                    }
                        
                    }else{
                        alert('Por favor, insira um CPF válido!');
                    }
                    //aux = 1;
                    localStorage.setItem('email', cadEmail);
                    e.preventDefault();
                    
                    }
                  
                
              
               
            }
                
            
              
             
           
            
    
        });


        
        //pega todos os usuarios

        /*
        firebase.firestore().collection('Usuarios').get().then(snapshot => {
            console.log(snapshot);
            snapshot.docs.forEach(user => {
                //pega o id de todos os usuarios
                console.log( );  

            }); 
        });
        */
      });

     
    }

/*
    get users() { return data.users;}
    set users(value){ return data.users = value;}

    get content() { return data.content;}
    set content(value){ return data.content = value;}

    get type() { return data.type;}
    set type(value){ return data.type = value;}

    get timeStamp() { return data.timeStamp;}
    set timeStamp(value){ return data.timeStamp = value;}

    get status() { return data.status;}
    set status(value){ return data.status = value;}

    get chatId() { return data.chatId;}
    set chatId(value){ return data.chatId = value;}

    static create(meuEmail, contatoEmail){

        
            let users = {};

            users[btoa(meuEmail)] = true;
            users[btoa(contatoEmail)] = true;
            //getRef() = firebase.firestore().collection('Chats')
            firebase.firestore().collection('Chats').add({
                users,
                timeStamp: new Date()

            });
               let idChat = firebase.firestore().collection('Chats').doc(doc.id).get();
               firebase.firestore().collection('Usuarios').doc(btoa(cadEmail)).collection('Contatos').doc(btoa(cadEmail)).set({  
                chatId: idChat
    
           });
              
           firebase.firestore().collection('Usuarios').doc(btoa('hiago.rufino@hotmail.com')).collection('Contatos').doc(btoa(cadEmail)).set({  
            chatId: idChat

       });
        

    }

    static find(meuEmail, contatoEmail){

        return firebase.firestore().collection('Chats').where(btoa(meuEmail), '==', true)
                                  .where(btoa(contatoEmail), '==', true)
                                  .get();
    }
   

    static createIfNotexists(meuEmail, contatoEmail){

        return new Promise((s,f)=>{
            find(meuEmail, contatoEmail).then(chats =>{
                if(chats.empty){
                    create(meuEmail, contatoEmail).then(chat=>{
                        s(chat);
                    });
                }else{
                    chats.forEach(chat =>{
                        s(chat);
                    });
                }

            }).catch(err=>{f(err)});
        });
        

    }
   */
}


  /*    
document.addEventListener('DOMContentLoaded', function(){

    
    firebase.auth().onAuthStateChanged((usuario) => {

        if(usuario){

            console.log('usuario', usuario);
     
        }else{

            console.log('nao ha usuarios logados');
           
        }
        

    });

    currentUser = firebase.auth().currentUser;

if(currentUser){
    console.log('currentUser', currentUser);
    
  
    //fazer update de dados do usuario
     currentUser.updateProfile({
            displayName: "Novo nome do usuario",
            photoURL: "endereço da nova foto do usuario"
     });

     currentUser.updateEmail('novo email do usuario');
     currentUser.updatePassword('nova senha do usuario');
     currentUser.updatePhoneNumber('novo numero do usuario');

     // delete usuario
     this.el.deletausuario('click', e=>{

        if (currentUser) {

            currentUser.delete().then(()=>{
                alert('usuario excluido');
            });
        }
     });



}


});

*/