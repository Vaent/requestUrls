# requestUrls

A Node.js module which calls multiple URLs, parses returned data as JSON, and wraps the results in a Promise.

Example usage:

```
const requestUrls = require('requestUrls');
const urls = ['http://example.com/data.json', 'https://another-example.org/file.json'];

requestUrls(urls).then(
  resolve => {
    printResults(resolve);
  },
  reject => {
    printResults(reject.failed);
    printResults(reject.succeeded);
  }
);

function printResults(resultsObject) {
  Object.keys(resultsObject).forEach(url => {
    console.log(url + ' produced the following:');
    console.log(resultsObject[url]);
  });
};
```

## Resolution

If JSON is successfully fetched from all the URLs, the Promise is resolved. The result is an object of the following form:

```
{
  <url1> : <JSON returned by url1>
  [, <url2> : <JSON returned by url2> [...] ]
}
```

If data retrieval fails for any URL, the Promise is rejected. The result is an object of the following form:

```
{
  succeeded : <an object like the success result, containing only URLs for which JSON was retrieved> ,
  failed : <a similar object with the failed URLs as keys, where the associated values are errors>
}
```

This enables the use of a common processing route in both the resolve and reject scenarios for any JSON which was successfully retrieved, while also allowing the option of divergent handling which may be desired if for instance there are dependencies between the results expected.

## Limitations

The code uses Node's built-in 'http' and 'https' modules to fetch URLs. Specifying a protocol other than HTTP/HTTPS will cause that URL to fail, and no attempt is made to infer a protocol for any URL where none is specified (e.g. 'example.com').

No timeouts are set, so the Promise could stay pending indefinitely in some failure-type scenarios.
