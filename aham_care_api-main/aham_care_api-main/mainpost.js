// const express = require("express");
// const cors = require("cors");
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// require('dotenv').config();
// const post = require("./models/post");
// const userPost = require("../aham_care_api-main/models/post");
// const mongoose = require("mongoose")


// const app = express();
// app.use(express.json());
// app.use(cors({ origin: true }));
// app.use("/uploads", express.static("./uploads"));

// mongoose
//     .connect(process.env.DATABASE_URL, {
//         useNewUrlParser: true,
//     })
//     .then(() => console.log("database connected successfully"))
//     .catch((err) => console.log("error connecting to mongodb", err));

// app.post("/userpost", upload.single("PostImage"), async (req, res) => {
//     try {
//         const { body } = req;
//         const savePost = new post({
//             userId: body.id,
//             description: body.description, // Fixed typo: changed 'discription' to 'description'
//             image: `${req.file.destination}${req.file.filename}`
//         });
//         await savePost.save();
//         res.status(200).json({ message: "Post added successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.get("/getuserpost", async (req, res) => {
//     const posts = await post.find().populate("userId");
//     console.log(posts);
//     res.status(200).send(posts);
// });

// app.listen(3001, () => {
//     console.log("App Is Running On Port 3001");
// });
