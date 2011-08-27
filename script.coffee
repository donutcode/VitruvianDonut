jQuery ($) ->
	init = ->
		a = get_ratio_list()
		$("#formula").append('<option value="'+x.id+'">'+x.human+' - '+x.name+'</option>') for x in a
	
	#magic happens
	calculate = (e) ->
		e.preventDefault()
		data = get_data_from("form",null)
		alert data.base_number
		result = create_result_container()
		
	
	#add a number to the form
	add_number = (e) ->
		e.preventDefault()
		pool = $("#add li.additional")
		n = pool.length
		if n < 6
			pool.parent().append(make_new_number(n))
		toggle_add_smart()
			
	
	#generate code for new number li
	make_new_number = (n) ->
		s = '<li class="additional" data-num="'+n+'">'
		s += '	<label for="add-nb-'+n+'">Additional Number ('+n+')</label>'
		s += '	<input type="text" name="add-nb-'+n+'" />'
		s += '	<a href="#" class="delete-nb">delete</a>'
		s += '</li>'
	
	#delete a row
	delete_add_number = (element, e) ->
		e.preventDefault()
		element.parent().remove()
		re_make_numbers()
		toggle_add_smart()
	
	#hides and shows the link to add more numbers
	toggle_add_smart = ->
		if $("#add li.additional").length >= 5
			$(".add-link").hide()
		else
			$(".add-link").show()
	
	#re-make numbers for add_number
	re_make_numbers = ->
		$(".add-pool .additional").each(a = (index)->
			$(@).attr('data-num',index)
			$(@).find('label').attr('for','add-nb-'+index).text('Additional Number ('+index+')')
			$(@).find('input').attr('name','add-nb-'+index)
		)
	
	#get the ratio list
	get_ratio_list = ->
		[
			{
				name : "Golden Rule",
				human : "1:1.618",
				sup : 1.618,
				inf : 0.618,
				id : "golden"
			},
			{
				name : "Musical Fifth",
				human : "2:3",
				sup : 1.5,
				inf : 0.666,
				id : "mufifth"
			},
			{
				name : "Musical Fourth",
				human : "3:4",
				sup : 1.333,
				inf : 0.75,
				id : "mufourth"
			},
		]
	
	#create the result div
	create_result_container = () ->
		n = $("#scales .result").length + 1
		$("#scales").append('<div class="result" data-index="'+n+'" />')
		result = $('#scales .result[data-index='+n+']')
	
	#gets the data from the form and sends them back as an aray
	get_data_from = (from, index) ->
		if from == "form"
			data = {
				base_number: $('#add input[name=base-nb]').val()
				scale: $('#add select[name=formula] option:selected').val()
			}
		
	
	
	#match events and functions
	$("#add").submit(a = (event) -> #submit on the form
		calculate(event)
	)
	
	$("#add .add-link a").click(a = (event) -> #click on the "add number" link
		add_number(event)
	)
	
	$(".delete-nb").live('click', a = (event) ->
		delete_add_number($(this), event)
	)
	
	
	#init
	init()