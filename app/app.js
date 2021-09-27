function showStudents() {
    if (localStorage) {
        let students = localStorage.getItem("students");

        if (students) {
            students = JSON.parse(students);

            students.forEach((student, index) => {
                $("#students").append(`
                    <div id="student-${index}" class="student">
                        <div class="student-name">Name: ${student.name}</div>
                        <div class="student-age">Age: ${student.age}</div>
                        <div class="student-phone">Phone: ${student.phone}</div>
                        <div class="student-email">Email: ${student.email}</div>
                        <div class="student-classes">Classes:</div>
                    </div>
                `);

                (student.classes || []).forEach((studentClass) => {
                    $(`#student-${index} .student-classes`).append(`<div class="student-class">${studentClass}</div>`)
                });
            });
        }
    }
}

function listen() {
    if (localStorage) {
        $("#addStudent").on('submit', (event) => {
            const values = $(event.target).serializeArray();

            const student = {};

            values.forEach((input) => {
                student[input.name] = input.value;

                if (input.name === "classes") {
                    student.classes = input.value.split(",");
                }
            });

            let students = localStorage.getItem("students");

            if (students) {
                students = JSON.parse(students);
            } else {
                students = [];
            }

            students.push(student);

            localStorage.setItem("students", JSON.stringify(students));
        });

        $("#show-students").on("click", showStudents);
    }
}

$(document).ready(function (){
    listen();
});