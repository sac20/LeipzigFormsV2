// se encarga de cargar las diferentes vistas
function change(title, label, city) {
    /// cargan la informacion para autocompletar 
    getPlaces();
    getSchools();
    getOccupations();
    switch (title) {
      case 'byPersonalData':
        $("#includedContent").load("./searches/byPersonalData/ByPersonalData.html", () => {
          $('.date').datepicker({
            format: 'yyyy-mm-dd'
          });
        });
        break;
      case 'byEducation':
        $("#includedContent").load("./searches/byEducation/ByEducation.html", () => {
          $('.date').datepicker({
            format: 'yyyy-mm-dd'
          });
        });
        break;
      case 'byOccupation':
        $("#includedContent").load("./searches/byOccupation/ByOccupation.html", () => {
          $('.date').datepicker({
            format: 'yyyy-mm-dd'
          });
        });
        break;
      case 'profile':
        $("#includedContent").load("./views/Profile/Profile.html", () => {
          loadProfile(label);
        });
        break;
      case 'legal':
        $("#includedContent").load("./about/Legal.html");
        break;
      case 'privacy':
        $("#includedContent").load("./about/Privacy.html");
        break;
      case 'place':
        $("#includedContent").load("./views/Place/Place.html", () => {
          loadPlace(label)
        });
        break;
      case 'position':
        $("#includedContent").load("./views/Position/Position.html", () => {
          loadPosition(label, city)
        });
        break;
      case 'school':
        $("#includedContent").load("./views/Institution/Institution.html", () => {
          loadSchool(label)
        });
        break;
      case 'register':
        $("#includedContent").load("./registration/register.html", () => {
          $('.date').datepicker({
            format: 'yyyy-mm-dd'
          });
        });
        break;
      case 'loadEditForm':
        $("#includedContent").load("./edition/editForm.html", () => {
          $('.date').datepicker({
            format: 'yyyy-mm-dd'
          });
          loadEditForm(label);
        });
        break;
    }
  };