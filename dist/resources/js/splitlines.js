'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var FESplitLines = {
    Init: function Init() {
        this.Scroll();
        this.AddLines();
        this.Intersection();
        this.FadeIn();
    },
    Scroll: function Scroll() {
        var scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true
        });
    },
    AddLines: function AddLines() {
        $('.js-line-splitting').each(function () {
            var $this = $(this);
            $this.splitLines({ tag: '<div class="line-outter"><div class="line-inner">', keepHtml: true });
        });
    },
    FadeIn: function FadeIn() {
        $('body').css({ opacity: 1 });
    },
    Intersection: function Intersection() {
        var el = [].concat(_toConsumableArray(document.querySelectorAll('.line-outter')));

        var options = {
            rootMargin: '-10%',
            threshold: 0.0
        };

        var observer = new IntersectionObserver(showItem, options);

        function showItem(entries) {
            console.log(entries);
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.children[0].classList.add('is-animate');
                }
            });
        }

        el.forEach(function (item) {
            var newString = '';
            //let itemText = item.children[0].innerText().split();
            //itemText.map((letter) => (newString += letter = ' ' ? `<span class="gap"></span>` : `<span>${letter}</span>`));

            observer.observe(item);
        });
    }
};