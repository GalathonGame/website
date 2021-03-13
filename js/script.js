const iconclick = document.querySelector('.navbar-toggler');
const menu = document.querySelector('.navbar-nav');
const body = document.querySelector('heheboi');


menu.classList.toggle('hidden');

iconclick.addEventListener('click', function() {

    if (menu.classList.contains('hidden'))
    {
        menu.classList.remove('hidden');
        setTimeout(function() {menu.classList.toggle('active')}, 20);

    
    } 
    else 
    {
        menu.classList.remove('active');

        menu.addEventListener('transitionend', function(e) {menu.classList.add('hidden');}, {capture:false, once: true, passive: false});

    }
    
}, false);

menu.addEventListener('mouseleave', function() {
    menu.classList.remove('active');

    menu.addEventListener('transitionend', function(e) {menu.classList.add('hidden');}, {capture:false, once: true, passive: false});
}, false);