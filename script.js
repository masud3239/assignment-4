document.addEventListener("DOMContentLoaded", function() {

    const allJobs = document.getElementById("allJobs");
    const totalEl = document.getElementById("total");
    const interviewEl = document.getElementById("interviewCount");
    const rejectedEl = document.getElementById("rejectedCount");

    const filterButtons = document.querySelectorAll(".filter-btn");

    // Function to update counters
    function updateCounters() {
        const jobs = allJobs.querySelectorAll(".job");
        let total = jobs.length;
        let interview = 0;
        let rejected = 0;

        jobs.forEach(job => {
            const status = job.getAttribute("data-status");
            if(status === "interview") interview++;
            else if(status === "rejected") rejected++;
        });

        totalEl.textContent = total;
        interviewEl.textContent = interview;
        rejectedEl.textContent = rejected;
    }

    updateCounters();

    // Delete job functionality
    allJobs.addEventListener("click", function(e) {
        if(e.target.closest(".delete-btn")) {
            const jobCard = e.target.closest(".job");
            jobCard.remove();
            updateCounters();
        }
    });

    // Status change functionality
    allJobs.addEventListener("click", function(e) {
        if(e.target.closest(".status-btn")) {
            const btn = e.target.closest(".status-btn");
            const jobCard = btn.closest(".job");
            const badge = jobCard.querySelector(".status-badge");

            if(btn.textContent.trim() === "Interview") {
                jobCard.setAttribute("data-status", "interview");
                badge.textContent = "Interview";
                badge.className = "status-badge bg-green-50 text-green-500 px-4 py-2 rounded-xl text-lg";
            }
            else if(btn.textContent.trim() === "Rejected") {
                jobCard.setAttribute("data-status", "rejected");
                badge.textContent = "Rejected";
                badge.className = "status-badge bg-red-50 text-red-500 px-4 py-2 rounded-xl text-lg";
            }
            updateCounters();
        }
    });

    // Filter functionality
    filterButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const filter = btn.textContent.trim().toLowerCase();

            allJobs.querySelectorAll(".job").forEach(job => {
                const status = job.getAttribute("data-status");
                if(filter === "all") {
                    job.style.display = "block";
                } else if(filter === status) {
                    job.style.display = "block";
                } else {
                    job.style.display = "none";
                }
            });

            // Highlight active filter
            filterButtons.forEach(b => b.classList.replace("bg-blue-600","bg-gray-200"));
            btn.classList.replace("bg-gray-200","bg-blue-600");
            btn.classList.add("text-white");
        });
    });

});