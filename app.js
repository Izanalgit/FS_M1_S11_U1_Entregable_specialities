const userApp = require("./data.js");
const express = require("express");

const data = userApp.userData();
const app = express();

const specs = data.specialtys();

let navLinks = `<a href="/">HOME</a>`;
specs.forEach((spec)=>navLinks += `<a href="/${spec}">*${spec.toUpperCase()}</a>`)

const headerDOM =`
    <header>
        <h1>Centro de trabajadores :</h1>
        <nav>${navLinks}</nav>
    </header>
`;
const workerDOMer = (workers)=>{
    let workersDOM = `<ul>`;
    workers.forEach((worker) => {
        workersDOM += `<li>ID : ${worker.id} - Trabajador : ${worker.name} - Edad : ${worker.age} - Especialidad : ${worker.specialty}</li>`
    });
    workersDOM += `</ul>`;
    return workersDOM;
}

app.get("/",(req,res)=>{
    let workersDOM = workerDOMer(data.usersData);

    res.send(`
        ${headerDOM}
        <main>
            <h2>Trabajadores : </h2>
            ${workersDOM}
        </main>
        <footer>DIRECCIÓN ACTUAL : ${req.path}</footer>
    `);
})
specs.forEach((spec)=>{
    app.get(`/${spec}`,(req,res)=>{
        let workersDOM = workerDOMer(data.usersBySpec(spec));

        res.send(`
            ${headerDOM}
            <main>
                <h2>Trabajadores de ${spec}: </h2>
                ${workersDOM}
            </main>
            <footer>DIRECCIÓN ACTUAL : ${req.path}</footer>
        `);
    })
})
app.use((req,res)=>{
    res.status(404).send(`
        <h1>ERROR 404 :</h1>
        <h2>Ruta ${req.path} no encontrada</h2>
    `)
})
app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
})