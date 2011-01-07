/*
 * EasyForm by Routy Development
 * http://blog.routydevelopment.com
 *
 * Copyright (c) 2011 Nick Routsong
 * Dual licensed under the MIT and GPL licenses.
 *
 * Date: January 5, 2011
 * Version: 1.0
 */

(function($){
 	
	/**
	 * Set it up as an object under the jQuery namespace
	 */
	$.easyform = {};
	
	/**
	 * Set up global options that the user can over-ride
	 */
	$.easyform.options = {
		form_title: 'Untitled Form', // Default Form Title
		form_description: 'This is my new easy form, word.', // Default form Description
		form_preview_id: 'ef_previewWrapper',
		form_preview_list_id: 'ef_elementList',
		form_settings_id: 'ef_settingsWrapper'
	};
	
	$.easyform.setOptions = function(params){
		try {
			return EasyForm.setOptions(params || {});
		} catch(e) {
			var err = 'EasyForm Error: ' + e;
			(typeof(console) != 'undefined' && console.error) ? 
				console.error(err, params) : 
				alert(err);
		}
	},
	
	/**
	 * Add a new form element to the form
	 * @see EasyForm#addFormElement();
	 */
	$.easyform.addFormElement = function(params){
		try {
			return EasyForm.addFormElement(params || {});
		} catch(e) {
		
			var err = 'EasyForm Error: ' + e;
			(typeof(console) != 'undefined' && console.error) ? 
				console.error(err, params) : 
				alert(err);
				
		}
	};
	
	/**
	 * Remove a form element from the form
	 * @see EasyForm#removeFormElement();
	 */
	$.easyform.removeFormElement = function(id, params){
		try {
			return EasyForm.removeFormElement(id);
		} catch(e) {
		
			var err = 'EasyForm Error: ' + e;
			(typeof(console) != 'undefined' && console.error) ? 
				console.error(err, params) : 
				alert(err);
				
		}
	};
	
	/**
	 * Get current form object
	 * @see EasyForm#getFormObject();
	 */
	$.easyform.getFormObject = function(params){
		try {
			return EasyForm.getFormObject(params || {});
		} catch(e) {
		
			var err = 'EasyForm Error: ' + e;
			(typeof(console) != 'undefined' && console.error) ? 
				console.error(err, params) : 
				alert(err);
				
		}
	};
	
	/**
	 * EasyForm Object
	 * @constructor 
	 */
	var EasyForm = {
	    
		_item_count: 1,
		_form_elements: new Object(),
		_form_elements_json: '',
	    _settings_initiated: new Object(),
	    
		/**
		 * 
		 * Checkbox Settings and Functions
		 * 
		 */ 
		_checkboxElement: {
			addElement: function(params){
				
				var element = {
				    title: 'Select a Choice',
				    instructions: '',
				    element_id: EasyForm._item_count,
				    options: {
						1: {title: 'First Choice', checked: true},
						2: {title: 'Second Choice', checked: false},
						3: {title: 'Third Choice', checked: false}
					}
				};
				
				$.extend(element,params);
				
				EasyForm.setFormElement(element);
					
				return element;
				
			},
			saveElement: function(element){
				
				return setFormElement(element);
				
			},
			buildPreviewHtml: function(element){
				
				var previewHtml = "<span><label class='ef_previewElementLabel'>"+element.title+"</label>";

				$.each(element.options,function(){
					previewHtml = previewHtml + "<span><input id='preview_element_"+element.element_id+"' name='preview_element_"+element.element_id+"' type='checkbox' "+((this.checked == true) ? "checked='checked'" : "")+" disabled='disabled' readonly='readonly' />"
									   		  + "<label class='ef_previewCheckboxLabel'>"+this.title+"</label></span>"; 
				});
				
				previewHtml = previewHtml + "</span>";

				return previewHtml;
				
			},
			buildSettingsHtml: function(element){
				
				var settingsHtml = "<div class='ef_left ef_options ef_roundAll'>"
								 + "<span class='ef_optionsTitle ef_roundTop'>Choices (?)</span>";

			    $.each(element.options, function(key,value){
			    	settingsHtml = settingsHtml + "<span id='wrapper_"+key+"' class='ef_option'><input type='checkbox' name='checkbox_"+element.element_id+"' value='' "+((value.checked == true) ? "checked='checked'" : "")+" />"
			        			+ "<input class='ef_roundAll' type='text' name='options' value='"+value.title+"'/>"
			        			+ "<span class='ss_sprite ss_add'></span>" 
			        			+ "<span class='ss_sprite ss_delete'></span>"
			        			+ "</span>";
			    });
			    
			    settingsHtml = settingsHtml + "</div>";
			    
			    return settingsHtml;
			},
			buildOptionHtml: function(element){
				
				return "<span id='wrapper_"+$.getRandomNumber()+"' class='ef_option'><input type='checkbox' name='checkbox_"+element.element_id+"' />"
			    	+ "<input class='ef_roundAll' type='text' name='options' value=''/>"
			    	+ "<span class='ss_sprite ss_add'></span>"
			    	+ "<span class='ss_sprite ss_delete'></span>"
			    	+ "</span>";
			},
			processSettings: function(params) {
				options = new Object();
				delete params.options;
				fieldOrder = 1;
				$("#ef_fieldSettings_"+params.element_id+" div.ef_options span.ef_option").each(function(){
					options[fieldOrder] = {
						"title": $(this).find('input[type="text"]').val(),
						"checked": (($(this).find('input[type="checkbox"]:checked').length > 0) ? true : false), 
						"position": fieldOrder
					};
					fieldOrder++;
				});

				params.options = options;
				
				return params;
			}
		},
		
		// Radio Settings
		_radioElement: {
			addElement: function(params){
			
				var element = {
				    title: 'Select a Choice',
				    instructions: '',
				    element_id: EasyForm._item_count,
				    options: {
						1: {title: 'First Choice', checked: true},
						2: {title: 'Second Choice', checked: false},
						3: {title: 'Third Choice', checked: false}
					}
				};
				
				$.extend(element,params);
				
				EasyForm.setFormElement(element);
					
				return element;
				
			},
			saveElement: function(element){
				
				return setFormElement(element);
				
			},
			buildPreviewHtml: function(element){
				
				var previewHtml = "<span><label class='ef_previewElementLabel'>"+element.title+"</label>";
	
				$.each(element.options,function(){
					previewHtml = previewHtml + "<span><input id='preview_element_"+element.element_id+"' name='preview_element_"+element.element_id+"' type='radio' "+((this.checked == true) ? "checked='checked'" : "")+" disabled='disabled' readonly='readonly' />"
									   		  + "<label class='ef_previewRadioLabel'>"+this.title+"</label></span>"; 
				});
				
				previewHtml = previewHtml + "</span>";
	
				return previewHtml;
				
			},
			buildSettingsHtml: function(element){
				
				var settingsHtml = "<div class='ef_left ef_options ef_roundAll'>"
								 + "<span class='ef_optionsTitle ef_roundTop'>Choices (?)</span>";
	
			    $.each(element.options, function(key,value){
			    	settingsHtml = settingsHtml + "<span id='wrapper_"+key+"' class='ef_option'><input type='radio' name='radio_"+element.element_id+"' value='' "+((value.checked == true) ? "checked='checked'" : "")+" />"
			        			+ "<input class='ef_roundAll' type='text' name='options' value='"+value.title+"'/>"
			        			+ "<span class='ss_sprite ss_add'></span>" 
			        			+ "<span class='ss_sprite ss_delete'></span>"
			        			+ "</span>";
			    });
			    
			    settingsHtml = settingsHtml + "</div>";
			    
			    return settingsHtml;
			},
			buildOptionHtml: function(element){
				
				return "<span id='wrapper_"+$.getRandomNumber()+"' class='ef_option'><input type='radio' name='radio_"+element.element_id+"' />"
			    	+ "<input class='ef_roundAll' type='text' name='options' value=''/>"
			    	+ "<span class='ss_sprite ss_add'></span>"
			    	+ "<span class='ss_sprite ss_delete'></span>"
			    	+ "</span>";
			},
			processSettings: function(params) {
				options = new Object();
				delete params.options;
				fieldOrder = 1;
				$("#ef_fieldSettings_"+params.element_id+" div.ef_options span.ef_option").each(function(){
					options[fieldOrder] = {
						"title": $(this).find('input[type="text"]').val(),
						"checked": (($(this).find('input[type="radio"]:checked').length > 0) ? true : false), 
						"position": fieldOrder
					};
					fieldOrder++;
				});
	
				params.options = options;
				
				return params;
			}
		},
		// Select Settings
		_selectElement: {
			addElement: function(params){
			
				var element = {
				    title: 'Select a Choice',
				    instructions: '',
				    element_id: EasyForm._item_count,
				    options: {
						1: {title: 'First Choice', selected: true},
						2: {title: 'Second Choice', selected: false},
						3: {title: 'Third Choice', selected: false}
					}
				};
				
				$.extend(element,params);
				
				EasyForm.setFormElement(element);
					
				return element;
				
			},
			saveElement: function(element){
				
				return setFormElement(element);
				
			},
			buildPreviewHtml: function(element){
				
				var previewHtml = "<span><label class='ef_previewElementLabel'>"+element.title+"</label>"
								+ "<select class='ef_element' id='select_"+element.element_id+"' name='field_"+element.element_id+"' disabled='disabled' readonly='readonly'>";
	
				$.each(element.options,function(){
					previewHtml = previewHtml + "<option value='' "+((this.selected == true) ? "selected='selected'" : "") + ">"+this.title+"</option>"; 
				});
				
				previewHtml = previewHtml + "</select></span>";
	
				return previewHtml;
				
			},
			buildSettingsHtml: function(element){
				
				var settingsHtml = "<div class='ef_left ef_options ef_roundAll'>"
								 + "<span class='ef_optionsTitle ef_roundTop'>Choices (?)</span>";
	
			    $.each(element.options, function(key,value){
			    	settingsHtml = settingsHtml + "<span id='wrapper_"+key+"' class='ef_option'><input type='radio' name='select_"+element.element_id+"' value='' "+((value.selected == true) ? "checked='checked'" : "")+" />"
			        			+ "<input class='ef_roundAll' type='text' name='options' value='"+value.title+"'/>"
			        			+ "<span class='ss_sprite ss_add'></span>" 
			        			+ "<span class='ss_sprite ss_delete'></span>"
			        			+ "</span>";
			    });
			    
			    settingsHtml = settingsHtml + "</div>";
			    
			    return settingsHtml;
			},
			buildOptionHtml: function(element){
				
				return "<span id='wrapper_"+$.getRandomNumber()+"' class='ef_option'><input type='radio' name='select_"+element.element_id+"' />"
			    	+ "<input class='ef_roundAll' type='text' name='options' value=''/>"
			    	+ "<span class='ss_sprite ss_add'></span>"
			    	+ "<span class='ss_sprite ss_delete'></span>"
			    	+ "</span>";
			},
			processSettings: function(params) {
				options = new Object();
				delete params.options;
				fieldOrder = 1;
				$("#ef_fieldSettings_"+params.element_id+" div.ef_options span.ef_option").each(function(){
					options[fieldOrder] = {
						"title": $(this).find('input[type="text"]').val(),
						"selected": (($(this).find('input[type="radio"]:checked').length > 0) ? true : false), 
						"position": fieldOrder
					};
					fieldOrder++;
				});
	
				params.options = options;
				
				return params;
			}
		},
		/**
		 * 
		 * Textarea Element
		 * 
		 */
		_textareaElement: {
			addElement: function(params){
			
				var element = {
				    title: 'Untitled',
				    instructions: '',
				    element_id: EasyForm._item_count
				};
				
				$.extend(element,params);
				
				EasyForm.setFormElement(element);
					
				return element;
				
			},
			saveElement: function(element){
				
				return setFormElement(element);
				
			},
			buildPreviewHtml: function(element){
				
				return "<span'><label class='ef_previewElementLabel'>"+element.title+"</label><textarea class='ef_element' id='textarea_"+element.element_id+"' name='textarea_"+element.element_id+"' disabled='disabled' readonly='readonly'></textarea></span>";
	
			},
			buildSettingsHtml: function(element){
				return "";
			},
			processSettings: function(params) {
				return params;
			}	
		},
		/**
		 * 
		 * Text Element
		 * 
		 */
		_textElement: {
			addElement: function(params){
			
				var element = {
				    title: 'Untitled',
				    instructions: '',
				    element_id: EasyForm._item_count
				};
				
				$.extend(element,params);
				
				EasyForm.setFormElement(element);
					
				return element;
				
			},
			saveElement: function(element){
				
				return setFormElement(element);
				
			},
			buildPreviewHtml: function(element){
				
				return "<span'><label class='ef_previewElementLabel'>"+element.title+"</label><input class='ef_element' id='text_"+element.element_id+"' name='text_"+element.element_id+"' type='text' disabled='disabled' readonly='readonly' /></span>";
	
			},
			buildSettingsHtml: function(element){
				return "";
			},
			processSettings: function(params) {
				return params;
			}
			
		},
		/**
		 * 
		 * Number Element
		 * 
		 */
		_numberElement: {
			addElement: function(params){
			
				var element = {
				    title: 'Untitled',
				    instructions: '',
				    element_id: EasyForm._item_count
				};
				
				$.extend(element,params);
				
				EasyForm.setFormElement(element);
					
				return element;
				
			},
			saveElement: function(element){
				
				return setFormElement(element);
				
			},
			buildPreviewHtml: function(element){
				
				return "<span'><label class='ef_previewElementLabel'>"+element.title+"</label><input class='ef_element' id='number_"+element.element_id+"' name='number_"+element.element_id+"' type='text' disabled='disabled' readonly='readonly' /></span>";
	
			},
			buildSettingsHtml: function(element){
				return "";
			},
			processSettings: function(params) {
				return params;
			}
			
		},

		/**
		 * Add a form element to the form
		 * @param {Object} params The object that contains all the options for creating the element
		 * @return {Object} The newly added form element
		 */
		addFormElement: function(params){
	        
			// We might have some issues if we don't have the form element type!
			if(!params.type){
				throw 'You must specify what type of form element you would like to add!'; 
			}
			
			var elementParams = {
				setPreviewHtml: true	
			};
			
			$.extend(elementParams,params);
			
			var setPreviewHtml = elementParams.setPreviewHtml;
			delete elementParams.setPreviewHtml;	
			
			type = params.type;
			
			var element = this['_'+type+'Element'].addElement(elementParams);
			
			// Assign callbacks
			$(['onPreviewClick','onDelete']).each(function(i, val){
				EasyForm['_' + val + '_' + element.element_id] = ($.isFunction(params[val])) ? params[val] : function(){}
			});
			
			if(setPreviewHtml == true){
				EasyForm.addPreviewHtml(element);
			}
			
			this._item_count++;
			
			return element;
	    
		},
		
		/**
		 * Remove a form element from the form
		 * @param {String} Id of the element to be removed
		 * @return {Boolean} Result of deletion
		 */
		removeFormElement: function(id){
	        
			var element_id = id.replace(/element_/i,'');
			
			EasyForm['_onDelete_' + element_id]();
			
			if(!id){
				throw 'You must specify what element you want to remove!'; 
			}
			
			//Remove the element from the preview, delete from object, clear field settings
			$("#" + id).remove();
			delete EasyForm[id];
			$("#ef_fieldSettings").remove();
			
			return true;
	    
		},
		
		setFormElement: function(element)
		{
			EasyForm._form_elements['element_' + element.element_id] = element;
			
			return true;
		},
		
		getFormElement: function(element_id)
		{
			return EasyForm._form_elements[element_id];
		},
		
		getFormElements: function()
		{
			return EasyForm._form_elements;
		},
		
		getFormObject: function(params)
		{
			var settings = {
				format: 'JSON'
			};
			
			$.extend(settings,params);
			
			if(settings.format.toUpperCase() == 'JSON'){
			
				var formObject = {'elements': EasyForm._form_elements};
				$.extend(formObject,$.easyform.options);
				
				return JSON.stringify(formObject);
				
			} else {
				
				throw 'Invalid object format, currently only JSON is available.';
				
			}
		},
		
		setOptions: function(params)
		{
			var options = $.easyform.options;
			$.extend(options,params);
			$.easyform.options = options;
			
			return true;
		},
		
		updatePreviewHtml: function(element)
		{
			if($('#element_'+element.element_id+' .ef_elementContent').length == 1){
				$('#element_'+element.element_id+' .ef_elementContent').html(this['_'+element.type+'Element'].buildPreviewHtml(element));
			} else {
				throw 'An existing elements preview html was not found...';
			}
		},
		
		addPreviewHtml: function(element)
		{
			var listExists = ($('#' + $.easyform.options.form_preview_list_id).length > 0 ? true : false);
			
			var html  = "<li id='element_"+element.element_id+"' class='ef_fieldWrapper'><div><div class='ef_elementContent'>";
			
			html = html + this['_'+element.type+'Element'].buildPreviewHtml(element);
			
			html = html + "</div><span class='ef_elementActionWrapper'>"
			            + "<span class='handle ss_sprite ss_shape_handles' title='Move Form Element'></span>"
			        	+ "<span class='ss_sprite ss_delete removeElement' title='Delete Form Element'></span>"
			        	+ "</span>";

			html = html + "</div></li>";
			
			if(!listExists){
				html = "<ul id='ef_elementList'>" + html + "</ul>";
				$('#' + $.easyform.options.form_preview_id).append(html);
			} else {
				$('#' + $.easyform.options.form_preview_list_id).append(html);
			}
			
			/**
			 * Attach sortable functionality to preview form elements
			 * 
			 */
			$('#' + $.easyform.options.form_preview_list_id).sortable({
				placeholder: "placeholder",
				handle: "span.handle",
				update: function(event, ui){
					var position_count = 1;
					$(this).children().each(function(){
						EasyForm._form_elements[this.id].position = position_count;
					    position_count++;
					});
				}
			});

			/**
			 * The following section is to be called once the preview element is clicked on,
			 * it will populate the settings html.
			 * 
			 */
			$("#element_"+element.element_id).bind('click',{'element': element}, function(event){
				
				EasyForm['_onPreviewClick_' + element.element_id](element);
				
				$(".ef_activeElement").removeClass("ef_activeElement");
				$(".ef_elementActionWrapper").css("visibility","hidden");
				
				$(this).addClass("ef_activeElement");
				$(this).find(".ef_elementActionWrapper").css("visibility","visible");
				
				EasyForm.addSettingsHtml(event.data.element);
				
			});
			
			return true;
			
		},
		
		addSettingsHtml: function(element)
		{
			var form_id = "ef_fieldSettings_"+element.element_id;
			
			html = "<form id='"+form_id+"' class='ef_fieldSettings'>";
			
			html = html + "<span><label>Field Label</label><input class='ef_roundAll' type='text' name='title' value='"+((element.title == undefined) ? "" : element.title)+"'/></span>"; 
			html = html + "<span><label>Instructions for User</label><textarea class='fs_instructions large round-all' name='instructions'>"+((element.instructions == undefined) ? "" : element.instructions)+"</textarea></span>";

			html = html + EasyForm['_'+element.type+'Element'].buildSettingsHtml(element);
			
			html = html + '<span class="ef_settingsButtons"><span class="ef_deleteElement negative button" title="Delete this field." id="listButtonsDelete"><span class="ss_sprite ss_delete"></span>Delete</span>'
		                + '<span class="ef_addElement positive button" title="Add another field."><span class="ss_sprite ss_textfield_add "></span> Add Field</span></span>';
		    
			html = html + "</form>";
			
			$('#' + $.easyform.options.form_settings_id).html(html);
			
			$("#"+form_id).unbind();
			$("#"+form_id).find('input, select, textarea').bind('keyup change',{'element': element}, function(event){
				EasyForm.updateElementFromSettings(event.data.element);
			});
			
			if(typeof(this._settings_initiated[element.element_id]) == 'undefined'){
			
				$("#"+form_id).find("input[type='radio']")
					.live("dblclick",{'element': element},function(event){
						$(this).attr('checked',false);
						EasyForm.updateElementFromSettings(event.data.element);
					}).end()
					.find(".ef_option .ss_add")
					.live("click",{'element': element},function(event){
						// Add Option
						var optionHtml = EasyForm['_'+element.type+'Element'].buildOptionHtml(event.data.element);
						$(this).parents('.ef_option').after(optionHtml);
						EasyForm.updateElementFromSettings(event.data.element);
						$("#"+form_id).unbind();
						$("#"+form_id).find('input, select, textarea').bind('keyup change',{'element': event.data.element}, function(event){
							EasyForm.updateElementFromSettings(event.data.element);
						});
					}).end()
					.find(".ef_option .ss_delete")
					.live("click",{'element': element},function(event){
						// Remove Option
						$(this).parents('.ef_option').remove();
						EasyForm.updateElementFromSettings(event.data.element);
					}).end();
				
				this._settings_initiated[element.element_id] = true;
			}
		},
		
		updateElementFromSettings: function(element)
		{
			var fieldSettings = $('#ef_fieldSettings_'+element.element_id).serializeObject();
			$.extend(element,fieldSettings);
			var processSettings = this['_'+element.type+'Element'].processSettings(element);
			$.extend(element,processSettings);

			EasyForm.setFormElement(element);
			EasyForm.updatePreviewHtml(element);
				
		}
		
	};
	
	$.displayMessage = function(params){
		var settings = {
			message: 'Didn\'t pass any message, foo!',
			className: 'notice',	
			location: 'body',
			timer: 0
		};
		$.extend(settings,params);
		
		var message_id = "ef_message_"+$.getRandomNumber();
		var message = "<span id='"+message_id+"'>"+settings.message+"</span>";
		
		$(settings.location).prepend(message);
		$('#'+message_id).addClass(settings.className);
		
		if(typeof(settings.timer) == 'number' && settings.timer > 0){
			$('#'+message_id).delay(settings.timer).fadeOut();
		}
	};
	
	$.getRandomNumber = function(max)
	{
		return Math.floor(Math.random()*((max == undefined || max == null) ? 10000 : max));
	};
	
	$.fn.serializeObject = function()
	{
	   var o = {};
	   var a = this.serializeArray();
	   $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {
	           o[this.name] = this.value || '';
	       }
	   });
	   return o;
	};
	
})(jQuery);