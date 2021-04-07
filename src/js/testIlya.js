let container = document.querySelector('.container')
let btnAddPost = document.querySelector('#btnAddPost')
let inputTitleNewPost = document.querySelector('.inputTitle')
let inputBodyNewPost = document.querySelector('.inputBody')
function AddPost(url,titleUser,BodyUser) {
    fetch(url,{
        method:'POST',
        body:{
           title:titleUser,
           body:BodyUser
        }
    })
}
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let imgs = document.querySelector('.imgs')

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
btnAddPost.addEventListener('click',()=>{
    let resImg = imgs.value.slice(12)
    console.log(resImg);
    container.innerHTML+=`
    <div class="newPost">
        <div class="infoUser">
             <div class="imgUser"></div>
             <div class ="userName">nameUser</div>
        </div>
        <div class="imgPost">  
        <div> <img src="../../${resImg}"></div>
        </div>
        <div class"differentButtons">
            <span class="btnLoke">&#10084;</span>
            <span class="btnCommit">&#9776;</span>
            <span class="btnSend">&#128386;</span>
            <span class="btnSave">&#9872;</span>
        </div>
        <div class="postCo">
            <p class="pTitle">${inputTitleNewPost.value}</p>
            <p class="pBody">${inputBodyNewPost.value}</p>
        </div>
    </div>`
})
