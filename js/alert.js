function alert () {
  let alertBox =
    document.getElementById("customAlertBox");
  let alert_Message_container =
    document.getElementById("alertMessage");
  let custom_button =
    document.querySelector(".mainSubmitButton");
  let close_img =
    document.querySelector(".close");
  let body =
    document.querySelector("body");

  custom_button.addEventListener
    ('click', function () {
        alert_Message_container.innerHTML =
            "You clicked the button";
        alertBox.style.display = "block";
    });

  close_img.addEventListener
    ('click', function () {
        alertBox.style.display = "none";
    });
}
