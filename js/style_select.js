(function ($) {

	var StyleSelect = function ($select, options) {
		this.$select = $select;
		this.$options = this.$select.find('option');

		this.optionsLength = this.$options.length;

		this.optionMouseEventType = options.mouseEventType;
		this.optionAnimationType = options.animationType;
		this.optionAnimationDuration = options.animationDuration;
		this.optionChangeSubmit = options.changeSubmit;

		this.init();
	};
	StyleSelect.prototype = {
		init: function () {
			this.createStyledElement();
			this.eventTrigger();
		},
		createStyledElement: function () {
			var styledItems = [],
				optionValue, optionText;

			this.$styledContainer = $('<div class="styled-select-wrap">');
			this.$styledHead = $('<p class="styled-select-head">');
			this.$styledList = $('<ul class="styled-select">');

			for ( var i = 0; i < this.optionsLength; i++ ) {
				optionValue = this.$options[i].value;
				optionText = this.$options[i].innerHTML;
				styledItems.push('<li><a href="javascript:void(0);" value="' + optionValue + '" class="styled-option">' + optionText + '</a></li>');
			}

			this.$styledList.html(styledItems);
			this.$styledHead.text(this.$options[0].innerHTML);
			this.$styledContainer.append(this.$styledHead).append(this.$styledList);
			this.$select.after(this.$styledContainer);
			this.$select.css('display', 'none');
		},
		eventTrigger: function () {
			var self = this;

			this.$createdOptions = this.$styledList.find('.styled-option');
			this.$createdOptions.on('click', function () {
				self.changeStyledOption($(this));
			});

			if ( this.optionMouseEventType == 'click' ) {
				this.$styledHead.on('click', function () {
					self.displayStyledOptionClick($(this));
				});
			} else {
				this.$styledContainer.hover(function () {
					self.displayStyledOptionMouseOver($(this));
				}, function () {
					self.displayStyledOptionMouseOut($(this));
				});
			}
		},
		changeStyledOption: function ($this) {
			var createdOptionValue = $this.attr('value'),
				createdOptionText = $this.text();

			this.$styledHead.text(createdOptionText);
			this.$options.removeAttr('selected');
			this.$options.each(function () {
				if ( $(this).val() == createdOptionValue ) {
					$(this).attr('selected', 'selected');
				}
			});
			$this.parent().parent().fadeOut(100);

			if ( this.optionChangeSubmit ) {
				$this.parents('form').submit();
			}
		},
		displayStyledOptionClick: function ($this) {
			var $styledList = $this.next(this.$styledList);
			if ( $styledList.is(':hidden')) {
				if ( this.optionAnimationType == 'fade' ) {
					$styledList.fadeIn(this.optionAnimationDuration);
				} else {
					$styledList.slideDown(this.optionAnimationDuration);
				}
			} else {
				if ( this.optionAnimationType == 'fade' ) {
					$styledList.fadeOut(this.optionAnimationDuration);
				} else {
					$styledList.slideUp(this.optionAnimationDuration);
				}
			}
		},
		displayStyledOptionMouseOver: function ($this) {
			var $styledList = $this.find(this.$styledList);
			if ( $styledList.is(':animated') ) {
				return;
			}
			if ( this.optionAnimationType == 'fade' ) {
				$styledList.fadeIn(this.optionAnimationDuration);
			} else {
				$styledList.slideDown(this.optionAnimationDuration);
			}
		},
		displayStyledOptionMouseOut: function ($this) {
			var $styledList = $this.find(this.$styledList);
			if ( $styledList.is(':animated') ) {
				return;
			}
			if ( this.optionAnimationType == 'fade' ) {
				$styledList.fadeOut(this.optionAnimationDuration);
			} else {
				$styledList.slideUp(this.optionAnimationDuration);
			}
		}
	};


	$.fn.styleSelect = function(options){
        return this.each(function(){
            new StyleSelect($(this), options);
        });
    };
})(jQuery);




