$(function () {

	if (window.PORTFOLIO_SCRIPTS_ENABLED !== undefined)
	{
	
		var prevScrollTop = $(document).height();
		var ajaxAfterScroll = false;
		var ajaxScrollTimeout = 0;
		
		function GetLoadMoreType($loadMoreBtn) {
			return $loadMoreBtn.data("load-more-type");
		}
		
		function GetLoadedItemsCnt(loadTo, $loadMoreBtn) {
			var loadType = GetLoadMoreType($loadMoreBtn);
			if (loadType == "cube-portfolio")
			{
				return $(loadTo).find(".cbp-wrapper-front .cbp-item").not(".cbp-item-hidden").length;
			}
			if (loadType == "timeline")
			{
				return $(loadTo).find(".item").length;
			}
		}
		function ShowLoadMoreBtn($loadMoreBtn) {
			$loadMoreBtn.removeClass("disabled");
		}
		function HideLoadMoreBtn($loadMoreBtn) {
			$loadMoreBtn.addClass("disabled");
		}
		
		$(".js-ajax-load-btn").click( function (e) {
			e.preventDefault();
			if ($(this).hasClass("disabled"))
			{
				return;
			}
			
			var $loadMoreBtn = $(this);
			var ajaxId = $(this).data("ajax-id");
			var loadTo = $(this).data("load-to");
			var href = window.location.pathname;
			if ($(loadTo).length)
			{
				if (GetLoadMoreType($loadMoreBtn) == "cube-portfolio")
				{
					var $activeFilter = $(loadTo).parent().find(".cbp-filter-item-active");
					var sectionId = $activeFilter.data("section-id") || "";
					var totalElementCnt = $activeFilter.data("element-cnt");
					
					if (GetLoadedItemsCnt(loadTo, $loadMoreBtn) < totalElementCnt)
					{
						var excludeItems = [];
						$(loadTo).find(".cbp-wrapper-front .cbp-item").not(".cbp-item-hidden").each( function () {
							excludeItems.push($(this).data("item-id"));
						});
						
						var keepClass = $loadMoreBtn.find(".fa").attr("class");
						$loadMoreBtn.find(".fa").attr("class", "fa fa-spinner fa-spin");
						var isHidden = $loadMoreBtn.hasClass("hidden");
						$loadMoreBtn.removeClass("hidden");
						$.get(
							href,
							{
								isAjax : "Y",
								ajaxId : ajaxId,
								sectionId : sectionId,
								excludeItems : excludeItems.join(","),
							},
							function (data) {
								$(loadTo).cubeportfolio('appendItems', data, function () {
									if (isHidden)
									{
										$loadMoreBtn.addClass("hidden")
									}
									$loadMoreBtn.find(".fa").attr("class", keepClass);
									if (GetLoadedItemsCnt(loadTo, $loadMoreBtn) >= totalElementCnt)
									{
										HideLoadMoreBtn($loadMoreBtn);
									}
								});
								ajaxAfterScroll = false;
							}
						);
					}
					else
					{
						HideLoadMoreBtn($loadMoreBtn);
					}
				}
				
				if (GetLoadMoreType($loadMoreBtn) == "timeline")
				{
					var totalElementCnt = $loadMoreBtn.data("total-element-cnt");
					if (GetLoadedItemsCnt(loadTo, $loadMoreBtn) < totalElementCnt)
					{
						var excludeItems = [];
						$(loadTo).find(".item").each( function () {
							excludeItems.push($(this).data("item-id"));
						});
						
						var keepClass = $loadMoreBtn.find(".fa").attr("class");
						$loadMoreBtn.find(".fa").attr("class", "fa fa-spinner fa-spin");
						$.get(
							href,
							{
								isAjax : "Y",
								ajaxId : ajaxId,
								sectionId : "all",
								excludeItems : excludeItems.join(","),
							},
							function (data) {
								$(loadTo).append(data);
								$loadMoreBtn.find(".fa").attr("class", keepClass);
								if (GetLoadedItemsCnt(loadTo, $loadMoreBtn) >= totalElementCnt)
								{
									HideLoadMoreBtn($loadMoreBtn);
								}
								ajaxAfterScroll = false;
							}
						);
					}
					else
					{
						HideLoadMoreBtn($loadMoreBtn);
					}
				}
			}
			return false;
		});
		
		$(".cbp-filter-item").click( function (e) {
			var ajaxId = $(this).parent().data("ajax-id");
			var $this = $(this);
			setTimeout(
				function () {
					var $loadMoreBtn = $(".js-ajax-load-btn[data-ajax-id='" + ajaxId + "']");
					var loadTo = $loadMoreBtn.data("load-to");
					var sectionId = $this.data("section-id") || "";
					var newsCount = parseInt($loadMoreBtn.data("news-count"));
					var totalCount = parseInt($this.data("element-cnt"));
					var currNewsCount = GetLoadedItemsCnt(loadTo, $loadMoreBtn);
					
					if (currNewsCount < totalCount)
					{
						ShowLoadMoreBtn($loadMoreBtn);
					}
					else
					{
						HideLoadMoreBtn($loadMoreBtn);
					}
						
					if (sectionId)
					{
						if (currNewsCount % newsCount !== 0)
						{
							$(".js-ajax-load-btn[data-ajax-id='" + ajaxId + "']").click();
						}
					}
				},
				200
				);
		});
		
		if (window.PORTFOLIO_AJAX_SCROLL_ENABLED !== undefined)
		{
			if (window.PORTFOLIO_AJAX_SCROLL_ENABLED || false)
			{
				$(window).scroll(function() {
					currScrollTop = $(window).scrollTop();
					if (!ajaxAfterScroll)
					{
						if (currScrollTop > prevScrollTop)
						{
							var isLoad = false;
							if ($(".load-more-c").length)
							{
								isLoad = $(".load-more-c").offset().top - currScrollTop < $(window).height();
							}
							else
							{
								isLoad = currScrollTop + $(window).height() >= $(document).height()
							}
							if (isLoad)
							{
								ajaxAfterScroll = true;
								ajaxScrollTimeout = setTimeout(function() {
									$(".js-ajax-load-btn").click();
								}, 500);
							}
						}
						else
						{
							if (ajaxScrollTimeout)
							{
								clearTimeout(ajaxScrollTimeout);
							}
						}
					}
					prevScrollTop = currScrollTop;
			   });
			}
		}
	}
});


