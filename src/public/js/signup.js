console.log("SkinBloom Signup JS Loaded");

$(function(){
  const fileInput = $(".member-image"),
        uploadFrame = $(".upload-img-frame");

  fileInput.on("change", function(){
    const file = this.files[0];
    if(!file) return;

    const validTypes = ["image/jpeg","image/jpg","image/png"];
    if(!validTypes.includes(file.type)){
      alert("Only JPEG, JPG, PNG allowed!"); this.value=""; return;
    }

    uploadFrame.attr("src", URL.createObjectURL(file));
  });

  $(".file-input-label").on("dragover", function(e){
    e.preventDefault(); $(this).css("background-color","#5030d5");
  });
  $(".file-input-label").on("dragleave", function(e){
    e.preventDefault(); $(this).css("background-color","#6440fb");
  });
});

function validateSignupForm(){
  const nick=$(".member-nick").val().trim(),
        phone=$(".member-phone").val().trim(),
        pass=$(".member-password").val(),
        confirm=$(".confirm-password").val(),
        img=$(".member-image")[0].files[0];

  if(!nick||!phone||!pass||!confirm){ alert("Please fill all required fields!"); return false;}
  if(pass!==confirm){ alert("Passwords do not match!"); return false;}
  if(!img){ alert("Please upload brand image!"); return false;}
  return true;
}







