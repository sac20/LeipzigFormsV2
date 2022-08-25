function onSuccess(res) {
  var html = "";
  const rows = res.results.bindings;
  let index = 0;
  for (const row of rows) {
    if (index % 3 == 0) {
      html += `<div class="row">`
    }

    html += `<div class="col-md-4"><div class="card" style="border-radius: 15px; margin: 5px; background-color: #fdfdfd;">
          <div class="card-body p-4 text-black">
            <div class="d-flex align-items-center mb-4">
              <div class="flex-shrink-0">
                <?xml version="1.0" encoding="iso-8859-1"?>
                <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100px" length="100px"
                   viewBox="0 0 494.721 494.721" style="enable-background:new 0 0 494.721 494.721;" xml:space="preserve">
                <path style="fill:#00233F;" d="M331.448,94.721c0,40.12-30.216,72-67.504,72h-33.168c-37.28,0-67.504-31.88-67.504-72l0,0
                  c0-40.136,30.216-72,67.504-72h33.168C301.224,22.721,331.448,54.585,331.448,94.721L331.448,94.721z"/>
                <polygon style="fill:#F9BDA0;" points="307.696,302.721 187.024,302.721 195.072,198.721 299.648,198.721 "/>
                <polygon style="fill:#E28F71;" points="307.696,302.721 247.168,302.721 187.024,198.721 299.648,198.721 "/>
                <path style="fill:#FCCCB9;" d="M328.824,119.513c0,70.872-35.704,135-81.456,135c-45.768,0-81.488-64.128-81.488-135
                  c0-70.88,35.72-82.68,81.488-82.68C293.12,36.833,328.824,48.625,328.824,119.513z"/>
                <g>
                  <path style="fill:#F9BDA0;" d="M247.368,36.833c45.752,0,81.456,11.8,81.456,82.68c0,70.872-35.704,135-81.456,135"/>
                  <polygon style="fill:#F9BDA0;" points="177.136,96.393 260.136,148.393 296.136,43.393 227.136,49.393 	"/>
                </g>
                <g>
                  <path style="fill:#00233F;" d="M166.352,108.769c-4.328-1.896-3.472-14.736,0.344-23.424c3.832-8.704,10.456-14.2,14.768-12.296
                    c4.344,1.904,7.936,12.784,0.936,19.192"/>
                  <path style="fill:#00233F;" d="M328.336,108.577c4.344-1.912,3.528-14.744-0.28-23.432c-3.816-8.68-10.408-14.168-14.752-12.256
                    c-4.328,1.912-7.952,12.808-0.952,19.192"/>
                </g>
                <polygon style="fill:#0C537A;" points="309.6,269.929 466.464,324.505 489.528,494.721 254.528,494.721 "/>
                <polygon style="fill:#037193;" points="185.104,269.929 28.256,324.505 5.192,494.721 240.192,494.721 "/>
                <polygon style="fill:#0C537A;" points="165.512,367.457 28.256,324.505 5.192,494.721 240.192,494.721 "/>
                <polygon style="fill:#00233F;" points="428.544,336.505 311.36,272.465 311.36,262.721 183.36,262.721 183.36,272.457 
                  66.616,336.505 35.928,494.721 179.552,494.721 240.192,494.721 254.528,494.721 315.152,494.721 458.792,494.721 "/>
                <g>
                  <circle style="fill:#EAEAEA;" cx="247.36" cy="357.393" r="4"/>
                  <circle style="fill:#EAEAEA;" cx="247.36" cy="375.921" r="4"/>
                </g>
                <polygon style="fill:#EDB720;" points="271.36,406.721 255.36,406.721 255.36,390.721 239.36,390.721 239.36,406.721 
                  223.36,406.721 223.36,422.721 239.36,422.721 239.36,462.721 255.36,462.721 255.36,422.721 271.36,422.721 "/>
                <rect x="231.36" y="270.721" style="fill:#FFFFFF;" width="32" height="32"/>
                <polyline style="fill:#EAEAEA;" points="263.36,270.721 263.36,302.721 231.36,302.721 "/>
                <g>
                  <path style="fill:#00233F;" d="M290.136,65.393c0,0-65,60.496-142,24.496c0,0,6.272-19.888,20.344-42.832
                    c12.656-20.664,66-78.664,122.656-24.664L290.136,65.393z"/>
                  <path style="fill:#00233F;" d="M250.808,66.393c0,0,20.672,47,79.672,38c0,0,17.328-91.328-56.344-84.664L250.808,66.393z"/>
                </svg>
              </div>
              <div class="flex-grow-1 ms-3">
                <div class="d-flex flex-row align-items-center mb-2">
                  <p class="mb-0 me-2">${row.label.value}</p>
                </div>
                <div>
                  <button type="button" class="btn btn-outline-dark btn-rounded btn-sm"
                    data-mdb-ripple-color="dark" onClick="change('profile', '${row.label.value}')">See profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>`
    if (index % 3 == 2) {
      html += `</div>`
    }
    index++;
  }

  document.getElementById("result").innerHTML = html;
}

function generateRandomId() {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

function buildBirthPlaceQuery(label, value) {
  return `
      SELECT ?${label}
        WHERE {
          ?${label} rdf:type hp:Place.
          ?${label} rdfs:label "${value}".
        }`
}