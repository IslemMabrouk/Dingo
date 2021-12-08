//Import express
const express = require('express');
//Import mongoose
const mongoose = require('mongoose');
//Import model User
const User = require('./models/user');
//Import model User
const Plat = require('./models/plat');
//Import Body-Parser
const bodyParser = require('body-parser');
const user = require('./models/user');
//Import bcrypt
const bcrypt = require('bcrypt');
//Import multer
const multer = require('multer');
// Import Path
const path = require('path');

//Import PDF_Kit
const fs = require('fs');
const PDFDocument = require('./pdfkit');


//Instance express in App
const app = express();

// Connect to Data Base
mongoose.connect('mongodb://localhost:27017/restoDB', { useNewUrlParser: true, useUnifiedTopology: true });


// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});



//Body-Parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*********************** Multer ********************/
//:::::::::::::Accès aux fichiers:::::::::::::::::://

//Accès aux fichiers images
app.use('/images', express.static(path.join('backend/images')))

//Configuration multer :

//Etape 1 : Définition des extensions selon le type de media
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpeg': 'jpg'
}

//Etape 2 : Défintion des destinations et les noms des fichiers
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {   // cb : variable de succès
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        //Affecter la destination
        cb(null, 'backend/images')
    },
    //file name
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' +
            '.' + extension;
        //Affecter file name
        cb(null, imgName);
    }
});


/***************************************************/

//:::::::::::::::::::::::::::::::::::::::::::::::::://
//::::::::::::::::::CRUD User:::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::://

//Traitement Create User
app.post('/api/createUser', (req, res) => {

    User.findOne({ email: req.body.email }).then(
        (doc) => {
            if (doc) {
                res.status(200).json({
                    message: "User already exist"
                })
            } else {
                bcrypt.hash(req.body.password, 10).then(
                    cryptedPassword => {

                        //Etape1
                        let user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: cryptedPassword,
                            phone: req.body.phone,
                            speciality: req.body.speciality,
                            experience: req.body.experience,
                            dateOfBirth: req.body.dateOfBirth,
                            role: req.body.role

                        });

                        //Etape2
                        user.save();

                        //Etape3
                        res.status(200).json({
                            message: 'user added with  success'
                        })

                    })
            }
        })
});


//Traitement get Users
app.get('/api/allUsers', (req, res) => {
    console.log("Here in function get All Users");

    //Etape 1
    User.find((err, docs) => {
        if (err) {
            console.log("Error in DB");
        } else {
            //Success
            res.status(200).json({
                users: docs
            })
        }
    })

})


//Traitement de get user by Id
app.get('/api/allUsers/:id', (req, res) => {
    console.log("Here in function get user by id");

    //Etape 1
    let id = req.params.id;
    console.log("id user to search:", id);

    //Etape 2
    User.findOne({ _id: id }).then(
        (doc) => {
            console.log("finded User", doc);
            res.status(200).json({
                user: doc
            })
        }
    )

})


//Traitement de delete user 
app.delete('/api/allUsers/:id', (req, res) => {
    console.log("Here in function delete user");

    //Etape 1
    let id = req.params.id;
    console.log("user id to delete:", id);

    // Recherche User (role:chef)
    User.findOne({ _id: id }).then(
        (result) => {
            console.log("user", result);
            if (result.role == 'chef') {
                //Supp des Plats
                Plat.deleteMany({ idChef: result._id }).then(
                    () => {
                        console.log("Plats deleted with success");
                    })
            }
        })
    //Etape 2
    User.deleteOne({ _id: id }).then(
        (result) => {
            console.log("delete result", result);

            if (result) {
                //Success
                res.status(200).json({
                    message: "User deleted with success"
                })
            }

        })


})


//Traitement Login
app.post("/api/login", (req, res) => {
    console.log("Here in login", req.body);
    //Etape1 : Recherche de l'utilisateur avec l'email
    User.findOne({ email: req.body.email }).then(
        (resultEmail) => {
            console.log("resultEmail", resultEmail);
            //Si l'email n'existe pas
            if (!resultEmail) {
                res.status(200).json({
                    findedUser: "Wrong Email"
                });
            }
            //Etape 2 : Sinon on passe à la comparaison du mot de passe écrit en FE par le mot de passe associé à l'email trouvé
            return bcrypt.compare(req.body.password, resultEmail.password);
        })
        .then(
            (resultPwd) => {
                console.log("resultPwd", resultPwd);
                //Si les mots de passe ne sont pas identiques
                if (!resultPwd) {
                    res.status(200).json({
                        findedUser: "Wrong password"
                    });
                }
                else {
                    //Si l'email et le mot de passe existent donc on passe à la recherche de l'utilisateur par son email
                    User.findOne({ email: req.body.email }).then(
                        (result) => {
                            console.log("result", result);
                            res.status(200).json({
                                findedUser: result
                            })
                        }
                    )
                }
            })
});

//Traitement Edit User
app.put('/api/allUsers/:id', (req, res) => {
    console.log('Here in function Edit User');
    //Etape 1
    let user = {
        _id: req.body._id,  // Kn ma n7otouhec ya5l9 'id' jdid
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        speciality: req.body.speciality,
        experience: req.body.experience,
        dateOfBirth: req.body.dateOfBirth,
        role: req.body.role

    };

    //Etape 2 
    User.updateOne({ _id: req.body._id }, user).then(
        (result) => {
            console.log('Result Update', result);

            res.status(200).json({
                message: 'Edited with success'
            });
        }
    )




})

