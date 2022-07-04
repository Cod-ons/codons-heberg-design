// loading
setTimeout(() => document.body.classList.remove('load'), 1000);

// on load
window.addEventListener('load', function () {
    this.setInterval(() => {
        // main min heigth
        var width = window.innerHeight - document.querySelector('footer').clientHeight - 100;
    
        if (width < 250) width = 250;
        this.document.querySelector('main').style.minHeight = `${width}px`;
    }, 500);

    // header
    const menu = this.document.querySelector('header .menu');
    const menuBtn = this.document.querySelector('header .menu-btn');

    this.document.body.addEventListener('click', e => {
        if (undefined !== menuBtn && undefined !== menu && e.composedPath().includes(menuBtn))
            menu?.classList.toggle('active');
        else if (menu?.classList.contains('active'))
            menu?.classList.remove('active');
    });
});
