console.log("Signup frontend javascript file");


$(function () { });
function validateSignupForm() {
    console.log("Executed validateSignupForm");
    const memberNick = $(".member-nick").val();
    console.log("memberNick: ", memberNick);

    const memberPhone = $(".member-phone").val();
    console.log("memberPhone: ", memberPhone);

    const memberPassword = $(".member-password").val();
    console.log("memberPassword: ", memberPassword);

    const confirmPassword = $(".confirm-password").val();
    console.log("confirmPassword: ", confirmPassword);

    if (memberNick === "" ||
        memberPassword === "" ||
        memberPhone === "" ||
        confirmPassword === ""
    ) {
        alert("Please insert all required inputs!");
        return false;
    }

    if (memberPassword !== confirmPassword) {
        alert("Password differs, please check!");
        return false;
    }
}

// $(".member-nick").click(function () {
//     // $(".member-phone").hide();
//     $(".member-phone").toggle();
// });

// jQuery
//   $(".member-nick").click(function () {
//     alert($(".member-phone").val());
//   });
// });


//   $("input").click(function () {
//     alert("CLICKED");
//   });







/*document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("input-file");
    const imagePreview = document.querySelector(".upload-img-frame");
    const imageName = document.querySelector(".upload-name");

    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];

        if (!file) {
            imagePreview.src = "/img/default.jpeg";
            imageName.value = "Choose image";
            return;
        }

        imageName.value = file.name;

        const reader = new FileReader();

        reader.onload = function () {
            imagePreview.src = reader.result;
        };

        reader.readAsDataURL(file);
    });
}); */