const express = require("express");
const cors = require("cors");
const { connection } = require("./utils/connection");
const dotenv = require("dotenv");

//@import router
const DonationRouter = require("./routes/donations");
const UserRouter = require("./routes/users");
const OrganizationRouter = require("./routes/organizations");
const BlogRouter = require("./routes/blogs");
const EventRouter = require("./routes/event");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/donation", DonationRouter);
app.use("/api/user", UserRouter);
app.use("/api/organization", OrganizationRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/event", EventRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
  connection();
});
