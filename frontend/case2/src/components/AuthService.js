async function register(email, password){
    const response = await fetch('https://localhost:7194/api/Auth/register', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.status == 200){
            return response.json();
        }
        else{
            return null;
        }
    })   
}

async function login(email, password){
    const response = await fetch('https://localhost:7194/api/Auth/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.status == 200){
            return response.json();
        }
        else{
            return null;
        }
    })
    return response;
}

export { login, register }