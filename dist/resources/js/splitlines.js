'use strict';

var FESplitLines = {
    Init: function Init() {
        this.AddLines();
        this.Scroll();
        this.ShowBody();
    },
    Scroll: function Scroll() {
        new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true
        });
    },
    AddLines: function AddLines() {
        $('.js-line-splitting').each(function () {
            var $this = $(this);
            $this.splitLines({ tag: '<div class="line-outter"><div class="line-inner" data-scroll>', keepHtml: true });
        });
    },
    ShowBody: function ShowBody() {
        setTimeout(function () {
            $('body').removeClass('is-hidden');
        }, 1);
    }
};