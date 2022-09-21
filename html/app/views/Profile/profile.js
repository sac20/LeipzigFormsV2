function loadProfile(uri) {
    const profile_query = `
    SELECT ?label ?name ?gender ?father ?mother ?child ?firstName ?lastName ?birthDate ?deathDate ?comment ?birthPlaceName ?deathPlaceName ?fatherName ?motherName ?childName
    WHERE {
      <${uri}> rdfs:label ?label.
      <${uri}> foaf:name ?name.
      OPTIONAL {
        <${uri}> foaf:gender ?gender.
      }
      <${uri}> foaf:firstName ?firstName.
      <${uri}> foaf:lastName ?lastName.
      OPTIONAL{
        <${uri}> hp:birthDate ?birthDate.
      }
      OPTIONAL{
        <${uri}> hp:dateOfDeath ?deathDate.
      }
      OPTIONAL{
        <${uri}> rdfs:comment ?comment.
      }
      OPTIONAL{
        <${uri}> hp:birthPlace ?birthPlace.
        ?birthPlace rdfs:label ?birthPlaceName.
      }
      OPTIONAL {
        <${uri}> hp:placeOfDeath ?placeOfDeath.
        ?placeOfDeath rdfs:label ?deathPlaceName.
      }
      OPTIONAL {
        <${uri}> hp:father ?father.
        ?father rdfs:label ?fatherName.
      }
      OPTIONAL{ 
        <${uri}> hp:mother ?mother.
        ?mother rdfs:label ?motherName.
      }
      OPTIONAL {
        <${uri}> hp:child ?child.
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
            if(key == 'fatherName')
              element.onclick = function () { change('profile', row['father'].value); return false; };
            if(key == 'motherName')
              element.onclick = function () { change('profile', row['mother'].value); return false; };
            if(key == 'childName')
              element.onclick = function () { change('profile', row['child'].value); return false; };
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
        <${uri}> hp:attendedSchool ?event.
        OPTIONAL {
            ?event hp:start ?start.
          }
        OPTIONAL {
          ?event hp:end ?end.
        }

        ?event rdfs:label ?label.
        ?event hp:place ?place.
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
      
        <${uri}> hp:hasPosition ?event.
        OPTIONAL {
            ?event hp:start ?start.
          }
        OPTIONAL {
          ?event hp:end ?end.
        }

        ?event rdfs:label ?label.
        ?event hp:place ?place.
        ?place hp:nameOfPlace ?nameOfPlace.
      }
      Limit 100
      `;
    console.log(job_query);  

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
      change('loadEditForm', uri)
    }
  }