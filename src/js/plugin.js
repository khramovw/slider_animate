import { TimelineMax } from "gsap";

/* js */



let slider      = document.getElementById('slider-gaps');
let pagination  = document.querySelectorAll('#pagination li a');


console.dir(pagination);

class SliderGsap{
    constructor(){
        this.scrollEvent();
        this.cliclEvent();
        this.activeSlide =1;
        this.canGo = true;
        this.maxSlide = 5;

    }

    scrollEvent(){

        slider.addEventListener('wheel', e => {

            if( !this.canGo ) return;
            this.canGo = false;

            let direction = e.wheelDeltaY < 0 ? 1 : -1 ;
            let newSlide = +this.activeSlide + (+direction);

            if( newSlide > this.maxSlide ) newSlide = 1;
            if( newSlide < 1 ) newSlide = 5;

            PubSub.publish('gotoSlide', { from: this.activeSlide, to: newSlide });

            this.activeSlide = newSlide;

            setTimeout( () => {
                this.canGo = true;
            }, 600)

        }, {passive: true});

    }

    cliclEvent(){

        let linkNav = [].slice.call(pagination);

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

    console.log(msg, data);

    //  $('[data-slide='+data.from+'], [data-gotoslide='+data.from+']').removeClass('is-active');

    //  $('[data-slide='+data.to+'], [data-gotoslide='+data.to+']').addClass('is-active');


    let currentSlide = $('[data-slide='+data.from+'], [data-gotoslide='+data.from+']');
    let newSide = $('[data-slide='+data.to+'], [data-gotoslide='+data.to+']');
    
    let tl = new TimelineMax;
    
    tl.fromTo(currentSlide,1,{opacity:0})
        .to(newSide,1,{opacity:1});

});