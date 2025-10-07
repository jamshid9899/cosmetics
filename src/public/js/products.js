console.log("Products frontend JS loaded");

$(function() {
    const $tableBody = $("#product-table-body");
    const $rows = $tableBody.find("tr");

    // Toggle new product form
    $("#toggle-form-btn").on("click", () => {
        $(".product-form").slideToggle(500);
    });

    $("#cancel-btn").on("click", () => {
        $(".product-form").slideUp(500);
    });

    // Product Status Update
    $(".product-status-select").on("change", async function(e){
        const id = e.target.id.replace("status-","");
        const status = $(`#${e.target.id}`).val();
        try {
            await axios.post(`/admin/product/${id}`, { productStatus: status });
            // Silent update, no alert
        } catch(err){
            console.log("Error updating status:", err);
        }
    });

    // Form validation
    $("form.product-form").on("submit", function(e){
        const requiredFields = ["productName","productPrice","productLeftCount","productCollection","productSize","productVolume","productDesc"];
        for(let field of requiredFields){
            if(!$(`input[name=${field}], select[name=${field}], textarea[name=${field}]`).val()){
                alert("Please fill all fields!");
                e.preventDefault();
                return false;
            }
        }
        $(".btn-text").hide();
        $(".btn-spinner").show();
    });

    // Image Preview
    function previewFileHandler(input, order){
        const file = input.files[0];
        if(file){
            const validTypes = ["image/jpeg","image/png","image/jpg"];
            if(!validTypes.includes(file.type)){
                alert("Only JPEG/JPG/PNG allowed!");
                input.value = "";
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e){
                $(`#image-section-${order}`).attr("src", e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }
    window.previewFileHandler = previewFileHandler; // Make global for EJS onchange

    // Search logic
    $("#search-btn").on("click", function(){
        const query = $("#search-input").val().toLowerCase();
        $rows.each(function(){
            const name = $(this).find(".product-name").text().toLowerCase();
            if(name.includes(query)){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $("#reset-btn").on("click", function(){
        $("#search-input").val("");
        $rows.show();
    });

    // Instant search as you type
    $("#search-input").on("input", function(){
        const query = $(this).val().toLowerCase();
        $rows.each(function(){
            const name = $(this).find(".product-name").text().toLowerCase();
            if(name.includes(query)){
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Optional: Product box hover animation
    $(".upload-img-box").hover(
        function() { $(this).css("transform", "scale(1.05)"); },
        function() { $(this).css("transform", "scale(1)"); }
    );
});





