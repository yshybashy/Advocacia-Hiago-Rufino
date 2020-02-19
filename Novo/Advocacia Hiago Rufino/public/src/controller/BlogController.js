class BlogController {

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




 var titulo;
 var artigo;
//var ref = firebase.storage().ref('Blog').child(titulo);
 

function enviarArquivo(){
    var enviaArquivo = document.getElementById('addFotoBlog');
    firebase.firestore().collection('Blog').doc('Info').get().then(docx => {
        let info = docx.data();

        
       
  
    //Botao selecionar arquivo foto blog
    //enviaArquivo.onchange = function (event){
        titulo = document.getElementById('nome').value;
        artigo = document.getElementById('artigo').value;
        var arquivo = enviaArquivo.files[0];
        
     
        if(arquivo===undefined){ //verifica se tem foto 
            firebase.firestore().collection('Blog').doc('Info').collection('Artigos').doc(titulo).set({
                titulo: titulo,
                artigo: artigo,
                Data: new Date(),
                position: info.numArt
         }).then(()=> {
    
            document.getElementById('btnClose').click();
            alert('Artigo publicado sem foto');
         });
           }else{
            firebase.storage().ref('Blog').child(titulo).put(arquivo).then(snapshot =>{
                firebase.storage().ref('Blog').child(titulo).getDownloadURL().then(url => {
                    
                     firebase.firestore().collection('Blog').doc('Info').collection('Artigos').doc(titulo).set({
                            titulo: titulo,
                            artigo: artigo,
                            foto: url,
                            Data: new Date(),
                            position: info.numArt
                     }).then(()=> {
    
                        document.getElementById('btnClose').click();
                        alert('Artigo publicado com foto');
                        
    
                     });
                     
                });
        
            });
           }
           
           firebase.firestore().collection("Blog").doc('Info').set({
                numArt: info.numArt+1,
                cont: info.cont+1
           }, {
            merge: true

           }).then(()=>{

           });
     
       if(info.cont===6){
        firebase.firestore().collection("Blog").doc('Info').set({
            numPg: info.numPg+1,
            cont: 0
       }, {
        merge: true

       }).then(()=>{

       });  

           }
    
   // }
    // fim botao selecionar arquivo foto blog
}); 
}


document.getElementById('CadUser').onclick = function(e){

     
   

    enviarArquivo();
}





    document.addEventListener('DOMContentLoaded', function(){

        function getArtigo(adm){ //mostra os artigos na tela 

            //  <div class="col-md-4 d-flex ftco-animate">
             // </div>
            let contPg;
            let contArt;
            let cont = 1;
            let pgAtual = 1;
             firebase.firestore().collection('Blog').doc('Info').get().then(docx => {

                    let info = docx.data();
                    contPg = info.numPg;
                    contArt = info.numArt;
                   // console.log(contPg, cont);

                   // MOSTRA BOTOES DA PAGINA 
                   let divi = document.createElement('li');
                        // divi.className = ' active  ';
                        divi.innerHTML = `<li id="btn${cont}" class="active"><span><a href="#">${cont}</a></span></li>`;
                        document.getElementById('numPg').appendChild(divi);
                        cont++;
                        
                        
                    while(cont <= contPg){
                        
                        let divi = document.createElement('li');
                       // divi.className = ' active  ';
                        divi.innerHTML = `<li id="btn${cont}"><span  ><a href="#">${cont}</a></span></li>`;
                        document.getElementById('numPg').appendChild(divi);
                        cont++;


                        divi.on('click' , e => {
                            let num = divi.textContent;
                            document.getElementById('btn'+num).addClass('active');

                            document.getElementById('btn'+pgAtual).removeClass('active');
                            pgAtual = num;

                            document.getElementById('listaArtigo').innerHTML = "";

                            firebase.firestore().collection('Blog').doc('Info').collection('Artigos').orderBy("position", "desc").limit(6).where("position", "<=", info.numArt-(6*(pgAtual-1))).get().then(docs =>{
            
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
                                    div.className = ' col-md-4 d-flex ftco-animate fadeInUp ftco-animated  ';
                                    div.innerHTML = `
                                                <a >
                                                
                                               
                                                <div  class="blog-entry justify-content-end " >
                                                <img src="${artigo.foto}"  class="block-20"  >
                                               
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
                                                    <h3 class="heading mt-2"><a >${artigo.titulo}</a></h3>
                                                        
                                                </div>
                                                
                                                </div>
                                                <ul id="${artigo.titulo}" style="display: none" class="navbar-navt" >
                                                <li  ><a id="${artigo.titulo}OpenArt" href="#"  style="margin-top: 45px" >Abrir</a></li>
                                                <li  data-toggle="modal" data-target="#msgCadSucesso"><a  id="${artigo.titulo}DltArt" href="#"  style="margin-top: 45px"  >Excluir</a></li>
                                                <li  ><a  id="${artigo.titulo}EditArt" href="#"  style="margin-top: 45px" >Editar</a></li>
                                        </ul>
                                            </a>
                                    
                                    `
                                    ;
                        
                                    document.getElementById('listaArtigo').appendChild(div);
                        
                                    var cont = 0;
                        
                                    
                        
                        
                                    if(adm===1){
                                        div.on('click', e =>{
                                            
                                            if(cont === 0){
                                                // console.log('clicou');
                                                 localStorage.setItem('blog', artigo.titulo);
                                                document.getElementById(artigo.titulo).css({
                                
                                                    display: 'block'
                                                });
                                                cont = 1;
                                                
                                            }else{  
                                                document.getElementById(artigo.titulo).css({
                                
                                                    display: 'none'
                                                });
                                                    cont = 0;
                                                    
                                                }  
                                            
                                        });
                        
                                        document.getElementById(artigo.titulo+"OpenArt").onclick = function (e){
                                            window.location="blog-single.html";
                                            localStorage.setItem('blog', artigo.titulo);
                                        }
                                        // document.getElementById(artigo.titulo+"DltArt").onclick = function (e){
                        
                                            //fazer opçao de realemte excluir
                                            document.getElementById('btnExcluirArt').onclick = function (e){

                                              
                                            firebase.firestore().collection('Blog').doc('Info').collection('Artigos').doc(localStorage.blog).delete().then(function(){
                                                
    
                                                firebase.storage().ref('Blog').child(localStorage.blog).delete().then(function(){
                                                    if(info.cont!=0){

                                                        firebase.firestore().collection("Blog").doc('Info').set({
                                                            numArt: info.numArt-1,
                                                            cont: info.cont-1
    
                                                           
                                                       }, {
                                                        merge: true
                                                
                                                       }).then(()=>{
                                                
                                                       });

                                                    }
                                                    
                                                    alert('artigo excluido');
                                                    window.location="blog.html";
    
    
                                                }).catch(function(error){
                                                    console.log(error);
                            
                                                });


                                                if(info.cont===0 && info.numPg!=1){
                                                    firebase.firestore().collection("Blog").doc('Info').set({
                                                        numArt: info.numArt-1,
                                                        cont: 6,
                                                        numPg: info.numPg-1
                                                       
                                                   }, {
                                                    merge: true
                                            
                                                   }).then(()=>{
                                            
                                                   });

                                                }
                        
                                            }).catch(function(error){
                                                console.log(error);
                        
                                            });
                                        }
                                        // }
                                        document.getElementById(artigo.titulo+"EditArt").onclick = function (e){
                                           // NAO FIZ AINDA!!! 
                                        }
                                        
                                    }else{
                                        div.on('click', e =>{
                                        localStorage.setItem('blog', artigo.titulo);    
                                        window.location="blog-single.html";
                                        });
                                    }
                                   
                        
                                    //console.log(dateToTime(artigo.Data, 'pt-BR'));
                                });
                            });
                        
                            
                            
                        });
                    }
                    
                    divi.on('click' , e => {
                        
                        let num = divi.textContent;
                        document.getElementById('btn'+num).addClass('active');
                        if(pgAtual!=1){
                        document.getElementById('btn'+pgAtual).removeClass('active');
                    }
                        pgAtual = num;
                        

                        document.getElementById('listaArtigo').innerHTML = "";

                        firebase.firestore().collection('Blog').doc('Info').collection('Artigos').orderBy("position", "desc").limit(6).where("position", "<=", info.numArt-(6*(pgAtual-1))).get().then(docs =>{
        
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
                                div.className = ' col-md-4 d-flex ftco-animate fadeInUp ftco-animated  ';
                                div.innerHTML = `
                                            <a >
                                            
                                           
                                            <div  class="blog-entry justify-content-end " >
                                            <img src="${artigo.foto}"  class="block-20"  >
                                           
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
                                                <h3 class="heading mt-2"><a >${artigo.titulo}</a></h3>
                                                    
                                            </div>
                                            
                                            </div>
                                            <ul id="${artigo.titulo}" style="display: none" class="navbar-navt" >
                                            <li  ><a id="${artigo.titulo}OpenArt" href="#"  style="margin-top: 45px" >Abrir</a></li>
                                            <li  data-toggle="modal" data-target="#msgCadSucesso"><a  id="${artigo.titulo}DltArt" href="#"  style="margin-top: 45px"  >Excluir</a></li>
                                            <li  ><a  id="${artigo.titulo}EditArt" href="#"  style="margin-top: 45px" >Editar</a></li>
                                    </ul>
                                        </a>
                                
                                `
                                ;
                    
                                document.getElementById('listaArtigo').appendChild(div);
                    
                                var cont = 0;
                    
                                
                    
                    
                                if(adm===1){
                                    div.on('click', e =>{
                                        if(cont === 0){
                                            
                                            localStorage.setItem('blog', artigo.titulo);
                                            document.getElementById(artigo.titulo).css({
                            
                                                display: 'block'
                                            });
                                            cont = 1;
                                            
                                        }else{  
                                            document.getElementById(artigo.titulo).css({
                            
                                                display: 'none'
                                            });
                                                cont = 0;
                                                
                                            }  
                                        
                                    });
                    
                                    document.getElementById(artigo.titulo+"OpenArt").onclick = function (e){
                                        window.location="blog-single.html";
                                        localStorage.setItem('blog', artigo.titulo);
                                    }
                                    // document.getElementById(artigo.titulo+"DltArt").onclick = function (e){
                    
                                        //fazer opçao de realemte excluir
                                        document.getElementById('btnExcluirArt').onclick = function (e){

                                              
                                            firebase.firestore().collection('Blog').doc('Info').collection('Artigos').doc(localStorage.blog).delete().then(function(){
                                                
                                                
                                                firebase.storage().ref('Blog').child(localStorage.blog).delete().then(function(){
                                                    if(info.cont!=0){
                                                        firebase.firestore().collection("Blog").doc('Info').set({
                                                            numArt: info.numArt-1,
                                                            cont: info.cont-1
    
                                                           
                                                       }, {
                                                        merge: true
                                                
                                                       }).then(()=>{
                                                
                                                       });
                                                    
                                                    }
                                                    
                                                    alert('artigo excluido');
                                                    window.location="blog.html";
    
    
                                                }).catch(function(error){
                                                    console.log(error);
                            
                                                });


                                                if(info.cont===0 && info.numPg!=1){
                                                    firebase.firestore().collection("Blog").doc('Info').set({
                                                        numArt: info.numArt-1,
                                                        cont: 6,
                                                        numPg: info.numPg-1
                                                       
                                                   }, {
                                                    merge: true
                                            
                                                   }).then(()=>{
                                            
                                                   });

                                                }
                        
                                            }).catch(function(error){
                                                console.log(error);
                        
                                            });
                                        }
                                    // }
                                    document.getElementById(artigo.titulo+"EditArt").onclick = function (e){
                                       // NAO FIZ AINDA!!! 
                                    }
                                    
                                }else{
                                    div.on('click', e =>{
                                        localStorage.setItem('blog', artigo.titulo);
                                    window.location="blog-single.html";
                                    });
                                }
                               
                    
                                //console.log(dateToTime(artigo.Data, 'pt-BR'));
                            });
                        });

                    });

                    // FIM MOSTRA BOTOES DA PAGINA 

                    

                            firebase.firestore().collection('Blog').doc('Info').collection('Artigos').orderBy("position", "desc").limit(6).where("position", "<=", info.numArt-(6*(pgAtual-1))).get().then(docs =>{
            
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
                                    div.className = ' col-md-4 d-flex ftco-animate fadeInUp ftco-animated  ';
                                    div.innerHTML = `
                                                <a >
                                                
                                               
                                                <div  class="blog-entry justify-content-end " >
                                                <img src="${artigo.foto}"  class="block-20"  >
                                               
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
                                                    <h3 class="heading mt-2"><a >${artigo.titulo}</a></h3>
                                                        
                                                </div>
                                                
                                                </div>
                                                <ul id="${artigo.titulo}" style="display: none" class="navbar-navt" >
                                                <li  ><a id="${artigo.titulo}OpenArt" href="#"  style="margin-top: 45px" >Abrir</a></li>
                                                <li  data-toggle="modal" data-target="#msgCadSucesso"><a  id="${artigo.titulo}DltArt" href="#"  style="margin-top: 45px"  >Excluir</a></li>
                                                <li  ><a  id="${artigo.titulo}EditArt" href="#"  style="margin-top: 45px" >Editar</a></li>
                                        </ul>
                                            </a>
                                    
                                    `
                                    ;
                        
                                    document.getElementById('listaArtigo').appendChild(div);
                        
                                    var cont = 0;
                        
                                    
                        
                        
                                    if(adm===1){
                                        div.on('click', e =>{
                                            if(cont === 0){
                                                
                                                localStorage.setItem('blog', artigo.titulo);
                                                document.getElementById(artigo.titulo).css({
                                
                                                    display: 'block'
                                                });
                                                cont = 1;
                                                
                                            }else{  
                                                document.getElementById(artigo.titulo).css({
                                
                                                    display: 'none'
                                                });
                                                    cont = 0;
                                                    
                                                }  
                                            
                                        });
                        
                                        document.getElementById(artigo.titulo+"OpenArt").onclick = function (e){
                                            window.location="blog-single.html";
                                            localStorage.setItem('blog', artigo.titulo);
                                        }
                                        // document.getElementById(artigo.titulo+"DltArt").onclick = function (e){
                        
                                            //fazer opçao de realemte excluir
                                            document.getElementById('btnExcluirArt').onclick = function (e){

                                              
                                                firebase.firestore().collection('Blog').doc('Info').collection('Artigos').doc(localStorage.blog).delete().then(function(){
                                                    
        
                                                    firebase.storage().ref('Blog').child(localStorage.blog).delete().then(function(){
        
                                                        if(info.cont!=0){
                                                            firebase.firestore().collection("Blog").doc('Info').set({
                                                                numArt: info.numArt-1,
                                                                cont: info.cont-1
        
                                                               
                                                           }, {
                                                            merge: true
                                                    
                                                           }).then(()=>{
                                                    
                                                           });
                                                        
                                                        }
                                                        alert('artigo excluido');
                                                        window.location="blog.html";
        
        
                                                    }).catch(function(error){
                                                        console.log(error);
                                
                                                    });
    
    
                                                    if(info.cont===0 && info.numPg!=1){
                                                        firebase.firestore().collection("Blog").doc('Info').set({
                                                            numArt: info.numArt-1,
                                                            cont: 6,
                                                            numPg: info.numPg-1
                                                           
                                                       }, {
                                                        merge: true
                                                
                                                       }).then(()=>{
                                                
                                                       });
    
                                                    }
                            
                                                }).catch(function(error){
                                                    console.log(error);
                            
                                                });
                                            }
                                        // }
                                        document.getElementById(artigo.titulo+"EditArt").onclick = function (e){
                                           // NAO FIZ AINDA!!! 
                                        }
                                        
                                    }else{
                                        div.on('click', e =>{
                                            localStorage.setItem('blog', artigo.titulo);
                                        window.location="blog-single.html";
                                        });
                                    }
                                   
                        
                                    //console.log(dateToTime(artigo.Data, 'pt-BR'));
                                });
                            });
                
                

                });
                
                // <li class="active"><span>1</span></li>
                // <li><a href="#">2</a></li>
                // <li><a href="#">3</a></li>
                // <li><a href="#">4</a></li>
                // <li><a href="#">5</a></li>
                
               
            
               
            
            
                
            }
            
           

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

                document.getElementById('btnBlog').css({

                    display: 'flex'
                });

                getArtigo(1);
                

               }else{

                getArtigo(0);
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
                
                getArtigo(0);
              
                
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