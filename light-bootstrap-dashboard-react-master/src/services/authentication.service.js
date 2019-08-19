import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
	console.log("auth service username:"+username);
	console.log("pass:"+password);
	
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
		           "userName": username,
                   "password": password
		})
    };

    return fetch('http://messaging-loadbalancer-2023474556.us-west-2.elb.amazonaws.com:3306/login', requestOptions)
        .then(function(response){
			console.log("user fetched:"+JSON.stringify(response.headers));
			
			let user='';
			for (var pair of response.headers.entries()) {
                console.log(pair[0]+ ': '+ pair[1]);
				if(pair[0]=='authheader')
					user = pair[1];
            }
			
			console.log("user:"+user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', user);
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}