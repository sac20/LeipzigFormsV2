function loadPosition(position, city) {

    const position_query = `
      SELECT  distinct  ?namePerson
      WHERE {
        ?person rdf:type foaf:Person.
        ?person hp:hasPosition ?position.
        ?position hp:place ?place.
        ?place rdfs:label "${city}".
        ?person rdfs:label ?namePerson.
        ?position rdfs:label "${position}".
      }
      limit 20
    `;

    document.getElementById("titleCity").innerText = `Priest at that Position in the city of ${city}`

    sparql_connection.query(position_query).done((res) => {
      const rows = res.results.bindings;
      html = ""
      for (const row of rows) {
        html += `<li><a href='#' onClick="change('profile', '${row.namePerson.value}')">`;
        html += row.namePerson.value;
        html += "</a></li>";
      }
      const element = document.getElementById("positionslist");
      element.innerHTML = html;
    });

  }