console.log("Users frontend javascript file");

$(function () {
    $(".member-status").on("change", function (e) {
        const id = e.target.id,

            memberStatus = $(`#${id}.member-status`).val();
        console.log("memberStatus");

        // TODO: Axios updateChosenUser

        // member statusni ozgartiradi
        axios //http request yuboradi
            .post("/admin/user/edit", {
                _id: id,
                memberStatus: memberStatus,
            })
            .then((response) => {
                console.log("response:", response);
                const result = response.data; //backend yuborgan response body json
                console.log("result:", result);

                if (result.data) {
                    $(".member-status").blur();
                    // .blur() — elementdan focusni olib tashlaydi
                } else alert("User update failed!");
            })
            .catch((err) => {
                console.log(err);
                alert("User update failed!");
            });
    });
});