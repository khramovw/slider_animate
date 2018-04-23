let tl              = TweenLite;
let slider          = document.getElementById('slider-gaps');
let paginationBtn   = document.querySelectorAll('#pagination li a');
let slideAll        = slider.querySelectorAll('.slide');

class SliderGsap{

    constructor(){

        this.scrollEvent();
        this.cliclEvent();
        this.activeSlide    = 1;
        this.canGo          = true;
        this.maxSlide       = 5;

    }

    scrollEvent(){

        slider.addEventListener('wheel', e => {

            if( !this.canGo ) return;
            this.canGo = false;

            let direction = e.wheelDeltaY < 0 ? 1 : -1 ;
            let newSlide = +this.activeSlide + (+direction);

            if( newSlide > this.maxSlide ) newSlide = 1;
            if( newSlide < 1 ) newSlide = 5;

            PubSub.publish('gotoSlide', { from: this.activeSlide, to: +newSlide });

            this.activeSlide = newSlide;

            setTimeout( () => {
                this.canGo = true;
            }, 600)

        }, {passive: true});

    }

    cliclEvent(){

        let linkNav = [].slice.call(paginationBtn);

        linkNav.forEach( el => {

            el.addEventListener('click', ev => {

                ev.stopPropagation();

                let newSlide = ev.srcElement.dataset.gotoslide;

                if( newSlide !== this.activeSlide ){

                    PubSub.publish('gotoSlide', { from: +this.activeSlide, to: +newSlide });

                    this.activeSlide = newSlide;

                }

            }, {passive: true})
        });

    }

}
let slide = new SliderGsap();

PubSub.subscribe('gotoSlide', function (msg, data) {


    // function setActiveEl(isEl, isAtrr, isClass){
    //
    //     console.log(':|',isEl, ':|');
    //
    //     isEl.forEach( (sl,el) => {
    //
    //         if ( sl.dataset.isAtrr == data.from ) sl.classList.remove(isClass);
    //         if ( sl.dataset.isAtrr == data.to ) sl.classList.add(isClass);
    //
    //         console.log(':|',sl.attributes["0"], ':|', el);
    //     });
    //
    // }
    //
    // setActiveEl(slideAll, slide,'is-active');
    // setActiveEl(paginationBtn, gotoslide 'is-active');

    slideAll.forEach( sl => {

        if ( sl.dataset.slide == data.from ) tl.fromTo(sl, .25, {opacity:1}, {opacity:0});
        if ( sl.dataset.slide == data.to ) tl.fromTo(sl, .25, {opacity:0}, {opacity:1});

        // tl.fromTo(sl.dataset.item == 1 , .3, {opacity:0, width: 30}, {opacity:1, width: 40});


        let getImg = document.getElementsByTagName('img');
        console.log(getImg);


    });

    paginationBtn.forEach( btnSl => {

        if ( btnSl.dataset.gotoslide == data.from ) btnSl.classList.remove('is-active');
        if ( btnSl.dataset.gotoslide == data.to ) btnSl.classList.add('is-active');

    });

});


