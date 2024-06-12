function skillsMember() {
    // Get the current user
    var currentUser = firebase.auth().currentUser;
    // Get the user's data
    var docRef = db.collection("users").doc(currentUser.uid);
    docRef.get().then(function(doc) {
        // Check if the user exists
        if (doc.exists) {
            // Get the user's data
            var data = doc.data();
            // Check if the user has any skills
            if (data.skills) {
                // Get the user's skills
                var skills = data.skills;
                // Get the skills container
                var skillsContainer = document.getElementById("skills-container");
                // Loop through the skills
                for (var i = 0; i < skills.length; i++) {
                    // Create a new skill element
                    var skillElement = document.createElement("div");
                    // Add the class to the skill element
                    skillElement.className = "skill";
                    // Add the skill to the skill element
                    skillElement.textContent = skills[i];
                    // Add the skill element to the skills container
                    skillsContainer.appendChild(skillElement);
                }
            }
        }
    });
}