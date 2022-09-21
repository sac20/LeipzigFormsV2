function searchByPersonalData() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const birthdate = document.getElementById('birthdate').value;
    const birthplace = document.getElementById('birthplace').value;
    const deathplace = document.getElementById('deathplace').value;
    const dateofdeath = document.getElementById('deathdate').value;
    const radios = document.getElementsByName("gender");
    const gender = Array.from(radios).find(radio => radio.checked)?.id || "";
    var query_string = `
      SELECT distinct ?label ?person
      WHERE {
        ?person a foaf:Person.
        ?person rdfs:label ?label.
        ?person foaf:firstName ?firstname.
        ?person foaf:lastName ?lastname.
        OPTIONAL{
          ?person foaf:gender ?gender.
        }
        OPTIONAL {
          ?person hp:birthDate ?birthdate.
          BIND(str(?birthdate) AS ?stringbirthdate).
        }
        OPTIONAL {
          ?person hp:dateOfDeath ?deathdate.
          BIND(str(?deathdate) AS ?stringdeathdate).
        }
        OPTIONAL {
          ?person hp:birthPlace ?birthPlace.
          ?birthPlace hp:nameOfPlace ?nameBirthPlace.
        }
        OPTIONAL {
          ?person hp:placeOfDeath ?deathPlace.
          ?deathPlace hp:nameOfPlace ?nameDeathPlace.
        }
        FILTER regex(COALESCE(?nameBirthPlace, ""), "${birthplace}", "i").
        FILTER regex(COALESCE(?nameDeathPlace, ""), "${deathplace}", "i").
        FILTER regex(COALESCE(?firstname, ""), "${firstname}", "i").
        FILTER regex(COALESCE(?lastname, ""), "${lastname}", "i").
        FILTER regex(COALESCE(?stringbirthdate, ""), "${birthdate}", "i").
        FILTER regex(COALESCE(?stringdeathdate, ""), "${dateofdeath}", "i").
        FILTER regex(COALESCE(?gender, ""), "${gender}", "i").
      }
      Limit 100`;

    sparql_connection.query(query_string).done(onSuccess);
    return false;
  }