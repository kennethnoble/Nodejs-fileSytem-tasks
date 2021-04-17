const fs = require('fs');
const http = require('http');

const band = {
  hostname: "jsonplaceholder.typicode.com",
  path: "/posts",
  method: "GET"
};

let bypass = "";

const req = http.request(band, res => {
  res.setEncoding("utf8");
  res.on("data", data => bypass += data);
  res.on("end", () => {
      console.log("End data transfer\n");
      
      const dirname = __dirname + "/result";
      // create a directory
      fs.mkdir(dirname, { recursive: false }, err => {
        if(err) {
          console.log(err);
        }

        // create file
        fs.writeFile(dirname + "/posts.json", bypass , err => {
          if(err) console.log(err);
          console.log(" data saved in  `result/posts.json`");
        });
      });
    }
  );
});

req.on("error", err => console.log);
req.end();