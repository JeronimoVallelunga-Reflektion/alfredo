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

let onChange = null;
const requests = [];

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
      const promisedResponse = response.clone();
      if (url.match(/.[js|css]$/)) {
        return promisedResponse;
      }

      const timingStop = performance.now();
      const time = timingStop - timingStart;


      response.text().then((body) => {
        const entry = {
          startTime,
          time,
          method: requestMethod,
          request,
          response: {
            ...response,
            body
          },
        };

        requests.push(entry);
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
    return requests;
  },

  serialize() {
    const entries = requests.map((data) => {
      return {
        startedDateTime: new Date(data.startTime).toISOString(),
        time: data.time,
        request: {
          method: data.request.method,
          url: data.request.url,
          cookies: [],
          headers: buildHarHeaders(data.request.headers),
          httpVersion: 'HTTP/2.0',
          queryString: [],
          headersSize: -1,
          bodySize: -1,
          ...requestMethodProperties(data.request.method, data.request),
        },
        response: {
          status: data.response.status,
          statusText: data.response.statusText,
          httpVersion: 'HTTP/2.0',
          cookies: [],
          headers: buildHarHeaders(data.response.headers),
          _transferSize: data.response.body.length,
          content: {
            size: data.response.body.length,
            text: data.response.body,
          },
          redirectURL: '',
          headersSize: -1,
          bodySize: -1
        },
        cache: {}
      };
    });

    // const [{ startedDateTime } = {}] = entries;
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
    //     entries,
    //   }
    // };

    return entries;
  },

  onChange(callback) {
    onChange = callback;
  }
};
