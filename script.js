(function(btns, pages, page) {

	document.addEventListener('DOMContentLoaded', function() { 	
		pages.appendChild(page);
		togglePrintView();
		updateButtons();			
		Array.prototype.slice.call(btns, 0).forEach(function(btn) {
			btn.addEventListener('change', updateHash, false);
		}); 
	}, false);

	window.addEventListener('hashchange', function() { 
		togglePrintView(); 
		updateButtons();
	}, false);

	function togglePrintView() {
		if (window.location.href.split('#')[1] === 'print' && pages.childNodes.length < 2) {			
			pages.appendChild(page.cloneNode(true));
			document.body.classList.add('print');
		} else if (pages.childNodes.length > 1) {			
			while(!!pages.childNodes[0]) {
				pages.removeChild(pages.childNodes[0]);
			}
			pages.appendChild(page);
			document.body.classList.remove('print');
		}
	}

	function updateButtons() {
		pages.childNodes.length > 1 ? btns[1].checked = true : btns[0].checked = true;	
	}

	function updateHash() {
		if (!!window.location.href.split('#')[1]) {
			window.location = window.location.href.split('#')[0] + '#';
		} else {
			window.location = '#print';
		}
	}

})(	document.querySelectorAll('input[type=radio]'), 
	document.querySelector('.pages'), 
	document.querySelector('.page'));