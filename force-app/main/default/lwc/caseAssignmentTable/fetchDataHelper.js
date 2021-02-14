const recordMetadata = {
    name: 'name',
    email: 'email',
    website: 'url',
    amount: 'currency',
    phone: 'phoneNumber',
    closeAt: 'dateInFuture',
};

export default function fetchDataHelper({ amountOfRecords }) {
    // return fetch('https://data-faker.herokuapp.com/collection', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json; charset=utf-8',
    //     },
    //     body: JSON.stringify({
    //         amountOfRecords,
    //         recordMetadata,
    //     }),
    // }).then(response => response.json());
    return Promise.resolve([
        {
            "name": "Belle Funk",
            "email": "Irving.Jacobi36@yahoo.com",
            "website": "https://leonora.net",
            "amount": "695.37",
            "phone": "416-344-2559 x5604",
            "closeAt": "2021-09-01T13:30:57.697Z",
            "id": "525baf9a-97a6-4635-8677-6d1a2a1bbf9d"
        },
        {
            "name": "Sadie Kautzer",
            "email": "Ofelia.Ryan@yahoo.com",
            "website": "https://garfield.name",
            "amount": "575.60",
            "phone": "355-598-5727 x328",
            "closeAt": "2021-04-19T15:04:58.074Z",
            "id": "c93d440b-02c2-40b8-b664-5014c5da5e4e"
        },
        {
            "name": "Yoshiko Altenwerth",
            "email": "Roman.Crist@gmail.com",
            "website": "https://barry.net",
            "amount": "414.15",
            "phone": "(328) 481-1624",
            "closeAt": "2021-09-14T16:43:32.688Z",
            "id": "febb24b4-9df2-4c8c-915f-fc9232da167c"
        }
    ])
}
