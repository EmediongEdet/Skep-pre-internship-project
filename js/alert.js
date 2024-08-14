function alertMessage(message, scroll = true) {
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = `<p>${message}</p><span>X</span>`;
    
    alert.addEventListener('click', function(e) {
        if(e.target.tagName == 'SPAN') {
          main.removeChild(this);
        }
    })
    const main = document.querySelector('main');
    main.prepend(alert);
  
    if(scroll)
      window.scrollTo(0,0);
      setTimeout(()=>{
        alert.style.display = "none"
      }, 3000)
  
  }