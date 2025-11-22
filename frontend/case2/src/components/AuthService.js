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
            const data = response.json();
            return { success: true, data };
        }
        else{
            const errorData = response.json().catch(() => ({}));
            return{success: false, code: response.status}
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
            const data = response.json();
            return { success: true, data };
        }
        else{
            const errorData = response.json().catch(() => ({}));
            return{success: false, code: response.status}
        }
    })
    .catch((error) => console.error(error))
    return response;
}

export { login, register }