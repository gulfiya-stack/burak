

console.log("Signup frontend javascript file");


$(function () {
    const fileTarget = $(".file-box .upload-hidden");
    let filename;

    fileTarget.on("change", function () {
        if (window.FileReader) {
            const uploadFile = $(this)[0].files[0];
            console.log("uploadFile: ", uploadFile);
            const fileType = uploadFile["type"];
            const validImageType = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
            if (!validImageType.includes(fileType)) {
                alert("Please insert only jpg/jpeg/png/webp formats!");
            } else {
                if (uploadFile) {
                    console.log(URL.createObjectURL(uploadFile));
                    $(".upload-img-frame")
                        .attr("src", URL.createObjectURL(uploadFile))
                        .addClass("SUCCESS!");


                }
                filename = $(this)[0].files[0].name;

            }
            $(this).siblings(".upload-name").val(filename);

        }
    });
});
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

    const memberImage = $(".member-image").get(0).files[0].name
        ? $(".member-image").get(0).files[0].name
        : null;
    if (!memberImage) {
        alert("Please insert restaurant image!");
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