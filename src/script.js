const searchInput = document.querySelector(".input");
const reposContainer = document.querySelector("main .container");
const userInfo = document.querySelector("main .user-info");
const logo = document.querySelector(".logo");


searchInput.addEventListener("change", () => {

    if (searchInput.value !== null) {
        let api = `https://api.github.com/users/${searchInput.value}/repos`

        // remove old data
        reposContainer.innerHTML = "";
        userInfo.innerHTML = "";
        fetch(api)
            .then(
                (result) => {
                    return result.json();
                }
            )
            .then(
                (data) => {
                    if (data.message !== "Not Found") {
                        // remove focus from search input
                        searchInput.blur();

                        console.log(data)

                        // make search field empty
                        searchInput.value = null;

                        // number of repositories
                        let reposNum = data.length;

                        // create user info elements
                        let userName = document.createElement("div");
                        userName.className = "username";
                        userName.innerHTML = `${data[0].owner.login} / ${reposNum} repository`;

                        let avatar = document.createElement("a");
                        avatar.className = "avatar"
                        avatar.style.backgroundImage = `url(${data[0].owner.avatar_url})`;
                        avatar.setAttribute("href",data[0].owner.html_url);
                        avatar.setAttribute("target","_blank");

                        userInfo.appendChild(avatar)
                        userInfo.appendChild(userName)

                        for (let repo of data) {
                            let span = document.createElement("span");

                            let title = document.createElement("a");
                            title.className = "title"
                            title.setAttribute("href", repo.html_url)
                            title.setAttribute("target", "_blank")

                            let language = document.createElement("div");
                            language.className = "language"

                            let visibility = document.createElement("div");
                            visibility.className = "visibility"

                            let update = document.createElement("div");
                            update.className = "update"

                            let stars = document.createElement("div");
                            stars.className = "stars"

                            let forks = document.createElement("div");
                            forks.className = "forks"

                            let containerDiv = document.createElement("div");
                            containerDiv.className = "div-container"


                            let updateDate = new Date(repo.updated_at)
                            let Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                            title.textContent = repo.name;
                            language.textContent = repo.language
                            visibility.textContent = repo.visibility;
                            update.textContent = `updated on ${Months[updateDate.getMonth()]}, ${updateDate.getDate()} ${updateDate.getFullYear()}`
                            stars.innerHTML = `<i class="fa-regular fa-star"></i> ${repo.stargazers_count}`
                            forks.innerHTML = `<i class="fa-solid fa-code-fork"></i> ${repo.forks}`

                            span.appendChild(title)
                            
                            containerDiv.appendChild(language)
                            containerDiv.appendChild(stars)
                            containerDiv.appendChild(forks)
                            
                            span.appendChild(containerDiv);
                            span.appendChild(visibility)
                            span.appendChild(update)
                            reposContainer.appendChild(span)
                        }
                    }
                }
            )
    }

})

logo.onclick = function () {
    window, location.reload();
}