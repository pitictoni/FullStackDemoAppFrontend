function goToStudentList(){
    location.href = "../Students/students.html";
}

function addStudent(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (id==0){
        addNewStudent();
    }
    else{
        modifyStudent(id);
    }
}

async function modifyStudent(id){
    const firstNameValue = document.getElementById('firstName').value;
    const surNameValue = document.getElementById('surName').value;
    const mailValue = document.getElementById('mail').value;
    const pictureUrlValue = document.getElementById('pictureUrl').value;

    const student = JSON.stringify(
        {
            id:id,
            firstName:firstNameValue,
            surName:surNameValue,
            mail: mailValue,
            pictureUrl : pictureUrlValue
        }
    );

    const response = await fetch(
        'http://localhost:8080/student/modify',
        {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: student
        }
    );

    goToStudentList();
}


async function addNewStudent(){
    const firstNameValue = document.getElementById('firstName').value;
    const surNameValue = document.getElementById('surName').value;
    const mailValue = document.getElementById('mail').value;
    const pictureUrlValue = document.getElementById('pictureUrl').value;

    const student = JSON.stringify(
        {
            firstName:firstNameValue,
            surName:surNameValue,
            mail: mailValue,
            pictureUrl : pictureUrlValue
        }
    );

    const response = await fetch(
        'http://localhost:8080/student/add',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: student
        }
    );

    goToStudentList();
}

async function populateInputs(id){
    const firstNameInput = document.getElementById('firstName');
    const surNameInput = document.getElementById('surName');
    const mailInput = document.getElementById('mail');
    const pictureUrlInput = document.getElementById('pictureUrl');

    const studentResponse = await fetch('http://localhost:8080/student/' + id);
    const student = await studentResponse.json();

    firstNameInput.value = student.firstName;
    surNameInput.value =student.surName;
    mailInput.value = student.mail;
    pictureUrlInput.value = student.pictureUrl;
}


window.onload = (event) =>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (id!=0){
        populateInputs(id);
    }
}