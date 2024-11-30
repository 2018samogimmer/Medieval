// تحميل التعليقات عند فتح الصفحة
firebase.database().ref("comments").on("child_added", function(snapshot) {
    const comment = snapshot.val();
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.textContent = comment.text;
    document.getElementById("commentsContainer").appendChild(commentDiv);
});

// إضافة تعليق جديد
function addComment() {
    const commentInput = document.getElementById("commentInput");
    if (commentInput.value.trim() !== "") {
        firebase.database().ref("comments").push({ text: commentInput.value });
        commentInput.value = ""; // تفريغ خانة الإدخال
    } else {
        alert("يرجى كتابة تعليق قبل الإرسال!");
    }
}
