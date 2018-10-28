const originalFetch = window.fetch;

function buildHarHeaders (headers) {
  return headers ? Object.keys(headers).map(function (key) {
    return {
      name: key,
      value: headers[key].toString()
    };
  }) : [];
}

function requestMethodProperties(method, request) {
  switch (method) {
    case 'POST':
      return {
        postData: request.body,
      };
    default:
      return {};
  }
}

const HAR = [];
let onChange = null;

const interceptedFetch = (url, fetchOptions = {}) => {
  const { method: requestMethod = 'GET' } = fetchOptions;

  const request = {
    url,
    ...fetchOptions,
    method: requestMethod,
  };

  const startTime = Date.now();
  const timingStart = performance.now();

  return originalFetch(url, fetchOptions)
    .catch((e) => {
      return Promise.reject(e);
    })
    .then((response) => {
      const timingStop = performance.now();
      const time = timingStop - timingStart;

      const promisedResponse = response.clone();

      response.text().then((body) => {
        const entry = {
          startedDateTime: new Date(startTime).toISOString(),
          time,
          request: {
            method: requestMethod,
            url: response.url,
            cookies: [],
            headers: buildHarHeaders(request.headers),
            httpVersion: 'HTTP/2.0',
            queryString: [],
            headersSize: -1,
            bodySize: -1,
            ...requestMethodProperties(requestMethod, fetchOptions),
          },
          response: {
            status: response.status,
            statusText: response.statusText,
            httpVersion: 'HTTP/2.0',
            cookies: [],
            headers: buildHarHeaders(response.headers),
            _transferSize: body.length,
            content: {
              size: body.length,
              mimeType: response.headers['content-type'],
              text: body,
            },
            redirectURL: '',
            headersSize: -1,
            bodySize: -1
          },
          cache: {}
        };

        HAR.push(entry);
      });

      return promisedResponse;
    })
};

export default {
  start() {
    global.fetch = interceptedFetch;
  },

  stop() {
    global.fetch = originalFetch;
  },

  get() {
    // const [{ startedDateTime } = {}] = HAR;
    // const har = {
    //   log: {
    //     version: '0.1',
    //     creator: { name: 'alfredo-network-tracker', version: '0.1' },
    //     pages: [{
    //       startedDateTime,
    //       id: 'alfredo-network-tracker',
    //       title: 'alfredo-network-tracker',
    //       pageTimings: { }
    //     }],
    //     entries: HAR,
    //   }
    // };

    return HAR;
  },

  onChange: function(callback) {
    onChange = callback;
  }    
};
