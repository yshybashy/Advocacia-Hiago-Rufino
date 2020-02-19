class PracticeSingleController{

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

    function getArtigo(){

        
        //MOSTRA ARTIGOS RECENTES 
        firebase.firestore().collection('Blog').doc('Info').get().then(docx => {

            let info = docx.data();


         
      
        firebase.firestore().collection('Blog').doc('Info').collection('Artigos').orderBy("Data", "desc").limit(3).get().then(docs =>{
    
            docs.forEach(doc=>{
                let artigo = doc.data();
                
                function dateToTime(date, locale = 'pt-BR'){
                    return date.toLocaleDateString(locale, {
                         day: '2-digit',
                         year: 'numeric',
                        month: 'long'
                        
                        
                    });
                  }
                  
                  
    
                let div = document.createElement('div');
                div.className = ' fadeInUp ftco-animated';
                div.innerHTML = `
                <div class="block-21 mb-4 d-flex">
                <a href="#">
                <img  class="blog-img mr-4" src="${artigo.foto}">
                </a>
                  <div class="text">
                    <h3 class="heading"><a href="#">${artigo.titulo}</a></h3>
                    <div class="meta">
                      <div><a href="#"><span class="icon-calendar"></span> &nbsp ${dateToTime(artigo.Data, 'pt-BR')}</a></div>
                      <div><a href="#"><span class="icon-person"></span> Hiago Rufino</a></div>
                      
                    </div>
                  </div>
                </div>
                `
                ;
    
                document.getElementById('listaArtigosRecentes').appendChild(div);
    
                
                div.on('click', e =>{
                    window.location="blog-single.html";
                    localStorage.setItem('blog', artigo.titulo);
                   

                });
    
                //console.log(dateToTime(artigo.Data, 'pt-BR'));
            });
        });
    
            

    });
    let n=0;
     //MOSTRA ARTIGO PRINCIPAL 
     firebase.firestore().collection('Area').doc('Info').collection('Atua').doc(localStorage.area).get().then(docx=>{

        let area = docx.data();
       // console.log(artigo);
            let div = document.createElement('div');
            div.innerHTML = `
            
            <p>
            <img  class="hero-wrap hero-wrap-2" src="${area.foto}" alt="" class="img-fluid">
          </p>
          <h2  class="mb-3">${area.titulo}</h2>
          <div id="mostraTxt"></div>
         

         <!-- <img src="images/bg_1.jpeg" alt="" class="img-fluid">  -->
          </p>
          
          
          <div class="about-author d-flex p-4 bg-light">
            <div class="bio mr-5">
               <img src="images/hiago_menor.JPG" alt="Image placeholder" class="img-fluid mb-4"> 
            </div>
            <div class="desc">
              <h3>Hiago Rufino</h3>
              <p>OAB/SP 405.935 </p>
            </div>
          </div>


          <div class="pt-5 mt-5">
            
            </ul>
            <!-- END comment-list -->
            
            <div class="comment-form-wrap pt-5">
              
            </div>
          </div>
        
            `;
          

            document.getElementById('mostraArtigo').appendChild(div);

            var artigoo = new Array(); 

            var artigoo1 = area.artigo;
 
             artigoo = artigoo1.split(";");
                let contador = artigoo.length;
             
             
                 
             while (n < contador){
               
                 let divTxt = document.createElement('p');
             divTxt.innerHTML = `
                 ${artigoo[n]}
                 `;
                 n=n+1;
                  document.getElementById('mostraTxt').appendChild(divTxt);
             } 

    });

    
}

document.addEventListener('DOMContentLoaded', function(){


    var aux;
    var aux1;
    firebase.auth().onAuthStateChanged((usuario) => {

        if(usuario){
            getArtigo();
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
            
         
          
          
           
            getArtigo();
           
            document.getElementById('consultoria').onclick = function(e){

                alert('Por favor faça login, ou entao efetue um cadastro');

                window.location="index.html";
                
  
             }
            
          
           
        }
            
        
          
         
       
        

    });

});



    }
    
}