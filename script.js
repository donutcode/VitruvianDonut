(function() {
  jQuery(function($) {
    var a, add_number, calculate, create_result_container, delete_add_number, get_data_from, get_ratio_list, init, make_new_number, re_make_numbers, toggle_add_smart;
    init = function() {
      var a, x, _i, _len, _results;
      a = get_ratio_list();
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        x = a[_i];
        _results.push($("#formula").append('<option value="' + x.id + '">' + x.human + ' - ' + x.name + '</option>'));
      }
      return _results;
    };
    calculate = function(e) {
      var data, result;
      e.preventDefault();
      data = get_data_from("form", null);
      alert(data.base_number);
      return result = create_result_container();
    };
    add_number = function(e) {
      var n, pool;
      e.preventDefault();
      pool = $("#add li.additional");
      n = pool.length;
      if (n < 6) {
        pool.parent().append(make_new_number(n));
      }
      return toggle_add_smart();
    };
    make_new_number = function(n) {
      var s;
      s = '<li class="additional" data-num="' + n + '">';
      s += '	<label for="add-nb-' + n + '">Additional Number (' + n + ')</label>';
      s += '	<input type="text" name="add-nb-' + n + '" />';
      s += '	<a href="#" class="delete-nb">delete</a>';
      return s += '</li>';
    };
    delete_add_number = function(element, e) {
      e.preventDefault();
      element.parent().remove();
      re_make_numbers();
      return toggle_add_smart();
    };
    toggle_add_smart = function() {
      if ($("#add li.additional").length >= 5) {
        return $(".add-link").hide();
      } else {
        return $(".add-link").show();
      }
    };
    re_make_numbers = function() {
      var a;
      return $(".add-pool .additional").each(a = function(index) {
        $(this).attr('data-num', index);
        $(this).find('label').attr('for', 'add-nb-' + index).text('Additional Number (' + index + ')');
        return $(this).find('input').attr('name', 'add-nb-' + index);
      });
    };
    get_ratio_list = function() {
      return [
        {
          name: "Golden Rule",
          human: "1:1.618",
          sup: 1.618,
          inf: 0.618,
          id: "golden"
        }, {
          name: "Musical Fifth",
          human: "2:3",
          sup: 1.5,
          inf: 0.666,
          id: "mufifth"
        }, {
          name: "Musical Fourth",
          human: "3:4",
          sup: 1.333,
          inf: 0.75,
          id: "mufourth"
        }
      ];
    };
    create_result_container = function() {
      var n, result;
      n = $("#scales .result").length + 1;
      $("#scales").append('<div class="result" data-index="' + n + '" />');
      return result = $('#scales .result[data-index=' + n + ']');
    };
    get_data_from = function(from, index) {
      var data;
      if (from === "form") {
        return data = {
          base_number: $('#add input[name=base-nb]').val(),
          scale: $('#add select[name=formula] option:selected').val()
        };
      }
    };
    $("#add").submit(a = function(event) {
      return calculate(event);
    });
    $("#add .add-link a").click(a = function(event) {
      return add_number(event);
    });
    $(".delete-nb").live('click', a = function(event) {
      return delete_add_number($(this), event);
    });
    return init();
  });
}).call(this);
