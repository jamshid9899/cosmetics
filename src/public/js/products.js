console.log("Products frontend javascript file");

$(function () {
    // Toggle new product form
    $("#process-btn").on("click", function() {
        $(".dish-container").slideToggle(500);
    });

    $("#cancel-btn").on("click", function() {
        $(".dish-container").slideToggle(500);
    });

    // Product status update
    $(".new-product-status").on("change", async function(e) {
        const id = e.target.id;
        const productStatus = $(`#${id}.new-product-status`).val();
        console.log("Product ID:", id);
        console.log("New Status:", productStatus);

        try {
            const response = await axios.post(`/admin/product/${id}`, {
                productStatus: productStatus
            });
            
            if(response.data) {
                console.log("Product status updated successfully");
                $(".new-product-status").blur();
                
                // Visual feedback
                const $row = $(this).closest("tr");
                $row.css("background-color", "#e8f5e9");
                setTimeout(() => {
                    $row.css("background-color", "white");
                }, 1000);
            } else {
                alert("Product update failed!");
            }
        } catch(err) {
            console.error("Error updating product:", err);
            alert("Product update failed!");
        }
    });
});

// Form validation
function validateForm() {
    const productName = $(".product-name").val();
    const productPrice = $(".product-price").val();
    const productLeftCount = $(".product-left-count").val();
    const productCollection = $(".product-collection").val();
    const productDesc = $(".product-desc").val();
    const productStatus = $(".product-status").val();
    
    if (
        productName === "" ||
        productPrice === "" ||
        productLeftCount === "" ||
        productCollection === "" ||
        productDesc === "" ||
        productStatus === ""
    ) {
        alert("Please fill all required fields!");
        return false;
    } 
    
    if (productPrice <= 0) {
        alert("Price must be greater than 0!");
        return false;
    }
    
    if (productLeftCount < 0) {
        alert("Stock quantity cannot be negative!");
        return false;
    }
    
    return true;
}

// Image preview handler - MUST BE GLOBAL
function previewFileHandler(input, order) {
    const imgClassName = input.className;
    console.log("Image input class:", imgClassName);
    console.log("Image order:", order);
    
    const file = $(`.${imgClassName}`).get(0).files[0];
    
    if (!file) {
        console.log("No file selected");
        return;
    }
    
    const fileType = file["type"];
    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validImageTypes.includes(fileType)) {
        alert("Please upload only JPEG, JPG or PNG images!");
        input.value = "";
        return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB!");
        input.value = "";
        return;
    }

    // Preview the image
    const reader = new FileReader();
    reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
        console.log("Image preview updated for order:", order);
    };
    reader.onerror = function() {
        alert("Error reading file!");
        input.value = "";
    };
    reader.readAsDataURL(file);
}