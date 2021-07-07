import firebase from "../../config/firebase";

const addUser = (data)=>{
    return (dispatch)=>{
        dispatch({ type: "ADDUSER", data:data })
    }
}

const facebook_login=()=>{
    return (dispatch) =>{
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            //var credential = result.credential;

            // The signed-in user info.
            var user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //var accessToken = credential.accessToken;
            
            const newuser = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                uid: user.uid,
                authprovide: "facebook",
                status: "login"
            }

            localStorage.setItem("login", JSON.stringify(newuser));

            firebase.database().ref("/").child(`user/${user.uid}`).set(newuser).then(()=>{
                //alert("user added in firebase database");
                //console.log("user added in firebase database");
                dispatch({ type: "LOGIN", data:newuser });

                let alertmessage = {
                    type: 'success',
                    message: 'Successfully logged in using facebook account!'
                }
                dispatch({ type: "ALERTS", data:alertmessage });
            });

            // console.log("credential==>",credential);
            // console.log("user==>",user);
            // console.log("accessToken==>",accessToken);
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            //var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;

            console.log("errorCode==>",errorCode);
            console.log("errorMessage==>",errorMessage);
            //console.log("email==>",email);
            //console.log("credential==>",credential);

            let alertmessage = {
                type: 'fail',
                message: 'Sorry! Unable to login using facebook account.'
            }
            dispatch({ type: "ALERTS", data:alertmessage });
        });
    }
}

const google_login = () =>{
    return (dispatch) =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            //var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            //var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            const newuser = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                uid: user.uid,
                authprovide: "google",
                status: "login"
            }

            localStorage.setItem("login", JSON.stringify(newuser));

            firebase.database().ref("/").child(`user/${user.uid}`).set(newuser).then(()=>{
                //alert("user added in firebase database");
                //console.log("user added in firebase database");
                dispatch({ type: "LOGIN", data:newuser });

                let alertmessage = {
                    type: 'success',
                    message: 'Successfully logged in using google account!'
                }
                dispatch({ type: "ALERTS", data:alertmessage });
            });

            // console.log("credential==>",credential);
            // console.log("user==>",user);
            // console.log("token==>",token);            
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            //var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;

            console.log("errorCode==>",errorCode);
            console.log("errorMessage==>",errorMessage);
            //console.log("email==>",email);
            //console.log("credential==>",credential);

            let alertmessage = {
                type: 'fail',
                message: 'Sorry! Unable to login using facebook account.'
            }
            dispatch({ type: "ALERTS", data:alertmessage });
        });
    }
}

const create_user = (email, password) =>{
    return (dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
            // Signed in 
            var user = userCredential.user;

            console.log("User created successfully!");
            console.log("user==>",user);

            const newuser = {
                name: user.email.substring(0, email.lastIndexOf("@")),
                email: user.email,
                profile: user.photoURL,
                uid: user.uid,
                authprovide: "emailpassword",
                status: "login"
            }

            localStorage.setItem("login", JSON.stringify(newuser));

            firebase.database().ref("/").child(`user/${user.uid}`).set(newuser).then(()=>{
                //alert("user added in firebase database");
                //console.log("user added in firebase database");
                dispatch({ type: "LOGIN", data:newuser });

                let alertmessage = {
                    type: 'success',
                    message: 'Account created successfully!'
                }
                dispatch({ type: "ALERTS", data:alertmessage });
            });            
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            //console.log("Sorry! Unable to create user.");
            console.log("errorCode==>",errorCode);
            console.log("errorMessage==>",errorMessage);

            if(errorCode === "auth/email-already-in-use")
            {
                //alert("Email already in use, please use different email");
                let alertmessage = {
                    type: 'fail',
                    message: 'Email already in use, please use different email'
                }
                dispatch({ type: "ALERTS", data:alertmessage });
            }
            else
            {
                let alertmessage = {
                    type: 'fail',
                    message: 'Sorry! Unable to create user.'
                }
                dispatch({ type: "ALERTS", data:alertmessage });
            }
        });
    }
}

const login_user = (email, password) =>{
    return (dispatch) =>{
        firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            const newuser = {
                name: user.displayName !== null ? user.displayName : user.email.substring(0, email.lastIndexOf("@")),
                email: user.email,
                profile: user.photoURL,
                uid: user.uid,
                authprovide: "emailpassword",
                status: "login"
            }

            //console.log("User logged in successfully!");
            //console.log("user==>",user);
            
            localStorage.setItem("login", JSON.stringify(newuser));

            firebase.database().ref("/").child(`user/${newuser.uid}`).update({'status': 'login'}).then(()=>{
                dispatch({ type: "LOGIN", data:newuser });

                let alertmessage = {
                    type: 'success',
                    message: 'User logged in successfully!'
                }
                dispatch({ type: "ALERTS", data:alertmessage });
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            //console.log("Sorry! Unable to login in user.");
            console.log("errorCode==>",errorCode);
            console.log("errorMessage==>",errorMessage);
            //alert("User with this name and password do not exists. Please create your account first.");

            let alertmessage = {
                type: 'fail',
                message: 'Sorry! Unable to login user.'
            }
            dispatch({ type: "ALERTS", data:alertmessage });
        });
    }
}

