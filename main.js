let btn = document.getElementById("btn")
let username = document.getElementById("username")
let textarea = document.getElementById("textarea")
let userInfo = document.getElementById("userInfo")
let img = document.getElementById("img");


btn.addEventListener("click", () => {
    fetch('https://682199f9259dad2655afc0f9.mockapi.io/post', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            textarea: textarea.value,
            img: img.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(() => location.reload())
})

fetch('https://682199f9259dad2655afc0f9.mockapi.io/post')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            let text = document.createElement("h4")
            let post = document.createElement("p")
            let imge = document.createElement("img")
            imge.src = element.img
            imge.style.width = '30%'
            let del = document.createElement("button")
            del.innerText = "delete"
            del.addEventListener("click", () => {
                fetch(`https://682199f9259dad2655afc0f9.mockapi.io/post/${element.id}`, {
                    method: 'DELETE',
                }).then(() => location.reload())
            })

            text.innerText = `name is ${element.username}`
            post.innerText = element.textarea
            userInfo.appendChild(imge)
            userInfo.appendChild(text)
            userInfo.appendChild(post)
            userInfo.appendChild(del)
        });
    });