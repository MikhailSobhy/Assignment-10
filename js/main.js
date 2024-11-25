var websiteName = document.getElementById("siteName");
var websiteLink = document.getElementById("siteLink");
var sites = [];
sites = JSON.parse(localStorage.getItem("site")) || [];
displaySites();

function addSite() {
  if (validateAllInputs()) {
    var site = {
      wsName: websiteName.value,
      wsLink: websiteLink.value,
    };
    sites.push(site);
    displaySites();
    localStorage.setItem("site", JSON.stringify(sites));
    Swal.fire({
      icon: "success",
      title: "Added Successfully",
      text: "Good",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
    clearForm();
  } else {
    Swal.fire({
      icon: "error",
      title: "Cannot Add",
      text: "Site name must contain at least 3 characters and Site URL must be a valid one",
    });
  }
}

function displaySites() {
  var all = "";
  for (var i = 0; i < sites.length; i++) {
    all += `<tr>
                    <td>${i + 1}</td>
                    <td>${sites[i].wsName}</td>
                    <td><button class="btn bg-success"><a href="${
                      sites[i].wsLink
                    }"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
                    <td><button class="btn bg-danger" onclick="deleteSite(${i})"><a href=""><i class="fa-solid fa-trash"></i> Delete</a></button></td>
                </tr>
                `;
  }
  document.getElementById("sites-container").innerHTML = all;
}

function deleteSite(index) {
  sites.splice(index, 1);
  displaySites();
  localStorage.setItem("site", JSON.stringify(sites));
}

function clearForm() {
  websiteName.value = null;
  websiteLink.value = null;
  websiteName.classList.remove('is-valid' , 'is-invalid')
  websiteLink.classList.remove('is-valid' , 'is-invalid')
}

function validate(regex, inputValue, input) {
  if (regex.test(inputValue)) {
    input.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    input.classList.add("is-invalid");
    return false;
  }
}

function validateAllInputs() {
  if (
    validate(/^[\w\s]{3,30}$/, websiteName.value, websiteName) &&
    validate(
      /^(https:\/\/|www\.|https:\/\/www\.)[\w]+\.[\w]{2,}[\/[\w]*]?$/,
      websiteLink.value,
      websiteLink
    )
  ) {
    return true;
  } else {
    return false;
  }
}
