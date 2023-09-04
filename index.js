import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
  
  inquirer
  .prompt([
    {
      message: "Type URL Here",
      name: "URL",
    }
  ])
  .then((answers) => {
    var userURL = answers.URL;
    console.log(`Your URL: ${userURL}`);
    // 2. Use qr-image to turn user input into a QR Code
    var qr_svg = qr.image(userURL);
    qr_svg.pipe(fs.createWriteStream('yourQRcode.png'));
  
    // 3. Save the user input to a text file
    fs.writeFile("userURL.txt", userURL, err => {
      if (err) throw err;
      else {
        console.log("URL saved successfully!");
      }
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
      console.log("There was an error.")
    }
  });




