function loadProfile(label) {
    const profile_query = `
    SELECT ?name ?gender ?firstName ?lastName ?birthDate ?deathDate ?comment ?birthPlaceName ?deathPlaceName ?fatherName ?motherName ?childName
    WHERE {
      ?person rdfs:label '${label}'.
      ?person foaf:name ?name.
      OPTIONAL {
        ?person foaf:gender ?gender.
      }
      ?person foaf:firstName ?firstName.
      ?person foaf:lastName ?lastName.
      OPTIONAL{
        ?person hp:birthDate ?birthDate.
      }
      OPTIONAL{
        ?person hp:dateOfDeath ?deathDate.
      }
      OPTIONAL{
        ?person rdfs:comment ?comment.
      }
      OPTIONAL{
        ?person hp:birthPlace ?birthPlace.
        ?birthPlace rdfs:label ?birthPlaceName.
      }
      OPTIONAL {
        ?person hp:placeOfDeath ?placeOfDeath.
        ?placeOfDeath rdfs:label ?deathPlaceName.
      }
      OPTIONAL {
        ?person hp:father ?father.
        ?father rdfs:label ?fatherName.
      }
      OPTIONAL{ 
        ?person hp:mother ?mother.
        ?mother rdfs:label ?motherName.
      }
      OPTIONAL {
        ?person hp:child ?child.
        ?child rdfs:label ?childName.
      }
    }
    Limit 1
    `;

    sparql_connection.query(profile_query).done((res) => {
      const row = res.results.bindings[0];
      for (const key of Object.keys(row)) {
        const element = document.getElementById(key);
        if (element) {
          if (key == 'fatherName' || key === 'motherName' || key == 'childName') {
            element.onclick = function () { change('profile', row[key].value); return false; };
          }
          if (key == 'birthPlaceName' || key === 'deathPlaceName') {
            element.onclick = function () { change('place', row[key].value); return false; };
          }
          element.innerText = row[key].value
        }
      }
    });

    const school_query = `        
      SELECT ?start ?end ?label ?nameOfPlace
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
        html += "<small>"
        if (row.start) html += "Start: " + row.start.value + " - "
        if (row.end) html += "End: " + row.end.value + " - "
        html += row.label.value + " - "
        html += row.nameOfPlace.value
        html += "</small><hr>"
      }
      const element = document.getElementById("educationalLife");
      element.innerHTML = html;

    });


    const job_query = `        
      SELECT ?start ?end ?label ?nameOfPlace
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
        html += "<small>"
        if (row.start) html += "Start: " + row.start.value + " - "
        if (row.end) html += "End: " + row.end.value + " - "
        html += row.label.value + " - "
        html += row.nameOfPlace.value
        html += "</small><hr>"
      }
      const element = document.getElementById("priestlyLife");
      element.innerHTML = html;

    });

    const button = document.getElementById('edit');
    button.onclick = () => {
      change('loadEditForm', label)
    }
  }