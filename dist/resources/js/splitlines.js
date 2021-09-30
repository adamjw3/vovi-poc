'use strict';

var FESplitLines = {
    Init: function Init() {
        $('.js-line-splitting1').splitLines({ tag: '<div class="line-outter"><div class="line-inner">', keepHtml: true });
        $('.js-line-splitting2').splitLines({ tag: '<div class="line-outter"><div class="line-inner">', keepHtml: true });

        $(document).ready(function () {
            var tl = gsap.timeline();

            tl.staggerTo('.line-inner', 1, { y: 0, ease: 'power2' }, 0.3);
        });
    }
};