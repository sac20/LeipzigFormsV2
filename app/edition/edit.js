function loadEditForm(label) {
  const profile_query = `
    SELECT ?person ?firstName ?lastName ?birthDate ?deathDate ?birthPlaceName ?deathPlaceName
    WHERE {
      ?person rdfs:label '${label}'.
      ?person foaf:firstName ?firstName.
      ?person foaf:lastName ?lastName.
      OPTIONAL{
        ?person hp:birthDate ?birthDate.
      }
      OPTIONAL{
        ?person hp:dateOfDeath ?deathDate.
      }'
      OPTIONAL{
        ?person hp:birthPlace ?birthPlace.
        ?birthPlace rdfs:label ?birthPlaceName.
      }
      OPTIONAL {
        ?person hp:placeOfDeath ?placeOfDeath.
        ?placeOfDeath rdfs:label ?deathPlaceName.
      }
    }
    Limit 1
    `;

  sparql_connection.query(profile_query).done((res) => {
    const row = res.results.bindings[0];
    for (const key of Object.keys(row)) {
      const element = document.getElementById(key);
      if (key === 'person') {
        uri = '<' + row[key].value + '>';
      }
      if (element) {
        if (key === 'birthDate' || key === 'deathDate') {
          row[key].value = row[key].value.substring(0, 10);
        }
        element.value = row[key].value
      }
    }
  })

  const school_query = `        
      SELECT distinct ?event ?start ?end ?label ?nameOfPlace  ?object
      WHERE {
        ?event a hp:Event.
        ?event rdf:subject ?person.
        ?person rdfs:label "${label}".
        OPTIONAL {
            ?event hp:start ?start.
          }
        OPTIONAL {
          ?event hp:end ?end.
        }
        ?event rdf:predicate hp:attendedSchool.
        ?event rdf:object ?object.
        ?object rdfs:label ?label.
        ?object hp:place ?place.
        ?place hp:nameOfPlace ?nameOfPlace.
      }
      Limit 100
      `;

  sparql_connection.query(school_query).done((res) => {
    const rows = res.results.bindings;
    html = ""
    for (const row of rows) {
      if (row.start) {
        html += `
          <labelclass="form-label">Start</label>
          <input title="${'<' + row.event.value + '> hp:start'}" class="form-control autocomplete" name="start" value ='${row.start.value}'/>`
      }
      if (row.end) {
        html += `
          <label class="form-label">End</label>
          <input title="${'<' + row.event.value + '> hp:end'}" class="form-control autocomplete" name="end" value ='${row.end.value}'/>`
      }
      html += `
          <label class="form-label">Label</label>
          <input title="${'<' + row.event.value + '> rdfs:label'}"class="form-control autocomplete" name="label" value ='${row.label.value}'/>`
      html += `<br>`
    }
    const element = document.getElementById("educationalLife");
    element.innerHTML = html;
  });

  const job_query = `        
      SELECT distinct ?event ?start ?end ?label ?nameOfPlace  ?object
      WHERE {
        ?event a hp:Event.
        ?event rdf:subject ?person.
        ?person rdfs:label "${label}".
        OPTIONAL {
            ?event hp:start ?start.
          }
        OPTIONAL {
          ?event hp:end ?end.
        }
        ?event rdf:predicate hp:hasPosition.
        ?event rdf:object ?object.
        ?object rdfs:label ?label.
        ?object hp:place ?place.
        ?place hp:nameOfPlace ?nameOfPlace.
      }
      Limit 100
      `;

  sparql_connection.query(job_query).done((res) => {
    const rows = res.results.bindings;
    html = ""
    for (const row of rows) {
      if (row.start) {
        html += `
          <labelclass="form-label">Start</label>
          <input title="${'<' + row.event.value + '> hp:start'}" class="form-control autocomplete" name="start" value ='${row.start.value}'/>`
      }
      if (row.end) {
        html += `
          <label class="form-label">End</label>
          <input title="${'<' + row.event.value + '> hp:end'}" class="form-control autocomplete" name="end" value ='${row.end.value}'/>`
      }
      html += `
          <label class="form-label">Label</label>
          <input title="${'<' + row.event.value + '> rdfs:label'}"class="form-control autocomplete" name="label" value ='${row.label.value}'/>`
      html += `<br>`
    }

    const element = document.getElementById("priestlyLife");
    element.innerHTML = html;

  });
  return false;
}

