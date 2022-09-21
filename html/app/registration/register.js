function register() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const birthdate = document.getElementById('birthdate').value;
    const birthplace = document.getElementById('birthplace').value;
    const deathplace = document.getElementById('deathplace').value;
    const dateofdeath = document.getElementById('deathdate').value;
    const radios = document.getElementsByName("gender");
    const gender = Array.from(radios).find(radio => radio.checked)?.id || "";
    const id = generateRandomId();

    sparql_connection.query(buildBirthPlaceQuery('newBirthPlace', birthplace)).done((res) => {
      const uriBirthPlace = '<' + res.results.bindings[0].newBirthPlace.value + '>';

      sparql_connection.query(buildBirthPlaceQuery('newDeathPlace', deathplace)).done((res) => {
        const uriDeathPlace = res.results.bindings.length === 0 ? "" : '<' + res.results.bindings[0].newDeathPlace.value + '>';
        var query_string = `
          INSERT{
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> rdf:type foaf:Person.
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> rdfs:label "${firstname} ${lastname}".
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> foaf:name "${firstname} ${lastname}".
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> foaf:firstName "${firstname}".
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> foaf:lastName "${lastname}".
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> foaf:gender "${gender}".
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> hp:birthDate "${birthdate}".
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> hp:dateOfDeath "${dateofdeath}".
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> hp:birthPlace ${uriBirthPlace}.
            <http://data.pcp-on-web.de/pfarrerbuch/sachsen/person/${id}> hp:placeOfDeath ${uriDeathPlace}.
          }
          WHERE {

          }
        `;

        sparql_connection.update(query_string).done(() => {
        })
      })
    })
    alert("SUCCESS!")
    return false;
  }