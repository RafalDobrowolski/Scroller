
{
    class Scroller {
        constructor(el) {
            this.DOM = {};
            this.el = el;
            this.sections = [];
            this.isScroll = false;
            this.init();
        }

         inViewport (elem) {
            const rect = elem.getBoundingClientRect();
            console.log(rect);
            return (
                (rect.top <= 0 && rect.bottom >= 0) ||
                (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                  rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
                (rect.top >= 0 &&
                  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
              );
        }
        scrollHandler() {
            if (!this.isScroll) {
                window.requestAnimationFrame(() => {
                    this.scrollPage();
                    this.isScrolling = false;
                  });
                this.isScroll = true;
                //setTimeout(() => { this.scrollPage(); }, 60 );
            }
        }
        init() {
            //if( Modernizr.touch ) return;
            this.sections = Array.from(this.el.querySelectorAll('.cbp-so-section'));
            this.sections.forEach((el, i) => {
				if(!this.inViewport(el)) {
                    debugger;
					el.classList.add('cbp-so-init');
				}
            } );
            
            window.addEventListener('scroll', () => this.scrollHandler(), false);
            // document.addEventListener("DOMContentLoaded", () => this.scrollHandler(), false);
        }

        scrollPage() {
            this.sections.forEach((el, i) => {
                if(this.inViewport(el)) {
                    el.classList.add("cbp-so-animate");
                    console.log('in view POrt');
                } else {
                    console.log(el);
                    el.classList.add('cbp-so-init');
                    el.classList.remove("cbp-so-animate");
                    console.log('NOT in view POrt');
                }
            });

            this.isScroll = false;
        }

    }
    window.Scroller = Scroller;
};