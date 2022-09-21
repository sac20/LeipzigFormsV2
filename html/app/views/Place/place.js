function loadPlace(label) {
    document.getElementById("placename").innerText = label
    const place_query = `
      SELECT  ?district ?community
      WHERE {
        ?place rdf:type hp:Place.
        ?place rdfs:label "${label}".
      ?place hp:district ?district.
      ?place hp:community ?community.
      }
      limit 1
    `;

    sparql_connection.query(place_query).done((res) => {
      const row = res.results.bindings[0];
      for (const key of Object.keys(row)) {
        const element = document.getElementById(key);
        if (element) {
          element.innerText = "- " + key + ": " + row[key].value
        }
      }
    });

    const school_query = `
      SELECT  ?nameSchool
      WHERE {
        ?school rdf:type hp:School.
        ?school hp:place ?place.
      ?place rdfs:label "${label}".
        ?school rdfs:label ?nameSchool.
      }
      limit 100
    `;

    sparql_connection.query(school_query).done((res) => {
      const rows = res.results.bindings;
      html = ""
      for (const row of rows) {
        html += `<li><a href='#' onClick="change('school', '${row.nameSchool.value}', '${label}')">`;
        html += row.nameSchool.value;
        html += "</a></li>"
      }
      const element = document.getElementById("schoolist");
      element.innerHTML = html;
    });

    const position_query = `
    SELECT  ?namePosition
    WHERE {
      ?position rdf:type hp:Position.
      ?position hp:place ?place.
          ?place rdfs:label "${label}".
      ?position rdfs:label ?namePosition.
    }
      limit 15
    `;


    sparql_connection.query(position_query).done((res) => {
      const rows = res.results.bindings;
      html = ""
      for (const row of rows) {
        html += `<li><a href='#' onClick="change('position', '${row.namePosition.value}', '${label}')">`;
        html += row.namePosition.value;
        html += "</a></li>";
      }
      const element = document.getElementById("religionlist");
      element.innerHTML = html;
    });

  }