//:::::::::::::::::::::::::::::::::::::::::::::::::://
//:::::::::::::::::CRUD Plats::::::::::::::::::::::://
//:::::::::::::::::::::::::::::::::::::::::::::::::://

//Traitement add Plat
app.post('/api/addPlat', multer({ storage: storage }).single('img'), (req, res) => {
    //Etape1
    console.log('Here function add plat');

    let url = req.protocol + '://' + req.get('host');
    console.log("body", req.body);
    Plat.findOne({ platName: req.body.platName, idChef: req.body.idChef }).then(
        (doc) => {
            if (doc) {
                res.status(200).json({
                    message: "Plat already exist"
                })

            } else {

                let plat = new Plat({
                    platName: req.body.platName,
                    price: req.body.price,
                    description: req.body.description,
                    idChef: req.body.idChef,
                    img: url + '/images/' + req.file.filename

                });

                //Etape2
                plat.save();

                //Etape3
                res.status(200).json({
                    message: 'Plat added with  success'
                })


            }
        }
    )



});

//Traitement get Plats
app.get('/api/allPlats', (req, res) => {
    console.log("Here in function get All Plats");

    //Etape 1
    Plat.find((err, docs) => {
        if (err) {
            console.log("Error in DB");
        } else {
            //Success
            res.status(200).json({
                plats: docs
            })
        }
    })

})

//Traitement delete Plats
app.delete('/api/allPlats/:id', (req, res) => {
    console.log("Here in function delete Plat");

    //Etape 1
    let id = req.params.id;
    console.log("plat id to delete:", id);

    //Etape 2
    Plat.deleteOne({ _id: id }).then(
        (result) => {
            console.log("delete result", result);

            if (result) {
                //Success
                res.status(200).json({
                    message: "Plat deleted with success"
                })
            }

        })


})

//Traitement de get plat by Id
app.get('/api/allPlats/:id', (req, res) => {
    console.log("Here in function get Plat by id");

    //Etape 1
    let id = req.params.id;
    console.log("id Plat to search:", id);

    //Etape 2
    Plat.findOne({ _id: id }).then(
        (doc) => {
            console.log("finded Plat", doc);
            res.status(200).json({
                plat: doc
            })
        }
    )

})

//Traitement de get myplat
app.get('/api/myPlats/:id', (req, res) => {
    console.log('Here in getmyPlats');

    let id = req.params.id
    Plat.find({ idChef: id }, (err, docs) => {
        if (err) {
            console.log("Error in DB");
        } else {
            res.status(200).json({
                myPlats: docs
            })
        }
    })
})

//Traitement Edit Plat
app.put('/api/allPlats/:id', (req, res) => {
    console.log('Here in function Edit Plat');
    //Etape 1
    let plat = {
        _id: req.body._id,  // Kn ma n7otouhec ya5l9 'id' jdid
        platName: req.body.platName,
        price: req.body.price,
        description: req.body.description,
        idChef: req.body.idChef
    };

    //Etape 2 
    Plat.updateOne({ _id: req.body._id }, plat).then(
        (result) => {
            console.log('Result Update', result);

            res.status(200).json({
                message: 'Plat edited with success'
            });
        }
    )




})

//:::::::::::::::::::::PDF::::::::::::::::::::::::://
app.get("/users/generateFilePdf", (req, res) => {
    User.find((err, docs) => {
        if (err) {
            console.log("ERROR");
        } else {
            // Create The PDF document
            const doc = new PDFDocument();
            // Pipe the PDF into a user's file
            doc.pipe(fs.createWriteStream(`backend/pdfs/test.pdf`));
            // Add the header -https://pspdfkit.com/blog/2019/generate-invoices pdfkit-node/
            doc
                .image("backend/images/logo.jpg", 50, 45, { width: 50 })
                .fillColor("#444444")
                .fontSize(20)
                .text("Here All Users", 110, 57)
                .fontSize(10)
                .text("Imm Yasmine Tower", 200, 65, { align: "right" })
                .text("Centre Urbain Nord", 200, 80, { align: "right" }).moveDown();
            // Create the table -https://www.andronio.me/2017/09/02/pdfkit-tables/
            const table = {
                headers: [
                    "FirstName",
                    "LastName",
                    "Email Address",
                    "Phone",
                    "role",
                ],
                rows: [],
            };
            // Add the users to the table
            for (const user of docs) {
                table.rows.push([
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.phone,
                    user.role,
                ]);
            }
            // Draw the table
            doc.moveDown().table(table, 10, 125, { width: 590 }); // Finalize the PDF and end the stream
            doc.end();
            res.status(200).json({
                message: "HERE PDF (success)",
            });
        }
    });
});


//Traitement de search chef
app.post('/api/searchChef', (req, res) => {
 
    console.log('Hello in search ');

    //Etape 1 : Récupération du searchValue
    let searchValue = req.body.searchValue;
    console.log('searchValue',searchValue);

    //Etape 2 : Recherche 
    User.find({
        $or : [ {speciality : { $regex : `.*${searchValue}`}},
                {firstName : { $regex : `.*${searchValue}`}}
        ]
    }).then(
        (docs) =>{
            if (docs) {
                console.log('resuly',docs);
                res.status(200).json({
                    chefs : docs
                })
            }
        }
    )


})



//Export App
module.exports = app;
