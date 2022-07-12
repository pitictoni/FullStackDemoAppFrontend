

async function populateStudentsTable(){
    const response = await fetch('http://localhost:8080/student/all');
    const studentList = await response.json();

    const studentTable = document.getElementById('studentTable')

    for(const student of studentList ){
        const row = document.createElement('tr');

        const idTd = document.createElement('td');
        idTd.innerHTML = student.id;
        const firstNameTd = document.createElement('td');
        firstNameTd.innerHTML = student.firstName;
        const surNameTd = document.createElement('td');
        surNameTd.innerHTML = student.surName;
        const mailTd = document.createElement('td');
        mailTd.innerHTML = student.mail;

        const studentPictureTd = document.createElement('td');
        const studentImg = document.createElement('img');
        studentImg.src = student.pictureUrl;
        studentImg.width = 40;
        studentPictureTd.appendChild(studentImg);

        const editPictureTd = document.createElement('td');
        const editImg = document.createElement('img');
        editImg.src = '../img/edit.jpg';
        editImg.width = 40;
        editImg.id = student.id;
        editImg.addEventListener('click',editStudent);
        editPictureTd.appendChild(editImg);

        const deletePictureTd = document.createElement('td');
        const deleteImg = document.createElement('img');
        deleteImg.src = '../img/delete.jpg';
        deleteImg.width = 40;
        deleteImg.id = student.id;
        deleteImg.addEventListener('click',deleteStudent);
        deletePictureTd.appendChild(deleteImg);


        row.append(idTd,firstNameTd,surNameTd, mailTd,studentPictureTd, editPictureTd,deletePictureTd);

        studentTable.appendChild(row);
    }

}

function deleteStudent(event){
    const id = event.target.id;
    if(confirm("Esti sigur ca vrei sa il stergi?")){
        fetch('http://localhost:8080/student/delete/' + id,{
            method:'DELETE'
        });
        location.reload();
    }
}

function editStudent(event){
    const id = event.target.id;
    window.location.href = '../AddStudent/addStudent.html?id=' + id;
}

window.onload = (event) => {
    populateStudentsTable();
}