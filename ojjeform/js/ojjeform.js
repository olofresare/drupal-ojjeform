(function ($, Drupal, window, document, undefined) {
	
	$(document).ready(function() {
		
		var $languageSwitcherForm = $('#language-switcher-form');
		
		/* Style form components with jquery plugin */
		if ($languageSwitcherForm.length > 0) {
			var formOptions = {
				types: {
					checkbox: true,
					radio: true,
					select: true
				}
			};
			$.ojjeform($languageSwitcherForm, formOptions);
		}
		
	});

})($jq || jQuery, Drupal, this, this.document);
