const users = [
    {
        id: '1',
        name: 'ahmed',
        schoolId: 452345
    },

    {
        id: '2',
        name: 'khan',
        schoolId: 207542
    }

];
const grades = [
    {
        id: 1,
        schoolId: '452345',
        grade: 86
    },
    {
        id: 2,
        schoolId: '452345',
        grade: 96
    },
    {
        id: 3,
        schoolId: '207542',
        grade: 80
    }
];

const getUser = (id) => {
    return new Promise((res, rej) => {
        const user = users.find(user => user.id == id);
        if (user) {
            res(user);
        }
        else {
            rej(`unable to find user with id ${id}`);
        }
    });
}

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId == schoolId));
    })
}

const getStatus = (id) => {
    let user;
    return getUser(id).then((tempUser) => {
        user = tempUser;
        return getGrades(tempUser.schoolId);
    }).then((grades) => {
        let average = 0;
        console.log(grades);
        if (grades.length > 0) {
            average = (grades.map((grade) => grade.grade).reduce((a, b) => a + b)) / grades.length;
        }
        return `${user.name} has average ${average}`

    }).catch((error) => {
        console.log(error);
    })
}

// async and asyncawait
// async function will return promise.
const getStatusAlt = async (id) => {
    const user = await getUser(id);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    console.log(grades);
    if (grades.length > 0) {
        average = (grades.map((grade) => grade.grade).reduce((a, b) => a + b)) / grades.length;
    }
    return `${user.name} has average ${average}%`
}

// getUser(2).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

// getGrades(452345).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });


// getStatus(2).then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });

getStatusAlt(1).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
})


