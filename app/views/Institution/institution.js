function loadSchool(school) {

    const position_query = `
      
      SELECT  distinct  ?namePerson
      WHERE {
        ?person rdf:type foaf:Person.
        ?person hp:attendedSchool ?school.
        ?school hp:place ?place.
        ?person rdfs:label ?namePerson.
        ?school rdfs:label "${school}".
      }
      limit 20
    `;

    document.getElementById("titleSchool").innerText = `List of students of ${school}`

    sparql_connection.query(position_query).done((res) => {
      const rows = res.results.bindings;
      html = ""
      for (const row of rows) {
        html += `<li><a href='#' onClick="change('profile', '${row.namePerson.value}')">`;
        html += row.namePerson.value;
        html += "</a></li>";
      }
      const element = document.getElementById("institutionList");
      element.innerHTML = html;
    });

  }