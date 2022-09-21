function loadEditForm(uri) {
  profile_query = 'sparql';

  profile_query = document.getElementById('form-sparql').innerHTML;

  profile_query = profile_query.replaceAll('?uri', '<' + uri + '>');
  profile_query = profile_query.replaceAll('<!--', '');
  profile_query = profile_query.replaceAll('-->', '');
  profile_query = profile_query.replaceAll('></http:>', '/>');
  alert(profile_query);
  $('#form-uri').val(uri);

  sparql_connection.query(profile_query).done((res) => {
    res.results.bindings.forEach(function (row) {
      for (const key of Object.keys(row)) {
        exist = false;
        $.each($("." + key), function () {
          if ($(this).val() == row[key].value) exist = true;
        });
        if (!exist) {
          element = $("." + key).last();
          if (element.val() == '') {
            element.val(row[key].value);
            element.attr('oldvalue', row[key].value);
          }
          else {
            element.after('<input id="' + element.attr('id') + '" class="' + element.attr('class') + '" update="' + element.attr('update') + '"  value="' + row[key].value + '" oldvalue="' + row[key].value + '"/>');
          }
        }
      }
    })

    setTimeout(
      function () {

        getPlaces()
        $.each($("input[oldvalue]"), function () {
          $(this).change(function () {
            $(this).attr('value', $(this).val())
          });
        });

        document.getElementsByName('info').forEach(element => {
          uri = document.getElementById(element.attributes['uriElement'].nodeValue).value;
          prefix = profile_query.substr(0, profile_query.indexOf('SELECT') - 1);
            query = element.attributes['load'].nodeValue
            query = query.replaceAll('?uri', '<'+uri+'>');
            console.log(query)
            sparql_connection.query(prefix + query).done((res) => {
              if (res.results.bindings.length > 0) {
                element.value = res.results.bindings[0].value.value
              }
            })

          element.onchange = () => {
            prefix = profile_query.substr(0, profile_query.indexOf('SELECT') - 1);
            query = element.attributes['query'].nodeValue
            query = query.replaceAll('!value', element.value);
            sparql_connection.query(prefix + query).done((res) => {
              if (res.results.bindings.length > 0) {
                document.getElementById(element.attributes['uriElement'].nodeValue).value = res.results.bindings[0].uri.value
              } else {
                document.getElementById(element.attributes['uriElement'].nodeValue).value = ''
              }
            })
          }

        })



      }, 1000);
  })
}
function edit() {
  uri = $('#form-uri').val();
  prefix = document.getElementById('form-sparql').innerHTML;


  prefix = prefix.replaceAll('<!--', '');
  prefix = prefix.replaceAll('-->', '');
  prefix = prefix.replaceAll('></http:>', '/>');
  prefix = prefix.substr(0, prefix.indexOf('SELECT') - 1);
  prefix = prefix + ' ';
  $('#form-uri').val(uri);
  $.each($("input[update][oldvalue]"), function () {

    if ($(this).attr('oldvalue') !== $(this).val()) {
      update = $(this).attr('update').replaceAll('?uri', '<' + uri + '>');
      delete_query = update.replaceAll('!value', '"' + $(this).attr('oldvalue') + '"').replaceAll('?value', '<' + $(this).attr('oldvalue') + '>');
      delete_query = 'DELETE DATA {' + delete_query + '} ';
      insert_query = update.replaceAll('!value', '"' + $(this).val() + '"').replaceAll('?value', '<' + $(this).val() + '>');
      insert_query = 'INSERT DATA {' + insert_query + '} ';
      alert(prefix + delete_query + insert_query);
      sparql_connection.update(prefix + delete_query);
      if ($(this).val() !== '') {
        sparql_connection.update(prefix + insert_query);
      }
    }

  });
}
