function maskPassword(pass){
    let str = ""
    for (let index =0; index < pass.length; index++){
        str +="*"
    }
    return str
}
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(function() {
       alert("Copied the text: " + txt);
    }).catch(function(error) {
       console.error("Error copying text: ", error);
       alert("Failed to copy text. Please try again.");
    });
 }
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let arrUpdate = arr.filter((e) => {
        return e.website != website;
    });
    localStorage.setItem("passwords", JSON.stringify(arrUpdate));
    alert(`Successfully Deleted ${website}'s password`);
    showPassword();
};

const showPassword = () => {
    let tbody = document.querySelector("table tbody");  // Target tbody only
    let data = localStorage.getItem("passwords");

    if (data == null || JSON.parse(data).length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No data to show</td></tr>`;
    } else {
        let arr = JSON.parse(data);
        let str = "";

        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
            <td>${element.website} <img onClick="copyText('${element.website}')" src="copy.svg" alt="copy Button" width="20px" height="20px"></td>
            <td>${element.username} <img onClick="copyText('${element.username}')" src="copy.svg" alt="copy Button" width="20px" height="20px"></td>
            <td>${maskPassword(element.password)} <img onClick="copyText('${element.password}')" src="copy.svg" alt="copy Button" width="20px" height="20px"></td>
            <td><button class="btn" onClick="deletePassword('${element.website}')">Delete</button></td>
        </tr>`;
        }
        tbody.innerHTML = str;  // Replace only the tbody content
    }

    // Clear input fields
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};


document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();

    const website = document.getElementById("website");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    let passwords = localStorage.getItem("passwords");
    
    if (passwords == null) {
        let json = [];
        json.push({ website: website.value, username: username.value, password: password.value });
        alert("Password saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    } else {
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({ website: website.value, username: username.value, password: password.value });
        alert("Password saved");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showPassword();
});

showPassword();
