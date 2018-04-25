'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var twl = TweenLite;
var tl = new TimelineLite();
var slider = document.getElementById('slider-gaps');
var paginationBtn = document.querySelectorAll('#pagination li a');
var slideAll = slider.querySelectorAll('.slide');

tl.staggerFrom(document.querySelectorAll('.btn-dot'), 0.15, { x: 0, y: -100, autoAlpha: 0, ease: Power4.easeOut, delay: 1 }, 0.1);

var SliderGsap = function () {
    function SliderGsap() {
        _classCallCheck(this, SliderGsap);

        this.scrollEvent();
        this.cliclEvent();
        this.activeSlide = 1;
        this.canGo = true;
        this.maxSlide = 5;
        this.startSlide = 0;
    }

    _createClass(SliderGsap, [{
        key: 'scrollEvent',
        value: function scrollEvent() {
            var _this = this;

            slider.addEventListener('wheel', function (e) {

                // console.log(e);

                if (!_this.canGo) return;
                _this.canGo = false;

                var direction = e.wheelDeltaY < 0 ? 1 : -1;
                var newSlide = _this.activeSlide + direction;

                if (newSlide > _this.maxSlide) newSlide = 1;
                if (newSlide < 1) newSlide = 5;

                PubSub.publish('gotoSlide', { from: _this.activeSlide, to: newSlide });
                PubSub.publish('gotoSlide.scroll', { start: true });

                _this.activeSlide = newSlide;

                setTimeout(function () {
                    _this.canGo = true;
                }, 1300);
            }, { passive: true });
        }
    }, {
        key: 'cliclEvent',
        value: function cliclEvent() {
            var _this2 = this;

            var linkNav = [].slice.call(paginationBtn);

            linkNav.forEach(function (el) {

                el.addEventListener('click', function (ev) {

                    ev.stopPropagation();

                    var newSlide = ev.srcElement.dataset.gotoslide;

                    if (newSlide !== _this2.activeSlide) {

                        PubSub.publish('gotoSlide', { from: _this2.activeSlide, to: newSlide });
                        PubSub.publish('gotoSlide.top', { start: true, from: _this2.activeSlide, to: newSlide });

                        _this2.activeSlide = newSlide;
                    }
                }, { passive: true });
            });
        }
    }]);

    return SliderGsap;
}();

var slide = new SliderGsap();

PubSub.subscribe('gotoSlide', function (msg, data) {

    // console.log( msg, data );


    //Show current slide
    slideAll.forEach(function (sl, d, i) {

        // console.log('-= sl =-',d, sl,'i|::',i);

        if (sl.dataset.slide == data.from) {

            sl.classList.remove('is-active');
            sl.dataset.state = 'hidden';

            if (data.from == 1) {
                console.log('| data.from == 1 |', sl.childNodes);
                tl.to(sl.childNodes[3].childNodes[1], 0.3, { autoAlpha: 0 }).to(sl.childNodes[3].childNodes[3], 0.3, { autoAlpha: 1 }, '-=0.3').to(sl, 0.25, { autoAlpha: 0, delay: 0.25 });
            }
            if (data.from == 2) {
                console.log('| data.from == 2 |');
                tl.to(sl.childNodes[3].childNodes[3], 0.3, { top: "16.2%", left: "23.8%", width: "42%", ease: Power4.easeOut }).to(sl.childNodes[3].childNodes[3], 0.1, { autoAlpha: 0, delay: 0.25 }).to(sl, 0.25, { autoAlpha: 0, ease: Power4.easeOut }, '-=0.3');
            }
            if (data.from == 3) {
                console.log('| data.from == 3 |');

                tl.to(sl.childNodes[3].childNodes[3], 0.3, { top: "44%", left: "32%", width: "41%", ease: Power4.easeOut }).to(sl.childNodes[3].childNodes[3], 0.1, { autoAlpha: 0, delay: 0.25 }).to(sl, 0, { autoAlpha: 0 }, '-=0.3');
            }

            console.log('*** sl.dataset.slide ***', sl.dataset.slide);

            // tl.to(sl.childNodes[3].childNodes[3], 0.3, { top: "14.2%",left: "23.8%",width: "42%", delay: 0.5 })
            //     .to(sl.childNodes[3].childNodes[3], 0.1, { autoAlpha:0})
            //            .to(sl, 0.25, {autoAlpha:0, ease: Power4.easeOut}, '-=0.3');


            sl.classList.add('is-hidden');

            // console.log('-====',  sl.childNodes[3].childNodes[3])

        }
        if (sl.dataset.slide == data.to) {

            sl.classList.add('is-active');
            sl.dataset.state = 'visibility';

            if (data.to == 1) {
                console.log('| data.from == 1 |', sl.childNodes);

                tl.to(sl, 0.25, { autoAlpha: 1, ease: Power4.easeOut }, '-=0.3').to(sl.childNodes[3].childNodes[3], 0.3, { autoAlpha: 0 }).to(sl.childNodes[3].childNodes[1], 0.3, { autoAlpha: 1 }, '-=0.3');
            }

            if (data.to == 2) {

                tl.to(sl, 0, { autoAlpha: 1, ease: Power4.easeOut }, '-=0.3').to(sl.childNodes[3].childNodes[3], 0.1, { autoAlpha: 1 }, "-=0.5").to(sl.childNodes[3].childNodes[3], 0.3, { top: "47%", left: "-11%", width: "70%", ease: Power4.easeOut });
            }

            if (data.to == 3) {

                tl.to(sl, 0, { autoAlpha: 1, ease: Power4.easeOut }, '-=0.3').to(sl.childNodes[3].childNodes[3], 0.1, { autoAlpha: 1 }, "-=0.5").to(sl.childNodes[3].childNodes[3], 0.3, { top: "18%", left: "26%", width: "100%", ease: Power4.easeOut });
            }

            // tl.to(sl, 0, {autoAlpha:1}, '-=0.3')
            //     .to(sl.childNodes[3].childNodes[3], 0.1, {autoAlpha:1}, "-=0.5")
            //         .to(sl.childNodes[3].childNodes[3], 0.3, {top: "47%",left: "-11%",width: "70%", ease: Power4.easeOut, delay: 0.5});

            sl.classList.remove('is-hidden');

            // console.log('+====',  sl.childNodes[3].childNodes[3])
        }
    });

    // console.log('-data.from-', typeof data.from, typeof data.to)

    //Show current dot
    paginationBtn.forEach(function (btnSl) {

        if (btnSl.dataset.gotoslide == data.from) btnSl.classList.remove('is-active');
        if (btnSl.dataset.gotoslide == data.to) btnSl.classList.add('is-active');
    });
});
PubSub.subscribe('gotoSlide.scroll', function (msg, data) {

    // function setActiveEl(isEl, isAtrr, isClass){

    //     isEl.forEach( (sl,el) => {
    //
    //         if ( sl.dataset.isAtrr == data.from ) sl.classList.remove(isClass);
    //         if ( sl.dataset.isAtrr == data.to ) sl.classList.add(isClass);
    //
    //         console.log(':|',sl.attributes["0"], ':|', el);
    //     });
    //
    // }

    // setActiveEl(slideAll, slide,'is-active');
    // setActiveEl(paginationBtn, gotoslide 'is-active');

});
PubSub.subscribe('gotoSlide.top', function (msg, data) {

    // //Show current dot
    // paginationBtn.forEach( btnSl => {
    //
    //     if ( btnSl.dataset.gotoslide == data.from ) btnSl.classList.remove('is-active');
    //     if ( btnSl.dataset.gotoslide == data.to ) btnSl.classList.add('is-active');
    //
    // });

});