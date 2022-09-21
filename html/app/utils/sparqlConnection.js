
const BASE_URL = 'http://development:8280/fuseki/pfarrerbuch';
const PREFIXES =  `
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX hp: <http://purl.org/voc/hp/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
`

SPARQL = function() {
    this.query = function(query) {
      return $.ajax({
        url: `${BASE_URL}/query`,
        accepts: {json: "application/sparql-results+json"},
        data: {query: PREFIXES+query},
        dataType: "json",
      });
    },
    this.update = function (query) {
      return $.ajax({
        type: "POST",
        url: `${BASE_URL}/update`,
        accepts: { json: "application/sparql-results+json" },
        data: { update: PREFIXES+query },
        dataType: "json",
        headers: {
          'Accept': '*/*',
          'Access-Control-Allow-Origin': '*',
          "Authorization": "Basic YWRtaW46b0o5aWVGMmFleHNoNnA="
        }
      });
    }
  };
  