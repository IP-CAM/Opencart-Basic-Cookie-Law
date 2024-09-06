/*
	* This is a part of TLSCookiesEU OpenCart Plugin
	* 
*/
var TLSCookiesEU = {
	message: 'Nós usamos cookies para personalizar anúncios e melhorar a sua experiência no site. Ao continuar navegando, você concorda com a nossa ',
	button_text: 'Aceitar e continuar ',
	info_link_text: 'Política de Privacidade.',
	info_link: 'https://www.soplacas.tv.br/trocas-devolu%C3%A7%C3%A3o-duvida-garantia-prazo-compra-termos-e-condicoes.html',
	exdays: 0,
	style: '\
		#tlscookieseu-bar {\
		background-color: rgba(0,0,0,0.8);\
		color: #eeeeee;\
		font-size: 14px;\
		text-align: center;\
		padding: 15px 5px 15px 5px;\
		position: fixed;\
		bottom: 0;\
		left:0;\
		width: 100%;\
		display: block;\
		z-index: 999999;\
		}\
		#tlscookieseu-bar a, #tlscookieseu-bar a:visited {\
		margin: 5px;\
		text-decoration: none;\
		color: #ffffff;\
		}\
		#tlscookieseu-ok {\
		text-decoration: none;\
		background-color: #008800;\
		color: #ffffff;\
		padding: 5px;\
		border-radius: 3px;\
	}\
	',

	set: function() {
		if (TLSCookiesEU.exdays > 0) {
			var d = new Date();
			d.setTime(d.getTime() + (TLSCookiesEU.exdays * 24 * 60 * 60 * 1000));
			document.cookie = 'TLSCookiesEU=OK; ' + "expires=" + d.toUTCString();
		} else {
			document.cookie = 'TLSCookiesEU=OK;';
		}
	},
	get: function() {
		var name = 'TLSCookiesEU=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	},
	show: function() {
		var html = '\
		<style>' + 
		TLSCookiesEU.style + 
		'</style>' + 
		'<div id="tlscookieseu-bar">' + TLSCookiesEU.message +
		'<a href="' + TLSCookiesEU.info_link + '" target="_blank">' + TLSCookiesEU.info_link_text + '<\a>' +
		'<a href="" id="tlscookieseu-ok">' + TLSCookiesEU.button_text + '</a></div>'
		$('body').append(html);
		$('#tlscookieseu-ok').click(function(event) {
			TLSCookiesEU.set();
			$('#tlscookieseu-bar').fadeOut(300, function(){$('#tlscookieseu-bar').remove()});
			event.preventDefault();
		});
	},
	run: function() {
		if (TLSCookiesEU.get() == 'OK') {
			return;
			} else {
			TLSCookiesEU.show();
		}
	}
}

$(function () {
	TLSCookiesEU.run();
});
