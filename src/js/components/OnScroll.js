export default class OnScroll{
    constructor()
    {
        this.defaultElements = $('.toggle-on-scroll');
        this.boot();
    }

    boot()
    {
        this.onScroll();
    }

    onScroll()
    {
        let self = this;

        $(window).scroll(function() {

            self.defaultElements.each(function() {
          
              let _win     = $(window),
                  _ths     = $(this),
                  _pos    = _ths.offset().top,
                  _scroll = _win.scrollTop(),
                  _height = _win.height();
          
              (_scroll > _pos - _height * .7) ? _ths.addClass('anim') : _ths.removeClass('anim');
          
            });

        });
    }
}