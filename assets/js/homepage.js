var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);

    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function (repos, searchTerm) {
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo

        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);


        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }


        // append to container
        repoEl.appendChild(titleEl);

        // append statusEl to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
}
function getUserRepos(user) {
    console.log("Get user repos");
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(response => {

            if (response.ok) {
                return response.json();
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .then(data => {
            console.log(data)
            displayRepos(data, user)
            let main = document.querySelector('main');
            // for (let i = 0; i < data.length; i++) {
            //     let div = document.createElement('div')
            //     div.textContent = data[i].name
            //     console.log(data[i].name)
            //     main.appendChild(div)
            // }
        })
        .catch(err => {
            console.log(err)
        })
}

var getFeaturedRepos = function (language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items, language);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

let languageButtons = document.querySelector('#language-buttons');
languageButtons.addEventListener('click', function(e) {
    let lang = e.target.getAttribute('data-language');
    if(lang){
        getFeaturedRepos(lang);
        repoContainerEl.textContent = '';
    }
})


