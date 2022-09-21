function searchByEducation() {
    const typeofschool = document.getElementById('typeofschool').value;
    const attendingplace = document.getElementById('attendingplace').value;
    const nameofschool = document.getElementById('nameofschool').value;
    const enrollmentdate = document.getElementById('enrollmentdate').value;
    const graduationdate = document.getElementById('graduationdate').value;

    var query_string = `
    SELECT DISTINCT ?label ?person
    WHERE {
        ?event rdf:subject ?person.
        ?event rdf:predicate hp:attendedSchool.
        OPTIONAL {
          ?event hp:start ?eventStart.
          BIND(str(?eventStart) AS ?stringEventStart).
        }
        OPTIONAL {
          ?event hp:end ?eventEnd.
          BIND(str(?eventEnd) AS ?stringEventEnd).
        }
        ?person rdfs:label ?label.
        OPTIONAL {
          ?person hp:attendedSchool ?attendedSchool.
          ?attendedSchool hp:schoolType ?schoolType.
          ?attendedSchool hp:nameOfSchool ?nameOfSchool.
          ?attendedSchool hp:place ?attendedPlace.
          ?attendedPlace hp:nameOfPlace ?nameofAttendedPlace.
        }
        FILTER regex(COALESCE(?schoolType, ""), "${typeofschool}", "i").
        FILTER regex(COALESCE(?nameofAttendedPlace, ""), "${attendingplace}", "i").
        FILTER regex(COALESCE(?nameOfSchool, ""), "${nameofschool}", "i").
        FILTER regex(COALESCE(?stringEventStart, ""), "${enrollmentdate}", "i").
        FILTER regex(COALESCE(?stringEventEnd, ""), "${graduationdate}", "i").
      }
      Limit 100`;

    sparql_connection.query(query_string).done(onSuccess);
    return false;
  }