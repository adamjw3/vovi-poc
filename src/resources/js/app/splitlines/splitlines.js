var FESplitLines = {
    Init: function Init() {
        $('.js-line-splitting').each(function () {
            var $this = $(this);
            $this.splitLines({ tag: '<div class="line-outter"><div class="line-inner">', keepHtml: true });
        });

        $(document).ready(function () {
            $('.line-outter').each(function () {
                var $this = $(this);
                if ($this.inView('both', 200)) {
                    var $line = $this.find('.line-inner');
                    var tl = gsap.timeline();

                    tl.staggerTo($line, 1, { y: 0, ease: 'power2' }, 0.5);
                }
            });
        });
    },
    Scroll: function () {
        $(window).scroll(function () {
            $('.line-outter').each(function () {
                var $this = $(this);
                if ($this.inView('both', 200)) {
                    var $line = $this.find('.line-inner');
                    var tl = gsap.timeline();

                    tl.staggerTo($line, 1, { y: 0, ease: 'power2' }, 0.5);
                }
            });
        });
    },
};
