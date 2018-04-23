'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tl = TweenLite;
var slider = document.getElementById('slider-gaps');
var paginationBtn = document.querySelectorAll('#pagination li a');
var slideAll = slider.querySelectorAll('.slide');

var SliderGsap = function () {
    function SliderGsap() {
        _classCallCheck(this, SliderGsap);

        this.scrollEvent();
        this.cliclEvent();
        this.activeSlide = 1;
        this.canGo = true;
        this.maxSlide = 5;
    }

    _createClass(SliderGsap, [{
        key: 'scrollEvent',
        value: function scrollEvent() {
            var _this = this;

            slider.addEventListener('wheel', function (e) {

                if (!_this.canGo) return;
                _this.canGo = false;

                var direction = e.wheelDeltaY < 0 ? 1 : -1;
                var newSlide = +_this.activeSlide + +direction;

                if (newSlide > _this.maxSlide) newSlide = 1;
                if (newSlide < 1) newSlide = 5;

                PubSub.publish('gotoSlide', { from: _this.activeSlide, to: +newSlide });

                _this.activeSlide = newSlide;

                setTimeout(function () {
                    _this.canGo = true;
                }, 600);
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

                        PubSub.publish('gotoSlide', { from: +_this2.activeSlide, to: +newSlide });

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

    slideAll.forEach(function (sl) {

        if (sl.dataset.slide == data.from) tl.fromTo(sl, .25, { opacity: 1 }, { opacity: 0 });
        if (sl.dataset.slide == data.to) tl.fromTo(sl, .25, { opacity: 0 }, { opacity: 1 });

        // tl.fromTo(sl.dataset.item == 1 , .3, {opacity:0, width: 30}, {opacity:1, width: 40});


        var getImg = document.getElementsByTagName('img');
        console.log(getImg);
    });

    paginationBtn.forEach(function (btnSl) {

        if (btnSl.dataset.gotoslide == data.from) btnSl.classList.remove('is-active');
        if (btnSl.dataset.gotoslide == data.to) btnSl.classList.add('is-active');
    });
});