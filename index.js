import fetch from 'node-fetch';

import fs from 'fs';

const OUTPUT_PATH = './data/';

const download = (url, name) => { 
    console.log(url, name);
    fetch(url)
    .then(function (response) {
        switch (response.status) {
            case 404:
                throw response;
            default:
                return response.text();
        }
    })
    .then(function (template) {
        fs.writeFileSync(`${OUTPUT_PATH}${name}`, template, function(err) {
          if(err) {
              return console.log('Error', err);
          }
      }); 
    })
    .catch(function (response) {
        console.log('Not found', response.statusText);
    });
}

fs.readFile('index.txt', 'utf-8', (err, data) => {
    data.split('\n').forEach((url, index) => download(url, `${index + 1}.html`));
})