const get_users_friends = (uid) =>{
    return (dispatch) =>{
        //for production
        
        //new
        // let fetched_friends = [];
        // firebase.database().ref('/').child('user').on("child_added", (response)=>{
        //     fetched_friends.push(response.val());
        // })
        // if(fetched_friends.length > 0)
        //     dispatch({ type: "FRIENDS", data:fetched_friends });
        // else
        //     dispatch({ type: "FRIENDS", data:[] });
        // // let fetched_friends = [];
        // // firebase.database().ref('/').child('user').once('value',function(data){
        // //     var datareturned = data.val();

        // //     for(var item in datareturned)
        // //     {
        // //         fetched_friends.push(datareturned[item]);
        // //         //console.log(datareturned[item].name);
        // //     }
        // // })
        // // dispatch({ type: "FRIENDS", data:fetched_friends });


        // let fetched_friends = [];
        // firebase.database().ref('/').child('user').on("value", (response)=>{
        //     var datareturned = response.val();
        //     for(var item in datareturned)
        //     {
        //         fetched_friends.push(datareturned[item]);
        //     }
        //     if(fetched_friends.length > 0)
        //         dispatch({ type: "FRIENDS", data:fetched_friends });
        //     else
        //         dispatch({ type: "FRIENDS", data:[] });
        // })

        firebase.database().ref('/').child("user/" + uid + "/friend").on('value', (snapshot) => {
            var fetched_friends = [];
            snapshot.forEach(friend => {
                var friendid= friend.val();
                //console.log(friendid);
                firebase.database().ref('/').child("user/" + friendid).once('value').then((details) => {
                    //console.log(details.val());
                    fetched_friends = [...fetched_friends, details.val()];
                    //console.log("fetched_friends===>",fetched_friends);
                    //console.log("fetched_friends===>",fetched_friends.length);
                    // if(fetched_friends.lenght > 0)
                    //     console.log("fetched_friends.lenght==>", fetched_friends.lenght);
                    dispatch({ type: "FRIENDS", data:fetched_friends });
                });
            })
        });
        
        //new

        //old
        // firebase.database().ref('/').child('user').on("child_added", (response)=>{
        //     dispatch({ type: "FRIENDS", data:response.val() });
        // })
        //old
        //for production

        // //for testing
        // dispatch({ type: "FRIENDS", data:{} });
        // //for testing
    }
}

const search_friends = (query, uid) =>{
    return (dispatch) =>{
        let search_matched = [];
        firebase.database().ref('/').child(`user`).orderByChild('name').startAt(query).endAt(`${query}\uf8ff`).limitToFirst(20).once('value', (response)=>{
            var datareturned = response.val();
            for(var item in datareturned)
            {
                if(datareturned[item].uid !== uid)
                    search_matched.push(datareturned[item]);
            }

            if(search_matched.length > 0)
                dispatch({ type: "SEARCHFRIENDS", data:search_matched });
            else
                dispatch({ type: "SEARCHFRIENDS", data:[] });
        })
    }
}

const invite_friend = (payload) =>{
    return (dispatch) =>{
        let invitation_sent = false;
        firebase.database().ref("/").child(`invites`).push(payload).then(()=>{
             //dispatch({ type: "ALERTS", data:alertmessage });
            localStorage.setItem("invitation",JSON.stringify({type: "success", message: "Invitaion Send!" }));
            invitation_sent = true;
        }).catch(()=>{
            if(!invitation_sent){
                //dispatch({ type: "ALERTS", data:alertmessage });
                localStorage.setItem("invitation",JSON.stringify({type: "fail", message: "Unable to send invitaion! Please try later" }));
            }
        });
    }
}

