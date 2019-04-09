var StyleSwitcher = function () {

    return {        

        //Style Switcher
        initStyleSwitcher: function() {    
		
			getCookie = function (name) {
				var matches = document.cookie.match(new RegExp(
					"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
				));
				return matches ? decodeURIComponent(matches[1]) : undefined;
			}
		
            var panel = jQuery('.style-switcher');

            jQuery('.style-switcher-btn').click(function () {
                jQuery('.style-switcher').show();
            });

            jQuery('.theme-close').click(function () {
                jQuery('.style-switcher').hide();
            });
            
            jQuery('li', panel).click(function () {

                var color = jQuery(this).attr("data-style");
                var data_header = jQuery(this).attr("data-header");
                setColor(color, data_header);
                jQuery('.list-unstyled li', panel).removeClass("theme-active");
                jQuery(this).addClass("theme-active");
            });

            var setColor = function (color, data_header) {
				
				var date = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
				document.cookie = "THEME_COLOR=" + color + "; path=/; expires=" + date.toUTCString();
				
                jQuery('#style_color').attr("href", SITE_TEMPLATE_PATH + "/assets/css/theme-colors/" + color + ".css");
                if(data_header == 'light'){
                    jQuery('.shrink-logo').attr("src", SITE_TEMPLATE_PATH + "/assets/img/logo/logo_" + color + ".png");
                    jQuery('#logo-footer').attr("src", SITE_TEMPLATE_PATH + "/assets/img/logo/logo_footer_" + color + ".png");
                } else if(data_header == 'dark'){
                    //jQuery('#logo-header').attr("src", SITE_TEMPLATE_PATH + "/assets/img/logo1-" + color + ".png");
                    //jQuery('#logo-footer').attr("src", SITE_TEMPLATE_PATH + "/assets/img/logo2-" + color + ".png");
                }
            }

            //Dark Layout
            jQuery('.skins-btn').click(function(){
                jQuery(this).addClass("active-switcher-btn");
                jQuery(".handle-skins-btn").removeClass("active-switcher-btn");
                jQuery("body").addClass("dark");                
            });
            jQuery('.handle-skins-btn').click(function(){
                jQuery(this).addClass("active-switcher-btn");
                jQuery(".skins-btn").removeClass("active-switcher-btn");
                jQuery("body").removeClass("dark");                
            });

			var themeColor = getCookie("THEME_COLOR")
			if (themeColor !== undefined)
			{
				panel.find("li").removeClass("theme-active");
				panel.find("li[data-style='" + themeColor + "']").addClass("theme-active");
			}
        }
        
    };

}();