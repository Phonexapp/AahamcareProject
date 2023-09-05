var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var multer = require("multer");
var logger = require('morgan');
const mongoose = require("mongoose")
require("dotenv").config()
var cors = require("cors")
const { authenticateToken } = require('./utils/JWT')
const PostUpload = multer({ dest: 'PostUpload/' });
const UserImageUpload = multer({ dest: 'UserImageUpload/' });
const Video = multer({ dest: 'Video/' });
const Post = require("./models/post.js");
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../aham_care_api-main/utils/JWT.js");
const residence = require("./models/recidence.js");
const organaization = require("./models/organaization.js");


var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin')
var usersRouter = require('./routes/users');

var app = express();
app.use(cors())

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/PostUpload", express.static("./PostUpload"));
app.use("/UserImageUpload", express.static("./UserImageUpload"));
app.use("/Video", express.static("./Video"));

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', authenticateToken, adminRouter)
app.use('/api/v1/user', usersRouter);

app.post("/userpost", PostUpload.single("PostImage"), async (req, res) => {
  console.log(req);
  try {
    const { body } = req;
    const savePost = await new Post({
      userId: body.id,
      discription: body.discription,
      image: `${req.file.destination}` + `${req.file.filename}`
    });

    console.log('log');

    await savePost.save()

    res.status(200).json({ message: "Post added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/getpost", async (req, res) => {
  try {
    const perPage = 20;
    const page = req.query.page || 1;
    const posts = await Post.find().populate("userId")
      .sort({ createdAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/userupdate/:id", async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    const { body } = req;

    const updatedProfile = await User.findByIdAndUpdate(
      id,
      {
        name: body?.name,
        email: body?.email,
        phone_no: body?.phone_no,
        dateOfBirth: body?.dateOfBirth,
        address: body?.address,
        work: body?.work,
        panCardNo: body?.panCardNo,
        aadharNo: body?.aadharNo,
      },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post("/register", UserImageUpload.single("PostImage"), async (req, res) => {
  const { name, email, phone_no, password } = req.body;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "This email address already exists" });
  }

  const cryptedPassword = await bcrypt.hash(password, 12);
  const saveUser = new User({
    name: name,
    email: email,
    phone_no: phone_no,
    password: cryptedPassword,
    image: `${req.file.destination}` + `${req.file.filename}`
  }).save();

  const accessToken = generateAccessToken({ id: saveUser._id });
  const refreshToken = generateRefreshToken({ id: saveUser._id });

  res.send({
    user: saveUser,
    accessToken,
    refreshToken,
    message: "Registretionsuccessfullycompleted",
  });
});

app.get("/getregister", async (req, res) => {
  try {
    const perPage = 20;
    const page = req.query.page || 1;

    const user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/residence", Video.array("Video"), async (req, res) => {
  const { Name, Age, Place, OrginazationId, UserType } = req.body;
  console.log(UserType);
  const OrganaizationUserId = await organaization.findById(OrginazationId);
  try {
    const { body } = req;
    const Residence = new residence({
      organaization: OrginazationId,
      name: Name,
      age: Age,
      place: Place,
      photo: `${req.files[1].destination}` + `${req.files[1].filename}`,
      video: `${req.files[0].destination}` + `${req.files[0].filename}`
    });
    // console.log(Residence._id);
    const ResidenceId=Residence._id;

    if (UserType == "Residence") {
      OrganaizationUserId.residence.push(ResidenceId);
      await OrganaizationUserId.save();
    }
    await Residence.save();

    res.status(200).json({ message: "Residence Added Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Mongoose Connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(4000, () => {
  console.log("Listing on port 4000");
});
