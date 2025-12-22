import https from 'https';

const url = "https://loremflickr.com/500/700/fashion,men?lock=1";

https.get(url, (res) => {
    console.log('Status:', res.statusCode);
    console.log('Redirect:', res.headers.location);
}).on('error', (e) => {
    console.error(e);
});
