// Typing Effect

const typingText = document.getElementById("typing");

const words = [
    "Full Stack Developer",
    "Data Science Student",
    "Python Developer",
    "Machine Learning Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){
        typingText.textContent =
        currentWord.substring(0,charIndex++);

        if(charIndex > currentWord.length){
            deleting = true;

            setTimeout(typeEffect,1500);
            return;
        }
    }
    else{

        typingText.textContent =
        currentWord.substring(0,charIndex--);

        if(charIndex === 0){
            deleting = false;
            wordIndex =
            (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect,
    deleting ? 60 : 120);
}

typeEffect();


// Dark Mode

const toggle =
document.getElementById("themeToggle");

toggle.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    const icon =
    toggle.querySelector("i");

    if(document.body.classList.contains("light")){
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
    else{
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});


// Contact Form

document
.getElementById("contactForm")
.addEventListener("submit",
async function(e){

    e.preventDefault();

    const data = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        subject:
        document.getElementById("subject").value,

        message:
        document.getElementById("message").value
    };

    try{

        const response =
        await fetch(
        "http://localhost:5000/contact",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });

        const result =
        await response.json();

        alert(result.message);

        document
        .getElementById("contactForm")
        .reset();

    }catch(error){

        alert(
        "Server connection failed"
        );

        console.log(error);
    }

});