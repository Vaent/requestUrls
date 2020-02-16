const requestUrls = require('requestUrls');
const validJson = 'https://gist.githubusercontent.com/Vaent/ae90b6a74c45e3402afdd474ff6e4ab3/raw/94f9eab4f06281cfede6ab09944ca2c44e376593/valid.json';
const invalidJson = 'https://gist.githubusercontent.com/Vaent/ae90b6a74c45e3402afdd474ff6e4ab3/raw/94f9eab4f06281cfede6ab09944ca2c44e376593/invalid.json';
const invalidUrl = 'invalidUrl';

{
  let test1 = 'Test using valid URL';
  let test2 = 'Test using valid and invalid URLs';

  requestUrls([validJson]).then(
    resolve => {
      if (resolve[validJson].example === 123) {
        console.log(test1 + ' passed');
      } else {
        console.log(test1 + ' failed - incorrect JSON received:');
        console.log(resolve[validJson]);
      }
    },
    reject => {
      console.log(test1 + ' failed - URL rejected');
      console.log(reject.failed[validJson]);
    }
  );

  requestUrls([validJson, invalidJson, invalidUrl]).then(
    resolve => {
      console.log(test2 + ' failed - should not be resolved');
      console.log(resolve);
    },
    reject => {
      if (Object.keys(reject.succeeded).length !== 1) {
        console.log(test2 + ' failed - there should be one successful result but received the following:');
        console.log(reject.succeeded);
      } else if (reject.failed[invalidJson].name !== 'SyntaxError') {
        console.log(test2 + ' failed - "invalidJson" URL should produce a syntax error but was the following:');
        console.log(reject.failed[invalidJson]);
      } else {
        console.log(test2 + ' passed');
      }
    }
  );
}
