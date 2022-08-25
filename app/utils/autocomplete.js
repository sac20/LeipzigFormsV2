// las siguientes 3 funciones cargan la informacion para autocompletar en los forms.
function getPlaces() {
    sparql_connection.query(`
        SELECT DISTINCT ?nameOfPlace
            WHERE {
            ?subject hp:nameOfPlace ?nameOfPlace
        }`
    ).done((res) => {
      const source = res.results.bindings.map(element => element.nameOfPlace.value)
      $("#attendingplace")?.autocomplete({source});
      $("#birthplace")?.autocomplete({source});
      $("#deathplace")?.autocomplete({source});
      $("#workplace")?.autocomplete({source});
    });
  }

  function getSchools() {
    sparql_connection.query(`
        SELECT DISTINCT ?nameOfSchool
        WHERE {
            ?subject hp:nameOfSchool ?nameOfSchool
        }`
    ).done((res) => {
      $("#nameofschool")?.autocomplete({source: res.results.bindings.map(element => element.nameOfSchool.value)});
    });
  }

  function getOccupations() {
    sparql_connection.query(`
        SELECT DISTINCT ?position
        WHERE {
            ?subject hp:positionDesignation ?position
        }`
        ).done((res) => {
      $("#occupation")?.autocomplete({source: res.results.bindings.map(element => element.position.value)});
    });
  }