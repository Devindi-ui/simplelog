//firebase configuarations
const firebaseConfig = {
    apiKey: "AIzaSyAOkD60nkzwTKoZKv1t95bPzx_eUdR0CZQ",
    authDomain: "simplelog-1430b.firebaseapp.com",
    databaseURL: "https://simplelog-1430b-default-rtdb.firebaseio.com",
    projectId: "simplelog-1430b",
    storageBucket: "simplelog-1430b.firebasestorage.app",
    messagingSenderId: "49007713019",
    appId: "1:49007713019:web:26e4f9e15c4fc7e98cae5e",
    measurementId: "G-M22SCG7FP4"
};

//initializing firebase
firebaseConfig.initializeApp(firebaseConfig);
const auth = firebaseConfig.auth();
const database = firebaseConfig.database();

//DOM Elements
const authContainer = document.getElementById('auth-container');
const loginForm = document.querySelector('.auth-form:first-of-type');
const signupForm = document.querySelector('.auth-form:last-of-type');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');

showSignup.addEventListener('click', () => {
    loginForm.style.display = 'none';
    setTimeout(() => {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        signupForm.style.display = 'block';
    },10);
});

showLogin.addEventListener('click', () => {
    signupForm.style.display = 'none';
    setTimeout(() => {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginForm.style.display = 'block';
    },10);
});

//signup function
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(email,password)
    .then((userCredential) => {
        //signed up
        const user = userCredential.user;

        //save additional
        database.ref('users/' + user.uid).set({
            name: name,
            email: email
        }).then(() => {
            console.log('User data saved!');
            authContainer.classList.add('hidden');
            document.getElementById('signup-name').value = '';
            document.getElementById('signup-email').value = '';
            document.getElementById('signup-password').value = '';
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    })
});

//login function
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        //signed in
        const user = userCredential.user;
        console.log('User logged in: ', user);
        authContainer.classList.add('hidden');
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
});

//logout function
