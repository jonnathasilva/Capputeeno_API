import { app } from "./setup.js";

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log("start server"));
