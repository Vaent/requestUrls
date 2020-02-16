const requestUrls = require('requestUrls');
const validJson = 'https://gist.githubusercontent.com/Vaent/ae90b6a74c45e3402afdd474ff6e4ab3/raw/94f9eab4f06281cfede6ab09944ca2c44e376593/valid.json';
const invalidJson = 'https://gist.githubusercontent.com/Vaent/ae90b6a74c45e3402afdd474ff6e4ab3/raw/94f9eab4f06281cfede6ab09944ca2c44e376593/invalid.json';
const invalidUrl = 'https://github.com/Vaent/requestUrls/test/resource/nonexistent.json';

{
  console.log('Testing with valid URL...');
  requestUrls([validJson]).then(
    resolve => {
      if (resolve[validJson].example === 123) {
        console.log('Passed');
      } else {
        console.log('Failed - incorrect JSON received:');
        console.log(resolve[validJson]);
      }
    },
    reject => {
      console.log('Failed - URL rejected');
      console.log(reject.failed[validJson]);
    }
  );
}
