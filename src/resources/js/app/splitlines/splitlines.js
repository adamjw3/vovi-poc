var FESplitLines = {
    Init: function Init() {
        this.AddLines();
        this.Scroll();
    },
    Scroll: function () {
        new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
        });
    },
    AddLines: function () {
        $('.js-line-splitting').each(function () {
            var $this = $(this);
            $this.splitLines({ tag: '<div class="line-outter"><div class="line-inner" data-scroll>', keepHtml: true });
        });
    },
};
