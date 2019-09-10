

eventlistener()
function eventlistener() {
    const ui = new UI();
    //hide preloader
    window.addEventListener('load', () => {
        ui.hidePreloader()
    });
    //nav btn
    document.querySelector('.navBtn').addEventListener('click', () => {
       ui.showNav()
    })
    //control the video
    document.querySelector('.video_switch').addEventListener('click', () =>{
        ui.videoControls();
    })
    // submit form
    document.querySelector('.drink-form').addEventListener('submit', (event) => 
    {
     event.preventDefault();
     const name = document.querySelector('.input-name').value;
     const lastname = document.querySelector('.input-lastname').value;
     const email = document.querySelector('.input-email').value;

    let value = ui.checkEmpty(name, lastname, email)

   if(value){
       let customer = new Customer(name, lastname, email)
       console.log(customer)
       ui.addCustomer(customer)
       ui.showFeedBack('customer added to the list', 'success')
       ui.clearFields()
   }
   else{
       ui.showFeedBack('some form values empty', 'error')
   }
    })

    const links = document.querySelectorAll('.work-item__icon');
    
    links.forEach(function(item){
        console.log(item)
        item.addEventListener('click', function(event){
            ui.showModal(event)
        })
    })

    //hide modal
    document.querySelector('.work-modal_close').addEventListener('click',
    function(){
        ui.closeModal();
    })
   
}





//constructor function

function UI(){

}
//hide preloader
UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display = 'none';
}
//showNav
UI.prototype.showNav = function(){ 
    document.querySelector('.nav').classList.toggle('navshow')
}
//play/pause the video
UI.prototype.videoControls = function(){
    let btn = document.querySelector('.video_switch-btn');
    if(!btn.classList.contains('btnSlide')){
        btn.classList.add('btnSlide')
        document.querySelector('.video_item').pause();
    }else{
        btn.classList.remove('btnSlide')
        document.querySelector('.video_item').play();
    }
}
//check for Empty values
UI.prototype.checkEmpty = function(name, lastname, email){
    let result;
    if(name === '' || lastname === '' || email === ''){
        result = false;
    }
    else{
        result = true
    }
    return result;
}
//showFeedBack
UI.prototype.showFeedBack = function(text,type){
    const feedBack = document.querySelector('.drink-form_feedback');
    if(type === 'success'){
        feedBack.classList.add('success');
        feedBack.innerText = text;
        this.removeAlert('success')
    }
    else if( type === 'error'){

        feedBack.classList.add('error');
        feedBack.innerText = text;
        this.removeAlert('error')
    }
}
//remove alert
UI.prototype.removeAlert = function(type){

    setTimeout(function(){
        document.querySelector('.drink-form_feedback').classList.remove(type)
    }, 3000)
}
//add customer
UI.prototype.addCustomer = function(customer){
    const images = [1,2,3,4,5];
    let random = Math.floor(Math.random() * images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<img src="img/cof${random}.jpeg" style="height:50px;" 
    alt="" class="person_thumbnail">
    <h4 class="person_name">${customer.name}</h4>
    <h4 class="person_last-name">${customer.lastname}</h4>` 
    document.querySelector('.drink-card_list').appendChild(div)
     
}
//clear fields
UI.prototype.clearFields = function(){
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
}
//show modal

UI.prototype.showModal = function(event){
    event.preventDefault();
  if(event.target.parentElement.classList.contains('work-item__icon')){
     let id = event.target.parentElement.dataset.id
     
     const modal = document.querySelector('.work-modal');
     const modalItem = document.querySelector('.work-modal_item')

     modal.classList.add('work-modal-show')
     modalItem.style.backgroundImage =`url(img/cof${id}.jpeg)`
  }
    
}

//hide modal
UI.prototype.closeModal = function(){
    document.querySelector('.work-modal').classList.remove('work-modal-show')
}



///////////
function Customer(name, lastname, email){
    this.name = name,
    this.lastname = lastname,
    this.email = email
}








  