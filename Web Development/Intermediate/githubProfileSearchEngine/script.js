const APIURL = "https://api.github.com/users/";
const main = document.getElementById('main');
const type = document.getElementById("search");
const getUser = async(username)=>{
    const response = await fetch(APIURL + username);
    const data = await response.json();
    const card = `
        <div class="card">
            <div>
                <img src="${data.avatar_url}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos">
                    
                </div>
            </div>
        </div>
        `
        main.innerHTML=card;
        getRepos(username);

}

const getRepos = async (username)=>{
    const repos = document.querySelector("#repos")
const response = await fetch(APIURL + username + "/repos")
const data = await response.json();
data.forEach((item) => {
    //console.log(item)
    const ele = document.createElement('a');
    ele.classList.add("repo");
    ele.href=item.html_url;
    ele.innerHTML=item.name;
    ele.target='_blank'
    repos.appendChild(ele);
});

}



const form = document.querySelector('#form');
function formsubmit(){
    if(type.value != ""){
        getUser(type.value);
        type.value="";
    }
    
    return false;
}

type.addEventListener('focusout',function(){
    formsubmit();
})