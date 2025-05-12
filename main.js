let btn = document.getElementById("btn");
let username = document.getElementById("username");
let textarea = document.getElementById("textarea");
let userInfo = document.getElementById("userInfo");
let img = document.getElementById("img");

let existingUsernames = [];

btn.addEventListener("click", () => {
    let name = username.value;
    let text = textarea.value;
    let imageUrl = img.value;

    if (name.length <= 4) {
        alert("الاسم يجب أن يكون أكثر من 4 حروف");
        return;
    }

    if (text.length <= 6) {
        alert("النص يجب أن يكون أكثر من 6 حروف");
        return;
    }

    if (imageUrl === "") {
        alert("يجب إدخال رابط الصورة");
        return;
    }

    if (existingUsernames.includes(name)) {
        alert("هذا الاسم مستخدم من قبل، الرجاء اختيار اسم مختلف");
        return;
    }

    fetch('https://682199f9259dad2655afc0f9.mockapi.io/post', {
        method: 'POST',
        body: JSON.stringify({
            username: name,
            textarea: text,
            img: imageUrl
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(() => location.reload());
});

fetch('https://682199f9259dad2655afc0f9.mockapi.io/post')
    .then((response) => response.json())
    .then((data) => {
        data.forEach(element => {
            existingUsernames.push(element.username.trim());


            let text = document.createElement("h4");
            let post = document.createElement("p");
            let imge = document.createElement("img");

            imge.src = element.img;
            imge.style.width = '100%';
            imge.style.borderRadius = '10px';

            let del = document.createElement("button");
            del.innerText = "Delete";
            del.addEventListener("click", () => {
                fetch(`https://682199f9259dad2655afc0f9.mockapi.io/post/${element.id}`, {
                    method: 'DELETE',
                }).then(() => location.reload());
            });

            text.innerText = element.username;
            post.innerText = element.textarea;

            let card = document.createElement("div");
            card.style.border = "1px solid #ccc";
            card.style.borderRadius = "10px";
            card.style.padding = "10px";
            card.style.margin = "10px";
            card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
            card.style.width = "250px";

            card.appendChild(imge);
            card.appendChild(text);
            card.appendChild(post);
            card.appendChild(del);

            userInfo.appendChild(card);
        });
    });