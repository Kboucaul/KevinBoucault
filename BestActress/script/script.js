$(function()
{
	var $mainMenuItems = $("#main-menu ul").children("li");
	var totalMainMenuItems =$mainMenuItems.length;
	var openedIndex;

	var init = function()
	{
		openedIndex = randFirstIndex();
		console.log(openedIndex);
		bindEvents();
		if (validIndex(openedIndex))
		{
			animateItem($mainMenuItems.eq(openedIndex), true, 700);
		}
	};

	var bindEvents = function()
	{
		$mainMenuItems.children(".images").click(function()
		{
			var newIndex = $(this).parent().index();
			checkAndAnimateItem(newIndex);
		});
		$(".button").hover(
			function()
			{
				$(this).addClass("hovered");	
			},
			function()
			{
				$(this).removeClass("hovered");
			}
		);
		$(".button").click(function(){
			var newIndex = $(this).index();
			checkAndAnimateItem(newIndex);
		});
	};

	var randFirstIndex = function()
	{
		var nb = -1;

		while (nb < 0 || nb >= totalMainMenuItems)
		{
			nb = Math.floor(Math.random()*10);
		}
		return nb;
	};

	var validIndex = function(index)
	{
		if (index <= -1 || index >= totalMainMenuItems)
			return false
		return true;
	};

	var animateItem = function($item, stat, speed) 
	{
			var $colorImage = $item.find(".color");
			var itemParam = (stat) ? {width: "420px"} : {width:"140px"};
			var colorImageParam = (stat) ? {left: "0px"} : {left:"140px"};
			$colorImage.animate(colorImageParam,speed);
			$item.animate(itemParam, speed);
	};

	var checkAndAnimateItem = function(indexToCheckAndAnimate)
	{
			if (openedIndex === indexToCheckAndAnimate)
			{
				animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250);
				openedIndex = -1;
			}
			else
			{
				if (validIndex(indexToCheckAndAnimate))
				{
					animateItem($mainMenuItems.eq(openedIndex), false, 250);
					openedIndex = indexToCheckAndAnimate;
					animateItem($mainMenuItems.eq(indexToCheckAndAnimate), true, 250);
				}
			}
	}
	init();
});
