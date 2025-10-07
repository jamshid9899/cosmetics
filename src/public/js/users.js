console.log("Users frontend JS loaded");

$(function() {
  const $tableBody = $("#user-table-body");
  const $rows = $tableBody.find("tr");

  // Search
  function filterUsers() {
    const query = $("#search-input").val().toLowerCase();
    $rows.each(function() {
      const name = $(this).find(".user-name").text().toLowerCase();
      $(this).toggle(name.includes(query));
    });
  }

  $("#search-btn").on("click", filterUsers);
  $("#search-input").on("keyup", filterUsers);
  $("#reset-btn").on("click", function() {
    $("#search-input").val("");
    $rows.show();
  });

  // Status update (React-style)
  $(".member-status").on("change", function() {
    const $select = $(this);
    const id = $select.data("id");
    const newStatus = $select.val();

    axios.post("/admin/user/edit", { _id: id, memberStatus: newStatus })
      .then(res => {
        // backenddan success/ok qaytsa ham alert bermaymiz
        if(res.data.error) {
          alert("Error updating user!"); // faqat xato bo‘lsa
          $select.val($select.data("prev")); // oldingi statusga qaytaradi
        } else {
          $select.data("prev", newStatus); // yangi statusni saqlaydi
          console.log(`User ${id} status updated to ${newStatus}`);
        }
      })
      .catch(err => {
        console.error(err);
        $select.val($select.data("prev"));
        alert("Error updating user!");
      });
  });

  // Har selectga oldingi statusni saqlab qo‘yish
  $(".member-status").each(function() {
    $(this).data("prev", $(this).val());
  });
});