const get_invitation = (uid)=>{
    return (dispatch) => {
        firebase.database().ref('/').child(`invites`).orderByChild('receiver').equalTo(uid).on("value", (response)=>{
            if(response.val() != null){
                let received_invitation = [];
                let datareturned = response.val();
                for(let item in datareturned)
                {
                    firebase.database().ref("/").child(`user/${datareturned[item]["sender"]}`).once("value", (userdetails)=>{
                        let details = userdetails.val();
                        received_invitation.push({
                            name: details.name,
                            email: details.email,
                            profile: details.profile,
                            uid: details.uid,
                            authprovide: details.authprovide,
                            status: details.status,
                            invitation_key: item
                        });

                        if(received_invitation.length > 0)
                            dispatch({ type: "RECEIVEDINVITATION", data: received_invitation });
                        // else
                        //     dispatch({ type: "RECEIVEDINVITATION", data: [] });
                    })
                }
            }
            else
            {
                dispatch({ type: "RECEIVEDINVITATION", data: [] });
            }

            // if(received_invitation.length > 0)
            //     dispatch({ type: "RECEIVEDINVITATION", data: received_invitation });//localStorage.setItem("received_invitation", JSON.stringify(received_invitation));
            // else
            //     dispatch({ type: "RECEIVEDINVITATION", data: [] });//localStorage.removeItem("received_invitation");
        })
        
        firebase.database().ref('/').child(`invites`).orderByChild('sender').equalTo(uid).on("value", (response)=>{            
            if(response.val() != null){
                let sent_invitation = [];
                let datareturned = response.val();
                for(let item in datareturned)
                {
                    firebase.database().ref("/").child(`user/${datareturned[item]["receiver"]}`).once("value", (userdetails)=>{
                        //sent_invitation.push(userdetails.val());
                        let details = userdetails.val();
                        sent_invitation.push({
                            name: details.name,
                            email: details.email,
                            profile: details.profile,
                            uid: details.uid,
                            authprovide: details.authprovide,
                            status: details.status,
                            invitation_key: item
                        });

                        if(sent_invitation.length > 0)
                            dispatch({ type: "SENTINVITATION", data: sent_invitation });
                        // else
                        //     dispatch({ type: "SENTINVITATION", data: [] });
                    })
                }
            }
            else
            {
                dispatch({ type: "SENTINVITATION", data: [] });
            }

            // if(sent_invitation.length > 0)
            //     dispatch({ type: "SENTINVITATION", data: sent_invitation });//localStorage.setItem("sent_invitation", JSON.stringify(sent_invitation));
            // else
            //     dispatch({ type: "SENTINVITATION", data: [] });//localStorage.removeItem("sent_invitation");
        })
    }
}

const accept_invitation = (inviter, invited, invitation_key) => {
    return (dispatch) => {
        //let inviter = "ho1d8gX5WrfEzfUifXLRaszPFRI3"; //who sent an invitation (ie, bilal)
        //let invited = "2PBwu7AkSIhaBIQ60m8zq9DyV9b2"; //who received an invitation (ie, wajahat)

        firebase.database().ref("/").child(`user/${inviter}/friend`).set([invited]).then(()=>{
            firebase.database().ref("/").child(`user/${invited}/friend`).set([inviter]).then(()=>{
                console.log("friend added");
                firebase.database().ref('/').child('invites/'+invitation_key).remove();
                //get_users_friends(invited);
            }).catch(()=>{
                console.log("unable to acccept invite");
            });
        }).catch(()=>{
            console.log("unable to acccept invite");
        });
    }
}

const reject_invitation = (invitation_key) => {
    return (dispatch) => {
        firebase.database().ref('/').child('invites/'+invitation_key).remove();
        //console.log(`invitation_key: ${invitation_key} removed`);
    }
}

const get_message = (chat_id, chattingwith) =>{
    return (dispatch) =>{
        
        firebase.database().ref('/').child(`chats/${chat_id}`).on("value", (response)=>{
            let this_user_chat = [];
            var datareturned = response.val();
            for(var item in datareturned)
            {
                this_user_chat.push(datareturned[item]);
            }

            if(this_user_chat.length > 0)
                dispatch({ type: "FRIENDSCHAT", data:{chat: this_user_chat, chattingwith: chattingwith} });
            else
                dispatch({ type: "FRIENDSCHAT", data:{chat: [], chattingwith: chattingwith} });
        })
    }
}

const send_message = (chat_id, newmessage) =>{
    return (dispatch) =>{
        firebase.database().ref("/").child(`chats/${chat_id}`).push(newmessage).then(()=>{            
            //dispatch({ type: "ALERTS", data:alertmessage });
        });
    }
}

const sign_out = (data) =>{
    return (dispatch) =>{
        // localStorage.removeItem("login");
        // firebase.auth().signOut().then(() => {
        //     firebase.database().ref("/").child(`user/${data.uid}`).update({'status': 'logout'}).then(()=>{
        //         //console.log("User signout successfully!");
        //         dispatch({ type: "LOGOUT" });
        //     });
        // }).catch((error) => {
        //     console.log("Sorry! Unable to signout.");
        // });

        
        firebase.database().ref("/").child(`user/${data.uid}`).update({'status': 'logout'}).then(()=>{
            firebase.auth().signOut().then(() => {
                localStorage.removeItem("login");
            }).catch((error) => {
                console.log("Sorry! Unable to signout.");
            });
            //console.log("User signout successfully!");
            dispatch({ type: "LOGOUT" });
        });
    }
}

const show_alert = (alerttype, alertmessage) =>{
    return (dispatch) =>{
        dispatch({ type: "REMOVEALERTS" });
        dispatch({ type: "ALERTS", data:{type: alerttype, message: alertmessage} });
    }
}

const remove_alert = () =>{
    return (dispatch) =>{
        dispatch({ type: "REMOVEALERTS" });
    }
}

export {
    addUser,
    facebook_login,
    google_login,
    create_user,
    login_user,
    sign_out,
    show_alert,
    remove_alert,
    get_users_friends,
    search_friends,
    invite_friend,
    get_invitation,
    accept_invitation,
    reject_invitation,
    get_message,
    send_message
}