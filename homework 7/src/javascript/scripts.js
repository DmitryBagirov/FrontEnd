String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

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
	
	function addInvalid(element, text) {
		var invalidText = 
			'<div class="invalidtext" style="top: {0}px">{1}</div>'
		.format($(element).position().top+42,text);
		$(element).addClass('invalid');
		var contacts = $("#contacts");
		$(contacts).append(invalidText);
	}
	
	function validate(element, event, pattern) {
		if(pattern.test($(element).val())) {	
			return true;
		}	
		event.preventDefault();
		return false;
	}
	
	$('#datepicker').datepicker();
	$('#datepicker').off();
	
	$('.datepicker').click(function(){
		//$(".input[name='birth']").inputmask("remove");
		$('#datepicker').datepicker('show');
	});
	
	$(".input[name='phone']").inputmask("+9(999)999-99-99"); 
	$(".input[name='birth']").inputmask("m/d/y"); 
		
	$("#contacts").on("submit", function(event) {
		var name = $(".input[name='name']");
		var lastname = $(".input[name='lastname']");
		var email = $(".input[name='email']");
		var phone = $(".input[name='phone']");
		var birth = $(".input[name='birth']");
		var sex = $(".input[name='sex']");
	
		//clear
		$('.input').each(function(){
			$(this).removeClass('invalid');
		});
		$('.invalidtext').each(function() {
			$(this).remove();	
		});

		if (!validate(name, event, /^[A-z]{2,16}$/)) {
			addInvalid(name, 'Field must contain only letters and not be an empty');
		}
		
		if (!validate(lastname, event, /^[A-z]{2,16}$/)) {
			addInvalid(lastname, 'Field must contain only letters and not be an empty');
		}
		
		if (!validate(email, event, /^[A-z0-9\._\-]+@[A-z0-9\.]+\.[A-z]{2,4}$/)) {
			addInvalid(email, 'Field does not match the pattern');
		}
		
		if (!validate(phone, event, /^\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}$/)) {
			addInvalid(phone, 'Field does not match the pattern +#(###)###-##-##');
		}
		
		if (!validate(birth, event, /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}/)) {
			addInvalid(birth, 'Field does not match the pattern MM.DD.YYYY');
		}
		
  		//event.preventDefault();	
		//$("#contacts").submit();
	});
	
	$(document).click(function(e){
		var menu = $('.header_menu');
		if ($(e.target).is('.header_nav')) {
			menu.slideToggle(250);
		}
		else {
			menu.slideUp(250);
		}
	});
});