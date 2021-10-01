var FESplitLines = {
    Init: function Init() {
        this.AddLines();
        this.Intersection();
        this.FadeIn();
    },
    AddLines: function () {
        $('.js-line-splitting').each(function () {
            var $this = $(this);
            $this.splitLines({ tag: '<div class="line-outter"><div class="line-inner">', keepHtml: true });
        });
    },
    FadeIn: function () {
        $('body').css({ opacity: 1 });
    },
    Intersection: function () {
        let el = [...document.querySelectorAll('.line-outter')];

        let options = {
            rootMargin: '-10%',
            threshold: 0.0,
        };

        let observer = new IntersectionObserver(showItem, options);

        function showItem(entries) {
            console.log(entries);
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.children[0].classList.add('is-animate');
                }
            });
        }

        el.forEach((item) => {
            let newString = '';
            //let itemText = item.children[0].innerText().split();
            //itemText.map((letter) => (newString += letter = ' ' ? `<span class="gap"></span>` : `<span>${letter}</span>`));

            observer.observe(item);
        });
    },
};
