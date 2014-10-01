(function($) {
 
    $.ojjeform = function(forms, options) {        
		/* Set our default settings */
		var defaults = {
			types: {
			    checkbox: false,
			    radio: false,
			    select: false,
			    submit: false
			}
		};

		/* Merge the defaults with the user provided options recursive */
        var settings = $.extend(true, {}, defaults, options);    

        forms.each(function(e, v) {
            var form = $(v);
            var formItems = form.find('input[type=checkbox], input[type=radio], input[type=submit], select');
            form.addClass('ojjeform');
            
            if (settings.types.checkbox == false) {
                formItems = formItems.not('[type=checkbox]');
            }
            if (settings.types.radio == false) {
                formItems = formItems.not('[type=radio]');
            }
            if (settings.types.select == false) {
                formItems = formItems.not('select');
            }
            if (settings.types.submit == false) {
                formItems = formItems.not('[type=submit]');
            }
            
            formItems.each(function(i, o) {
                var item = $(o);
                var parent = item.parent();
                var tagType = o.tagName.toLowerCase();

                if (tagType == 'select') {
                    itemType = 'ojjeform-select';
                    var label = parent.find('label');
                    var selectLink = '<div class="ojjeform-select-chosen"><a href="#" class="ojjeform-select-chosen-link"></a></div>';
                    parent.append(selectLink);
                    var listClass = itemType + '-list';
                    var selectList = $('<ul class="' + listClass + '"/>');
                    parent.append(selectList);
                    
                    var optionsArray = [];                
                    var listOptions = item.find('option');
                    
                    listOptions.each(function(k, opt) {
                        var optObj = $(opt);
                        optionsArray.push('<li><a class="' + itemType + '" href="#" data-value="' + optObj.val() + '">' + optObj.text() + '</a></li>');
                    });   
                    
                    var optionString = optionsArray.join('');
                    selectList.append(optionString);
                    
                    var selectedValue = item.find('option:selected').text();
                    var selectedWrapper = parent.find('.ojjeform-select-chosen');
                    var selectedLi = selectedWrapper.find('.ojjeform-select-chosen-link');
                    if (selectedValue.length > 0) {
                        selectedLi.text(selectedValue);
                    }        
                    
                    selectList.slideUp(0, function() {
                        selectList.removeClass('open');
                    });
                    
                } else if(tagType == 'input') {
                    var itemType = 'ojjeform-' + $(o).attr('type');
                    var label = parent.find('label');
                    var link = '<a href="#" class="' + itemType + '"><span class="icon-marker"></span><span class="icon"></span><span class="text">' + label.text() + '</span></a>';
                    parent.append(link);
                }
            });
        });
        
        forms.on('click', 'a.ojjeform-checkbox', function() {
            var link = $(this);
            var parent = link.parent();
            var checkbox = parent.find('input.form-checkbox');
            if (checkbox.is(':disabled') == false) {            
                if (parent.hasClass('active') == false) {
                    parent.addClass('active');
                    checkbox.prop("checked", true).trigger('change');
                } else {
                    parent.removeClass('active');
                    checkbox.prop("checked", false).trigger('change');
                }
            }
            return false;
        });
        
        forms.on('click', 'a.ojjeform-radio', function() {
            var link = $(this);
            var parent = link.parent();
            var radio = parent.find('input.form-radio');
            if (radio.is(':disabled') == false) {    
                if (parent.hasClass('active') == false) {
                    var radios = link.parents('.form-radios');
                    radios.find('.form-type-radio').removeClass('active');
                    radios.find("input:radio").prop("checked", false);
                    
                    parent.addClass('active');   
                    parent.find('input.form-radio').prop("checked", true).trigger("change");    
                } else {
                    parent.find('input.form-radio').prop("checked", false);
                    parent.removeClass('active');
                }
            }
            return false;
        });
        
        forms.on('click', 'a.ojjeform-select', function() {
            var link = $(this);
            var parentLi = link.parent();
            var parentUl = parentLi.parent();
            var wrapper = parentUl.parent();
            var select = wrapper.find('select');
            var selectedWrapper = wrapper.find('.ojjeform-select-chosen');
            var selectedLink = selectedWrapper.find('.ojjeform-select-chosen-link');
            if (select.is(':disabled') == false) {
                if (link.hasClass('open') == false) {
                    var selectList = link.parents('ul');
                    selectList.find('li').each(function(index, selectObj) {
                        $(selectObj).removeClass('active');
                    });
                    parentLi.addClass('active');   
                    var chosenVal = link.data('value');
                    selectedLink.text(link.text());    
                    selectList.slideUp(200, function() {
                        selectList.removeClass('open');
                        var optionToChoose = select.find('option[value="'+chosenVal+'"]');
                        optionToChoose.prop('selected', true).trigger('change');
                    });
                } else {
                
                }
            }
            return false;
        });
        
        forms.on('click', 'a.ojjeform-select-chosen-link', function() {
            var link = $(this);
            var parent = link.parent();
            var wrapper = parent.parent();
            var select = wrapper.find('select');
            if (select.is(':disabled') == false) {
                var selectList = wrapper.find('ul.ojjeform-select-list');
                if (selectList.hasClass('open')) {
                    selectList.slideUp(200, function(){
                        selectList.removeClass('open');
                    });
                } else {
                    selectList.slideDown(200, function(){
                        selectList.addClass('open');
                    });
                }
            }
            return false;
        });
        
        forms.on('reset', function() {
          var form = $(this);
          form.find('.active').removeClass('active');
        });
        
    };
})($jq || jQuery);