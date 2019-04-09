var OwlCarousel = function () {

    return {

        //Owl Carousel
        initOwlCarousel: function () {
	        //Owl Slider v1
			var owl = jQuery(".owl-slider").owlCarousel({
				items : 4,
                itemsDesktop : [1000,4],
                itemsDesktopSmall : [900,2],
                itemsTablet: [600,1],
                itemsMobile : [479,1],
				//navigation: true,
				//navigationText : ["<i class=\"fa fa-angle-left\"></i>","<i class=\"fa fa-angle-right\"></i>"],
            });
            jQuery(".next-v1").click(function(){
                owl.trigger('owl.next');
            })
            jQuery(".prev-v1").click(function(){
                owl.trigger('owl.prev');
            })


	        //Owl Slider v2
			var owl1 = jQuery(".owl-slider-v2").owlCarousel({
                itemsDesktop : [1000,5],
                itemsDesktopSmall : [900,4],
                itemsTablet: [600,3],
                itemsMobile : [479,2],
                slideSpeed: 1000
            });
            jQuery(".next-v2").click(function(){
                owl1.trigger('owl.next');
            })
            jQuery(".prev-v2").click(function(){
                owl1.trigger('owl.prev');
            })


	        //Owl Slider v3
			jQuery(".owl-slider-v3").owlCarousel({
            	items : 9,
            	autoPlay : 5000,
				itemsDesktop : [1000,5],
				itemsDesktopSmall : [900,4],
				itemsTablet: [600,3],
				itemsMobile : [300,2]
            });


	        //Owl Slider v4
			jQuery(".owl-slider-v4").owlCarousel({
                items:3,
                itemsDesktop : [1000,3],
                itemsTablet : [600,2],
                itemsMobile : [479,1]
            });
				
				//Owl Slider v4.1
		        jQuery(document).ready(function() {
		        var owl = jQuery(".owl-slider-v-4");
		            owl.owlCarousel({
						autoPlay : true,
		                items:2,
		                itemsDesktop : [1024,2], //3 items between 1000px and 901px
		                itemsTablet: [768,1], //2 items between 600 and 0;
		                itemsMobile : [479,1] //1 itemsMobile disabled - inherit from itemsTablet option
		            });
				});				 

            //Owl Slider v5
            jQuery(document).ready(function() {
            var owl = jQuery(".owl-slider-v5");
                owl.owlCarousel({
                    items:1,
                    itemsDesktop : [1000,1],
                    itemsDesktopSmall : [900,1],
                    itemsTablet: [600,1],
                    itemsMobile : [479,1]
                });
            });


            //Owl Slider v6
            jQuery(document).ready(function() {
            var owl = jQuery(".owl-slider-v6");
                owl.owlCarousel({
                    items:5,
                    itemsDesktop : [1000,4],
                    itemsDesktopSmall : [979,3],
                    itemsTablet: [600,2],
                });
            });


            //Owl Twitter v1
            jQuery(".owl-twitter-v1").owlCarousel({
                singleItem : true,
                slideSpeed : 1000,
                autoPlay : 10000,              
            });


            //Owl Slider Parthners
            jQuery(".owl-slider-parthners").owlCarousel({
                slideSpeed : 600,
				stopOnHover : true,
				autoPlay : 15000,
                //singleItem : true,
		
				items : 5,
				itemsDesktop : [1199,4],
				itemsDesktopSmall : [980,3],
				itemsTablet: [768,5],
				itemsMobile : [479,2],

                navigation : true,
                navigationText : ["<i class=\"fa fa-chevron-left\"></i>","<i class=\"fa fa-chevron-right\"></i>"],
				pagination : false,
				transitionStyle : "fade",
				lazyLoad : true,

            });
			//Owl Testimonials v1
            jQuery(".owl-ts-v1").owlCarousel({
                slideSpeed : 600,
                singleItem : true,
                navigation : true,
                navigationText : ["<i class=\"fa fa-chevron-left\"></i>","<i class=\"fa fa-chevron-right\"></i>"],
				pagination : true,
				transitionStyle : "fade",
				lazyLoad : true,
            });
			
			/*** transitionStyle: fade, backSlide, goDown, fadeUp, ***/


            //Owl Clients v1
            jQuery(".owl-clients-v1").owlCarousel({
                items : 7,
                autoPlay : 5000,
                itemsDesktop : [1000,5],
                itemsDesktopSmall : [900,4],
                itemsTablet: [600,3],
                itemsMobile : [300,2]
            });


            //Owl Clients v2
            jQuery(".owl-clients-v2").owlCarousel({
                items : 5,
                autoPlay : 10000,
                itemsDesktop : [1000,5],
                itemsDesktopSmall : [900,4],
                itemsTablet: [600,3],
                itemsMobile : [300,2]
            });

            
            //Owl Video
            jQuery(".owl-video").owlCarousel({
                items : 1,
                itemsDesktop : [1000,1],
                itemsDesktopSmall : [900,1],
                itemsTablet: [600,1],
                itemsMobile : [300,1]
            }); 
            /*jQuery(".owl-basket").owlCarousel({
                items : 2,
                autoPlay : false,
				//navigation : true,
				//autoHeight : true,
                itemsDesktop : [1000,2],
                itemsDesktopSmall : [900,2],
                itemsTablet : [667,1],
                itemsMobile : [479,1]
            });*/
		}
        
    };
    
}();