//----------------------------------
$(function () {
	
	//load portfolio items on index page
	$("body").on("click", ".js-inx-load-portfolio.cbp-filter-item", function (e) {
		var $this = $(this);
		console.log(1);
		setTimeout(
			function () {
				var newsCount = $this.data("news-count");
				var sectionId = $this.data("section-id");
				var excludeItems = [];
				$("#grid-container").find(".cbp-wrapper-front .cbp-item").not(".cbp-item-hidden").each( function () {
					excludeItems.push($(this).data("item-id"));
				});
				
				$.get(
					window.SITE_DIR + 'ajax/loadMorePortfolio.php',
					{
						sectionId : sectionId,
						excludeItems : excludeItems.join(","),
						newsCount : newsCount,
					},
					function (data) {
						$("#grid-container").cubeportfolio('appendItems', data);
						$this.removeClass("js-inx-load-portfolio");
					}
				);
			},
			200
		);
	});
	
	//---------------------------------------------------------------------------------------
	$("body").on("click", ".js-form-check-before-submit label[type=submit]", function (e) {
		var $form = $(this).parents(".js-form-check-before-submit");
		var $fields = $form.find(".required-field");
		var errors = 0;
		
		$fields.each( function (inx, val) {
			$(this).parent().removeClass("has-error");
			$(this).parent().removeClass("has-success");
			var fieldVal = $(this).val();
			var tagName = $(this).prop("tagName").toLowerCase();
			var fieldName = $(this).attr("name");
			if (!fieldVal)
			{
				errors++;
				$(this).parent().addClass("has-error");
			}
			else
			{
				if (tagName == "textarea" && fieldVal.length <= 3)
				{
					errors++;
					$(this).parent().addClass("has-error");
				}
				else
				{
					if (fieldName !== "captcha_word")
					{
						$(this).parent().addClass("has-success");
					}
				}
			}
		});
		
		if (errors > 0)
		{
			e.preventDefault();
			return false;
		}
		else
		{
			$(".js-form-check-before-submit input[type=submit]").click();
			return true;
		}
	});
	
	//---------------------------------------------------------------------------------------
	$(".apsel-form .field-row[data-prop-code='PAGE_TITLE'] input").val(window.document.title);
	$(".apsel-form .field-row[data-prop-code='PAGE'] input").val(window.location.href);
	 
	
});