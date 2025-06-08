const img = document.getElementById("create-btn");
img.addEventListener("click", function () {
    const password = generate_pass();
    const output = document.getElementById("generatedpassword");
    output.value = password;
    console.log(password);
});

function generate_pass(len = 16) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let pass = "";
    for(let i =0;i<len;i++){
        const random_index = Math.floor(Math.random() * chars.length);
        pass += chars[random_index];
    }
    return pass;
}

const copy_img = document.querySelector(".copy-img");
copy_img.addEventListener("click",function(){
    const pass = document.getElementById("generatedpassword").value

    navigator.clipboard.writeText(pass)
    .then(()=> alert("Password copied"))
    .catch(()=> alert("Failed to copy password"))
});

const check_btn = document.getElementById("checkbtn");
const input_pass = document.getElementById("check-password");
const strength_text = document.getElementById("strenght-text");
const result_img = document.querySelector(".result-img");


check_btn.addEventListener("click", function(){
    const pass = input_pass.value;
    if(pass == ""){
        strength_text.textContent = "please enter the password";
        return;
    }

    const strenght = check_strength(pass);
    strength_text.textContent = `Strength: ${strenght}`;
    if (strenght == "Strong") {
        strength_text.style.color = "green";
        result_img.src = "images/tick.png";
    }
    else if (strenght == "Medium") {
        strength_text.style.color = "orange";
        result_img.src = "images/warning.png";
    }
    else {
        strength_text.style.color = "red";
        result_img.src = "images/cross.png";
    }

});

function hasany(str, chars){
    for(let i=0;i<chars.length;i++){
        if(str.includes(chars[i])){
            return true;
        }
    }
    return false;
}

function check_strength(pass) {
    lcase = "abcdefghijklmnopqrstuvwxyz";
    ucase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    nums = "0123456789";
    symbs = "!@#$%^&*()_+[]{}|;:,.<>?";
    let score = 0;
    if(pass.length >10) score++;
    if(hasany(pass,lcase)) score++;
    if(hasany(pass,ucase)) score++;
    if(hasany(pass,nums)) score++;
    if(hasany(pass,symbs)) score++;

    if(score>=4) return "Strong";
    else if(score>=3) return "Medium";
    return "Weak";
}