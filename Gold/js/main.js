//javascript
//wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function () {

    function ge(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }

    function getTats() {
        var formTag = document.getElementsByTagName("form"),
            selectLi = ge('dropDown'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "dropDownSelect");
        for (var i = 0, j = dropDown.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optText = dropDown[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }


    function getSelectedRadio() {
        var radios = document.forms[0].sex;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                sexValue = radios[i].value;
            }
        }
    }

    function toggleControls(n) {
        switch (n) {
            case "on":
                ge('itemForm')
                    .style.display = "none";
                ge('clearData')
                    .style.display = "inline";
                ge('displayData')
                    .style.display = "none";
                ge('addNew')
                    .style.display = "inline";
                break;
            case "off":
                ge('itemForm')
                    .style.display = "block";
                ge('clearData')
                    .style.display = "inline";
                ge('displayData')
                    .style.display = "inline";
                ge('addNew')
                    .style.display = "none";
                ge('items')
                    .style.display = "none";
                break;
            default:
                return false;

        }
    };


    function storeData(key) {
        if (!key) {
            var id = Math.floor(Math.random() * 1000000001);
        } else {
            id = key;
        }
        getSelectedRadio();
        var item = {};
            item.style = ["Style:", ge('dropDownSelect').value];
            item.fname = ["First Name:", ge('fname').value];
            item.lname = ["Last Name:", ge('lname').value];
            item.email = ["Email:", ge('email').value];
            item.sex = ["Sex:", sexValue];
            item.url = ["Website:", ge('url').value];
            item.date = ["Date:", ge('date').value];
            item.pain = ["Pain Tolerance:", ge('pain').value];
            item.comment = ["Comments:", ge('comment').value];

        localStorage.setItem(id, JSON.stringify(item));
        alert("Tattoo Appointment Made!");
    }

    function getData() {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There are no items saved! So default data was added!");
            autoFillData();
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        ge('items')
            .style.display = "block";
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            getImage(obj.style[1], makeSubList);
            for (var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);

            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }
    
    function getImage(styName, makeSubList){
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src","images/"+ styName +".png");
        imageLi.appendChild(newImg);
    }
    //auto Populate
    function autoFillData(){
        for(var n in json){
            var id = Math.floor(Math.random() * 1000000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }

    function makeItemLinks(key, linksLi) {

        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);


        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);

        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Item";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function editItem() {

        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        toggleControls("off");

        ge('dropDownSelect')
            .value = item.style[1];
        ge('fname')
            .value = item.fname[1];
        ge('lname')
            .value = item.lname[1];
        ge('email')
            .value = item.email[1];
        var radios = document.forms[0].sex;
        for(var i=0; i<radios.length; i++){
            if(radios[i].value == "Male" && item.sex[1] == "Male"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Female" && item.sex[1] == "Female"){
                radios[i].setAttribute("checked", "checked");
            }
        }
        ge('url')
            .value = item.url[1];
        ge('date')
            .value = item.date[1];
        ge('pain')
            .value = item.pain[1];
        ge('comment')
            .value = item.comment[1];

        ge('saveData').removeEventListener("click", storeData);
        ge('saveData').value = "Edit Item";
        var editSubmit = ge('saveData');
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }

    function deleteItem() {
        var ask = confirm("Are you sure you want to delete this item?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        } else {
            alert("Item was not erased!");
        }
    }

    function deleteData() {
        var askAll = confirm("WARNING! This will delete all of your appointments! Press OK to continue.");
        if (localStorage.length === 0) {
            alert("There is no data to clear!");

        } else if (askAll) {
            localStorage.clear();
            alert("All Items Have Been Deleted!");
            window.location.reload();
            return false;
        } else {
            alert("Tattoo Appointments were not erased!");
        }
    }

    function validate(eventData) {
        //Define the elements to be checked
        var getstyle = ge('dropDownSelect');
        var getfname = ge('fname');
        var getlname = ge('lname');
        var getemail = ge('email');
        var getdate = ge('date');
        var geturl = ge('url');
        var getdate = ge('date');
        var getpain = ge('pain');
        var getcomment = ge('comment');
    

        errorMsg.innerHTML = "";
        getstyle.style.border = "1px solid black";
        getfname.style.border = "1px solid black";
        getlname.style.border = "1px solid black";
        getemail.style.border = "1px solid black";
        getdate.style.border = "1px solid black";
        geturl.style.border = "1px solid black";
        getdate.style.border = "1px solid black";
        getpain.style.border = "1px solid black";
        getcomment.style.border = "1px solid black";
 
        var messageArray = [];

        if (getstyle.value === "") {
            var styleError = "Please select a style!";
            getstyle.style.border = "2px solid red";
            messageArray.push(styleError);
        }

        if (getfname.value === "") {
            var fnameError = "Please enter your first name!";
            getfname.style.border = "2px solid red";
            messageArray.push(fnameError);
        }

        if (getlname.value === "") {
            var lnameError = "Please enter your last name!";
            getlname.style.border = "2px solid red";
            messageArray.push(lnameError);

        }
        
        if (getemail.value === "") {
            var emailError = "Please enter your Email address!";
            getemail.style.border = "2px solid red";
            messageArray.push(emailError);
        }   
        
        if (geturl.value === "") {
            var urlError = "Please enter an example of your artwork!";
            geturl.style.border = "2px solid red";
            messageArray.push(urlError);

        }
        
        if (getpain.value === "") {
            var painError = "Please enter your pain tolerance!";
            getcomment.style.border = "2px solid red";
            messageArray.push(painError);

        }
        
        if (getcomment.value === "") {
            var commentError = "Please enter your last name!";
            getcomment.style.border = "2px solid red";
            messageArray.push(commentError);

        }

        
        if (getdate.value === "") {
            var date = "Please enter the date you would like to make your appointment!";
            getdate.style.border = "2px solid red";
            messageArray.push(dateError);
        }

        if (messageArray.length >= 1) {
            for (var i = 0, j = messageArray.length; i < j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messageArray[i];
                errorMsg.appendChild(txt);
            }
            eventData.preventDefault();
            return false;
        } else {

            storeData(this.key);
        }


    }

    function clearData() {
        if (localStorage.length === 0) {
            alert("There is no data to clear!");

        } else {
            localStorage.clear();
            alert("All Items Have Been Deleted!");
            window.location.reload();
            return false;
        }
    }
    var dropDown = ["--Choose A Style--", "Color", "Grey", "Outline"];
    var sexValue;
    var errorMsg = ge('errors');
    getTats();
    var displayData = ge('displayData');
    displayData.addEventListener("click", getData);
    var clearData = ge('clearData');
    clearData.addEventListener("click", deleteData);
    var save = ge('saveData');
    save.addEventListener("click", storeData);
})







