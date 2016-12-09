nunjucks.configure({
    autoescape: false, // не знаю как нормально сделать ссылку в 3 статье, поэтому с тегами запихал
    web: {
      async: false //если асинхронно то статьи в случайном порядке распологаются
    }
});

$(document).ready(function() {
	
	$.getJSON( "./mock/structure.json", function(data) {
		for (item in data.articles) {
					nunjucks.render('./partials/article.html', data.articles[item], function (err, res) {
          			$('.js-articles').append(res);
        		});
      	}
	}); 
	
	$('.header_nav').click(function() {
		var menu = $('.header_menu');
		menu.css('position','absolute');
		menu.css('top','10px');
		menu.css('right','55px');
		menu.css('padding','20px');
		menu.css('background-color','#252b4d');
		menu.slideToggle(250);
	});
});