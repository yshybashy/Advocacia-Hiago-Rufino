class AtuationController{
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
       

       

        //logout do firebase
        firebase.auth().signOut().then(() =>{

            alert('Usuário deslogou');
            
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


function enviarArquivo(){

    let titulo;
    let atua;
    
    var enviaArquivo = document.getElementById('addFotoAtua');
    // firebase.firestore().collection('Area').doc('Info').get().then(docx => {
    //     let info = docx.data();

        
    //     console.log(info.numArt);
  
    //Botao selecionar arquivo foto blog
    //enviaArquivo.onchange = function (event){
        titulo = document.getElementById('nome').value;
        atua = document.getElementById('atuacao').value;
       
        var arquivo = enviaArquivo.files[0];

       
        if(arquivo===undefined){ //verifica se tem foto 
            firebase.firestore().collection('Area').doc('Info').collection('Atua').doc(titulo).set({
                titulo: titulo,
                atua: atua,
                icon: localStorage.icon
               
                
         }).then(()=> {
    
            document.getElementById('btnClose').click();
            alert('Area de atuaçao adicionada sem foto');
            localStorage.setItem('icon', "");
         });
           }else{
            firebase.storage().ref('Area').child(titulo).put(arquivo).then(snapshot =>{
                firebase.storage().ref('Area').child(titulo).getDownloadURL().then(url => {
                    
                     firebase.firestore().collection('Area').doc('Info').collection('Atua').doc(titulo).set({
                            titulo: titulo,
                            artigo: atua,
                            foto: url,
                            icon: localStorage.icon

                           
                     }).then(()=> {
    
                        document.getElementById('btnClose').click();
                        alert('Area de Atuação publicado com foto');
                        localStorage.setItem('icon', "");
                        
    
                     });
                     
                });
        
            });
           }
           
        //    firebase.firestore().collection("Blog").doc('Info').set({
        //         numArt: info.numArt+1,
        //         cont: info.cont+1
        //    }, {
        //     merge: true

        //    }).then(()=>{

        //    });
     
    //    if(info.cont===6){
    //     firebase.firestore().collection("Blog").doc('Info').set({
    //         numPg: info.numPg+1,
    //         cont: 0
    //    }, {
    //     merge: true

    //    }).then(()=>{

    //    });  

    //        }
    
   // }
    // fim botao selecionar arquivo foto blog
// }); 

}

document.getElementById('algema').onclick = function(e){
    document.getElementById('algema').css({
         background: '#fff'
 
     });
 
     document.getElementById('algema2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon', 'flaticon-handcuffs' ) 
     
 
 }

 document.getElementById('martelo').onclick = function(e){
    document.getElementById('martelo').css({
         background: '#fff'
 
     });
 
     document.getElementById('martelo2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon', 'flaticon-auction' ) 
     
 
 }
 document.getElementById('escudo').onclick = function(e){
    document.getElementById('escudo').css({
         background: '#fff'
 
     });
 
     document.getElementById('escudo2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon', 'flaticon-shield'  ) 
     
 
 }

//  class="flaticon-family" - Familia 
// 	class="flaticon-auction" - Martelinho
// 	class="flaticon-shield" - Escudo com certo no meio 
// 	class="flaticon-handcuffs" - Algemas
// 	class="flaticon-house" - Casa 
// 	<span class="flaticon-employee" - Hominho
// 	class="flaticon-fire" - Fogo
// 	class="flaticon-money" - Dinheiro
// 	class="flaticon-medicine" - Remedio
 document.getElementById('familia').onclick = function(e){
    document.getElementById('familia').css({
         background: '#fff'
 
     });
 
     document.getElementById('familia2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon', 'flaticon-family' ) 
     
 
 }
 document.getElementById('casa').onclick = function(e){
    document.getElementById('casa').css({
         background: '#fff'
 
     });
 
     document.getElementById('casa2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon', 'flaticon-house' ) 
     
 
 }
 document.getElementById('homem').onclick = function(e){
    document.getElementById('homem').css({
         background: '#fff'
 
     });
 
     document.getElementById('homem2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon', 'flaticon-employee' ) 
     
 
 }
 document.getElementById('fogo').onclick = function(e){
    document.getElementById('fogo').css({
         background: '#fff'
 
     });
 
     document.getElementById('fogo2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon', 'flaticon-fire'  ) 
     
 
 }
 document.getElementById('dinheiro').onclick = function(e){
    document.getElementById('dinheiro').css({
         background: '#fff'
 
     });
 
     document.getElementById('dinheiro2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon',  'flaticon-money' ) 
     
 
 }
 document.getElementById('remedio').onclick = function(e){
    document.getElementById('remedio').css({
         background: '#fff'
 
     });
 
     document.getElementById('remedio2').css({
         color: 'black'
 
     });

     localStorage.setItem('icon',  'flaticon-medicine' ) 
     
 
 }




document.getElementById('CadUser').onclick = function(e){

     
   

    enviarArquivo();

    
}

function getArea(adm){



firebase.firestore().collection('Area').doc('Info').collection('Atua').get().then(docx =>{

    docx.forEach(doc =>{
        let area = doc.data();

        let div = document.createElement('div');
        div.className =`col-md-4 col-lg-3 text-center`
        div.innerHTML = `
       
        <div class="practice-area bg-white ftco-animate p-4 fadeInUp ftco-animated">
                        <a href="#">
            <div class="icon d-flex justify-content-center align-items-center">
                <span class="${area.icon}"></span>
                    </div>
                </a>
            <h3 class="mb-3"><a href="#">${area.titulo}</a></h3>
            <p>Clique e saiba mais sobre...</p>
            
        </div>

        <ul id="${area.titulo}" style="display: none" class="navbar-navt" >
        <li  ><a id="${area.titulo}OpenArt" href="#"  style="margin-top: 45px" >Abrir</a></li>
        <li  data-toggle="modal" data-target="#msgCadSucesso"><a  id="${area.titulo}DltArt" href="#"  style="margin-top: 45px"  >Excluir</a></li>
        <li  ><a  id="${area.titulo}EditArt" href="#"  style="margin-top: 45px" >Editar</a></li>
</ul>
       
        `;

        document.getElementById('listaArea').appendChild(div);
  
        if(adm===1){
            div.on('click', e =>{
                if(cont === 0){
                    localStorage.setItem('area', area.titulo);
                    document.getElementById(area.titulo).css({
        
                        display: 'block'
                    });
                    cont = 1;
                    
                }else{  
                    document.getElementById(area.titulo).css({
        
                        display: 'none'
                    });
                        cont = 0;
                        
                    }  
                
            });
            document.getElementById(area.titulo+"OpenArt").onclick = function (e){
                window.location="practice-single.html";
                localStorage.setItem('area', area.titulo);
            }
            // document.getElementById(artigo.titulo+"DltArt").onclick = function (e){

                //fazer opçao de realemte excluir
                document.getElementById('btnExcluirArt').onclick = function (e){

                  
                firebase.firestore().collection('Area').doc('Info').collection('Atua').doc(localStorage.area).delete().then(function(){
                    
                    firebase.storage().ref('Area').child(localStorage.area).delete().then(function(){
                       
                        
                        alert('Área de atuação excluida');
                        window.location="practice-areas.html";


                    }).catch(function(error){
                        console.log(error);

                    });

                }).catch(function(error){
                    console.log(error);

                });
            }
            // }
            document.getElementById(area.titulo+"EditArt").onclick = function (e){
               // NAO FIZ AINDA!!! 
            }
            
        }else{
            div.on('click', e =>{
            localStorage.setItem('area', area.titulo);    
            window.location="practice-single.html";
            });
        }
    });


    
});



}

    
//      if(btn === 2){
//         document.getElementById('remedio').css({
//              background: '#fff'
     
//          });
     
//          document.getElementById('remedio2').css({
//              color: 'black'
     
//          });
     
//      }
//      if(btn === 3){
//         document.getElementById('remedio').css({
//              background: '#fff'
     
//          });
     
//          document.getElementById('remedio2').css({
//              color: 'black'
     
//          });
     
//      }
//      if(btn === 4){
//         document.getElementById('remedio').css({
//              background: '#fff'
     
//          });
     
//          document.getElementById('remedio2').css({
//              color: 'black'
     
//          });
     
//      }
//      if(btn === 5){
//         document.getElementById('remedio').css({
//              background: '#fff'
     
//          });
     
//          document.getElementById('remedio2').css({
//              color: 'black'
     
//          });
     
//      }
//      if(btn === 6){
//         document.getElementById('remedio').css({
//              background: '#fff'
     
//          });
     
//          document.getElementById('remedio2').css({
//              color: 'black'
     
//          });
     
//      }
//       if(btn === 7){
//         document.getElementById('remedio').css({
//              background: '#fff'
     
//          });
     
//          document.getElementById('remedio2').css({
//              color: 'black'
     
//          });
     
//      }
//      if(btn === 8){
//         document.getElementById('remedio').css({
//              background: '#fff'
     
//          });
     
//          document.getElementById('remedio2').css({
//              color: 'black'
     
//          });
     
//      }

//     if(btn === 9){
//    document.getElementById('remedio').css({
//         background: '#fff'

//     });

//     document.getElementById('remedio2').css({
//         color: 'black'

//     });

// }



document.addEventListener('DOMContentLoaded', function(){

//  function Aperta(btn){
//         if(btn === 9){
//        document.getElementById('remedio').css({
//             background: '#fff'

//         });

//         document.getElementById('remedio2').css({
//             color: 'black'

//         });

//     }
  
// }
    var aux;
        var aux1;
        firebase.auth().onAuthStateChanged((usuario) => {

            if(usuario){
                getArea(0);
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
                //   //sumir com botao Entre em contato 
                //   document.getElementById('entreEmContato').css({ 

                //     display: 'none'

                // });

                // // fim sumir com botao entre em contato
                
                document.getElementById('imgUser').css({
                    display: 'flex'
                });
                //Verifica adm
               if(usuario.email === "hiago.rufino@hotmail.com"){
                getArea(1);
                document.getElementById('btnBlog').css({

                    display: 'flex'
                });

               
                

               }

               document.getElementById('consultoria').onclick = function(e){

                  window.location="Chat.html";
                  localStorage.setItem('email', usuario.email);

               }

               
               

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
                  
                    // //Aparece botao entre em contato
                    // document.getElementById('entreEmContato').css({ 

                    //     display: 'flex'
        
                    // });
                    // //FIM Aparece botao entre em contato

                    //logout do firebase
                    firebase.auth().signOut().then(() =>{
            
                        
                        document.getElementById('fntDropLogout').css({
                            display: 'none'
                           
                        });

                      
                        
                    });
                    
                   
                    e.preventDefault();
                 
                }
                        
                   
    
                
                     
            }else{
                
               
                getArea(0);
               
                document.getElementById('btnLoginEntrar').onclick = function(e){
                    
   
                    var email = document.getElementById('loginEmail').value;
                    var senha = document.getElementById('loginSenha').value;
                
                    firebase.auth().signInWithEmailAndPassword(email, senha).then(() =>{
                       alert('Usuário Logado');
                
                //       //sumir com botao Entre em contato 
                //       document.getElementById('entreEmContato').css({ 
                
                //        display: 'none'
                
                //    });
                
                //    // fim sumir com botao entre em contato
                
                       document.getElementById('imgUser').css({
                           display: 'flex'
                       });
                
                       aux = 1;
                
                    }).catch(err => {
                       alert('email ou senha inválidos');
                       console.log('error', err);
                   });
                    
                   e.preventDefault();
                
                  //window.location="Chat.html";
                   localStorage.setItem('email', email);
                   
                  
                            
                           
                   
                    
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
                                timeStamp: new Date()
                                


                                }).then(chat =>{
                                    alert('usuario criado e logado');
                                    if(cadEmail!==emailAdm){
                                    firebase.firestore().collection('Usuarios').doc(btoa(cadEmail)).collection('Contatos').doc(btoa(emailAdm)).set({  
                                        nome: 'Daniel Ishibashi', 
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


});

    }


}