let uri;
// funcion que se encarga de editar la informacion de un sacerdote
function edit() {
  const firstname = document.getElementById('firstName').value;
  const lastname = document.getElementById('lastName').value;
  const birthdate = document.getElementById('birthDate').value;
  const birthplace = document.getElementById('birthPlaceName').value;
  const deathplace = document.getElementById('deathPlaceName').value;
  const dateofdeath = document.getElementById('deathDate').value;

  sparql_connection.query(buildBirthPlaceQuery('newBirthPlace', birthplace)).done((res) => {
    const uriBirthPlace = '<' + res.results.bindings[0].newBirthPlace.value + '>';

    sparql_connection.query(buildBirthPlaceQuery('newDeathPlace', deathplace)).done((res) => {
      const uriDeathPlace = res.results.bindings.length === 0 ? "" : '<' + res.results.bindings[0].newDeathPlace.value + '>';
      var query_string = `
            DELETE {
              ${uri} foaf:firstName ?oldFirstName.
              ${uri} foaf:lastName ?oldLastName.
              ${uri} hp:birthDate ?oldBirthDate.
              ${uri} hp:dateOfDeath ?oldDeathDate.
              ${uri} hp:birthPlace ?oldBirthPlace.
              ${uri} hp:placeOfDeath ?oldDeathPlace.
            }
            INSERT {
              ${uri} foaf:firstName "${firstname}".
              ${uri} foaf:lastName "${lastname}".
              ${uri} hp:birthDate "${birthdate}".
              ${uri} hp:dateOfDeath "${dateofdeath}".
              ${uri} hp:birthPlace ${uriBirthPlace}.
              ${uri} hp:placeOfDeath ${uriDeathPlace}.
            }
            where {
              ${uri} foaf:firstName ?oldFirstName.
              ${uri} foaf:lastName ?oldLastName.
              ${uri} hp:birthDate ?oldBirthDate.
              ${uri} hp:dateOfDeath ?oldDeathDate.
              ${uri} hp:birthPlace ?oldBirthPlace.
              OPTIONAL {
                ${uri} hp:placeOfDeath ?oldDeathPlace.
              }
            }
            `;
      sparql_connection.update(query_string).done(() => {
        alert("SUCCESS!")
      })
    })
  })

  const keys = ['start', 'end'];

  const COMMON_STRING = ''
  keys.forEach(key => {
    const elements = Array.from(document.getElementsByName(key));
    elements.forEach((element, index) => {
      COMMON_STRING += `${element.title} ?old${index} .\n`
    })
  })

  let query_life = `
         DELETE { 
          ${COMMON_STRING}
         }
         INSERT { 
         `;
  keys.forEach(key => {
    const elements = Array.from(document.getElementsByName(key));
    elements.forEach(element => {
      query_life += `${element.title} "${element.value}" .\n`
    })
  })
  query_life += `}
        WHERE {
          ${COMMON_STRING}
        }
      `

  sparql_connection.update(query_life).done(() => {
  })

  /// aca se actualiza el label
  const elements = Array.from(document.getElementsByName('label'))
  elements.forEach(element => {
    const fields = ['hp:Position', 'hp:School']
    fields.forEach(field => {
      var query_aux_place = `
            SELECT ?newObject
            where {
              ?newObject rdf:type ${field}.
              ?newObject rdfs:label "${element.value}".
            }
            `;

      sparql_connection.query(query_aux_place).done((res) => {
        if (res.results.bindings.length === 0) return;
        const uri = element.title.split(' ')[0];
        const newObject = res.results.bindings[0].newObject.value;
        var query_string = `
            DELETE {
              ${uri} rdf:object ?oldObject.
            }
            INSERT {
              ${uri} rdf:object <${newObject}>.
            }
            where {
              ${uri} rdf:object ?oldObject.
            }`


        sparql_connection.update(query_string).done(() => {

        })
      })
    })

  })

  alert("SUCCESS!")

  return false;
}