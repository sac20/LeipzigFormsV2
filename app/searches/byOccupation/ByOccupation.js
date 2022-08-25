function searchByOccupation() {
    const occupation = document.getElementById('occupation').value;
    const workplace = document.getElementById('workplace').value;
    const startdatejob = document.getElementById('startdatejob').value;
    const retirementdatejob = document.getElementById('retirementdatejob').value;
    var query_string = `
    SELECT DISTINCT ?label
    WHERE {
        ?event rdf:subject ?person.
        ?event rdf:predicate hp:hasPosition.
        ?person rdfs:label ?label.
        OPTIONAL {
          ?event hp:start ?dateOfOrdination.
          BIND(str(?dateOfOrdination) AS ?stringDateOfOrdination).
        }
        OPTIONAL {
          ?event hp:end ?dateOfRetirement.
          BIND(str(?dateOfRetirement) AS ?stringDateOfRetirement).
        }
        OPTIONAL {
          ?person hp:hasPosition ?position.
          ?position hp:positionDesignation ?positionDesignation.
          ?position hp:place ?positionPlace.
          ?positionPlace hp:nameOfPlace ?nameOfPositionPlace.
        }
        FILTER regex(COALESCE(?positionDesignation, ""), "${occupation}", "i").
        FILTER regex(COALESCE(?nameOfPositionPlace, ""), "${workplace}","i").
        FILTER regex(COALESCE(?stringDateOfOrdination, ""), "${startdatejob}","i").
        FILTER regex(COALESCE(?stringDateOfRetirement, ""), "${retirementdatejob}","i").
      }
      Limit 100`;

    sparql_connection.query(query_string).done(onSuccess);
    return false;
  }