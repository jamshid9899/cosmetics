console.log("Products frontend JS loaded");

// Image preview function - MUST be global for inline onchange handlers
function previewFileHandler(input, order) {
    const file = input.files[0];
    if (file) {
        const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (!validTypes.includes(file.type)) {
            alert("Only JPEG/JPG/PNG/WEBP images allowed!");
            input.value = "";
            return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB!");
            input.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.getElementById(`image-section-${order}`);
            if (imgElement) {
                imgElement.src = e.target.result;
                imgElement.style.objectFit = "cover";
            }
        };
        reader.onerror = function() {
            alert("Error reading file!");
            input.value = "";
        };
        reader.readAsDataURL(file);
    }
}

$(function() {
    const $tableBody = $("#product-table-body");
    const $rows = $tableBody.find("tr");

    // Toggle new product form
    $("#toggle-form-btn").on("click", function() {
        $(".product-form").slideToggle(500);
    });

    $("#cancel-btn").on("click", function() {
        $(".product-form").slideUp(500);
        // Reset form
        $("form.product-form")[0].reset();
        // Reset image previews
        for (let i = 1; i <= 5; i++) {
            $(`#image-section-${i}`).attr("src", "/img/upload.svg");
        }
    });

    // Product Status Update
    $(".product-status-select").on("change", async function(e) {
        const id = e.target.id.replace("status-", "");
        const status = $(this).val();
        
        // Confirmation for DELETE status
        if (status === "DELETE") {
            if (!confirm("Are you sure you want to delete this product?")) {
                // Revert to previous value
                $(this).val($(this).data("previous-value"));
                return;
            }
        }
        
        // Store current value for potential revert
        $(this).data("previous-value", status);
        
        try {
            await axios.post(`/admin/product/${id}`, { productStatus: status });
            console.log(`Product ${id} status updated to ${status}`);
            
            // Visual feedback
            const $row = $(this).closest("tr");
            $row.css("background-color", "#d4edda");
            setTimeout(() => {
                $row.css("background-color", "");
            }, 1000);
            
        } catch(err) {
            console.error("Error updating status:", err);
            alert("Failed to update product status. Please try again.");
            // Revert to previous value on error
            $(this).val($(this).data("previous-value"));
        }
    });

    // Store initial values
    $(".product-status-select").each(function() {
        $(this).data("previous-value", $(this).val());
    });

    // Form validation and submission
    $("form.product-form").on("submit", function(e) {
        e.preventDefault();
        
        // Validate required text fields
        const productName = $("input[name='productName']").val().trim();
        const productPrice = $("input[name='productPrice']").val();
        const productLeftCount = $("input[name='productLeftCount']").val();
        const productDesc = $("textarea[name='productDesc']").val().trim();
        
        if (!productName) {
            alert("Please enter product name!");
            $("input[name='productName']").focus();
            return false;
        }
        
        if (!productPrice || productPrice <= 0) {
            alert("Please enter a valid price!");
            $("input[name='productPrice']").focus();
            return false;
        }
        
        if (!productLeftCount || productLeftCount < 0) {
            alert("Please enter a valid stock count!");
            $("input[name='productLeftCount']").focus();
            return false;
        }
        
        if (!productDesc) {
            alert("Please enter product description!");
            $("textarea[name='productDesc']").focus();
            return false;
        }
        
        // Validate at least one image is uploaded
        const firstImageInput = $("input.image-1")[0];
        if (!firstImageInput.files || firstImageInput.files.length === 0) {
            alert("Please upload at least one product image!");
            firstImageInput.focus();
            return false;
        }
        
        // Show loading state
        $(".btn-text").hide();
        $(".btn-spinner").show();
        $("#create-btn").prop("disabled", true);
        
        // Submit form
        this.submit();
    });

    // Search functionality
    function performSearch() {
        const query = $("#search-input").val().toLowerCase().trim();
        
        if (query === "") {
            $rows.show();
            return;
        }
        
        $rows.each(function() {
            const name = $(this).find(".product-name").text().toLowerCase();
            const type = $(this).find("td:nth-child(3)").text().toLowerCase();
            const size = $(this).find("td:nth-child(4)").text().toLowerCase();
            
            if (name.includes(query) || type.includes(query) || size.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $("#search-btn").on("click", performSearch);
    
    $("#reset-btn").on("click", function() {
        $("#search-input").val("");
        $rows.show();
    });

    // Instant search as you type (with debounce)
    let searchTimeout;
    $("#search-input").on("input", function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });

    // Enter key to search
    $("#search-input").on("keypress", function(e) {
        if (e.which === 13) {
            performSearch();
        }
    });

    // Upload box hover effects
    $(".upload-img-box").hover(
        function() { 
            $(this).css({
                "transform": "scale(1.05)",
                "border-color": "#667eea"
            }); 
        },
        function() { 
            $(this).css({
                "transform": "scale(1)",
                "border-color": "#e0e7ff"
            }); 
        }
    );

    // Drag and drop support for images
    $(".upload-img-box").on("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css("border-color", "#667eea");
    });

    $(".upload-img-box").on("dragleave", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css("border-color", "#e0e7ff");
    });

    $(".upload-img-box").on("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css("border-color", "#e0e7ff");
        
        const input = $(this).find("input[type='file']")[0];
        const files = e.originalEvent.dataTransfer.files;
        
        if (files.length > 0) {
            input.files = files;
            $(input).trigger("change");
        }
    });

    // Number input validation
    $("input[type='number']").on("input", function() {
        if ($(this).val() < 0) {
            $(this).val(0);
        }
    });

    // Smooth scroll to form when opened
    $("#toggle-form-btn").on("click", function() {
        setTimeout(function() {
            if ($(".product-form").is(":visible")) {
                $("html, body").animate({
                    scrollTop: $(".product-form").offset().top - 100
                }, 500);
            }
        }, 100);
    });

    console.log("All event handlers initialized successfully");
});

