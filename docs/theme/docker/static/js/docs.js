
    // Function to make the sticky header possible
    var shiftWindow = function() {
        scrollBy(0, -70);
        console.log("window shifted")
    };
    window.addEventListener("hashchange", shiftWindow);

    function loadShift() {
        if (window.location.hash) {
            console.log("window has hash");
            shiftWindow();
        }
    }

    $(window).load(function() {
        loadShift();
        console.log("late loadshift");
    });

    $(function(){

        // sidebar accordian-ing
        // don't apply on last object (it should be the FAQ) or the first (it should be introduction)

        // define an array to which all opened items should be added
        var openmenus = [];

        var elements = $('.toctree-l2');
        for (var i = 0; i < elements.length; i += 1) { var current = $(elements[i]); current.children('ul').hide();}


        // set initial collapsed state
        var elements = $('.toctree-l1');
        for (var i = 0; i < elements.length; i += 1) {
            var current = $(elements[i]);
            if (current.hasClass('current')) {

                currentlink = current.children('a')[0].href;
                openmenus.push(currentlink);

                // do nothing
            } else {
                // collapse children
                current.children('ul').hide();
            }
        }

        $(function(){
            $("#versionWidget a:contains('Master')").parent().addClass('active-slug');
        });

        // attached handler on click
        // Do not attach to first element or last (intro, faq) so that
        // first and last link directly instead of accordian
        $('.sidebar > ul > li > a').not(':last').not(':first').click(function(){

            var index = $.inArray(this.href, openmenus)

            if (index > -1) {
                console.log(index);
                openmenus.splice(index, 1);


                $(this).parent().children('ul').slideUp(200, function() {
                    $(this).parent().removeClass('open'); // toggle after effect
                });
            }
            else {
                openmenus.push(this.href);
                console.log(this);

                var current = $(this);

                setTimeout(function() {
                    $('.sidebar > ul > li').removeClass('current');
                    current.parent().addClass('current').addClass('open'); // toggle before effect
                    current.parent().children('ul').hide();
                    current.parent().children('ul').slideDown(200);
                }, 100);
            }
            return false;
        });

        // add class to all those which have children
        $('.sidebar > ul > li').not(':last').not(':first').addClass('has-children');

    });