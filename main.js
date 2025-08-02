document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const url = document.getElementById('url');


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newProject = {
            title: title.value,
            description: description.value,
            url: url.value
        };

        axios.post(`http://localhost:4000/projects`, newProject)
            .then(res => {

                showProjects();
                form.reset();

            })
            .catch(err => {
                console.error(err);
            });

    });

    showProjects();
});

const showProjects = () => {
    axios.get(`http://localhost:4000/projects`)
        .then(res => {
            const projects = document.getElementById('projects');
            projects.innerHTML = '';
            res.data.forEach(project => {
                projects.innerHTML +=
                    `<div class="project-card">
                        <img src="${project.url}" alt="Paysage">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <button class="delete-btn" onclick="deleteProject('${project.id}')">🗑️</button>
                    </div>`;
            });
        })
        .catch(err => {
            console.error(err);
        });
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        axios.delete(`http://localhost:4000/projects/${id}`)
            .then(res => {
                showProjects();
            })
            .catch(err => {
                console.error(err)
            });
    }
}
