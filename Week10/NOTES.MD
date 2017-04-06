## API calls
Try going on [omdbapi.com](omdbapi.com) and making api calls.

## Validation and Search
```javascript
function validate(text) {
    if (!text) {
        g.queryField.className = 'error';
    }
}

function search() {
    validate(g.queryField.value);
 }
```

## XMLHttpRequest()
```javascript
function requestMovie(title,type) {
    const r = new XMLHttpRequest();
    r.open('GET', buildURL(title,type), true);
    r.addEventListener('load', ()=> {
        if (r.status >= 200 && r.status < 300 || r.status === 304) {
            console.log('success');
        } else {
            console.log('error');
        }
        r.addEventListener('error', () => {
            displayMessage('Error', true);
        })
    })
}
```