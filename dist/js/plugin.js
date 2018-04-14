'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* js */

var slider = document.getElementById('slider-gaps');
var pagination = document.querySelectorAll('#pagination li a');

console.dir(pagination);

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

                PubSub.publish('gotoSlide', { from: _this.activeSlide, to: newSlide });

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

            var linkNav = [].slice.call(pagination);

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

    console.log(msg, data);

    $('[data-slide=' + data.from + '], [data-gotoslide=' + data.from + ']').removeClass('is-active');

    $('[data-slide=' + data.to + '], [data-gotoslide=' + data.to + ']').addClass('is-active');

    // let currentSlide = $('[data-slide='+data.from+'], [data-gotoslide='+data.from+']');
    // let newSide = $('[data-slide='+data.to+'], [data-gotoslide='+data.to+']');
    //
    // let tl = new TimelineMax;
    //
    // tl.fromTo(currentSlide,1,{opacity:0})
    //     .to(newSide,1,{opacity:1});
});