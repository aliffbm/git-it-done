function getUserRepos(user) {
    console.log("Get user repos");
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            let main = document.querySelector('main');
            console.log()
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

getUserRepos('aliffbm');

