const INITIAL_STATE = {
    //login: [],//for  production
    login: (localStorage.getItem("login") !== null && JSON.parse(localStorage.getItem("login")).status === "login") ? [JSON.parse(localStorage.getItem("login"))] : [],
    //for testing
    // login: [{
    //     name: "threadswajahat",
    //     email: "threadswajahat@gmail.com",
    //     profile: null,
    //     uid: "skU3zTU3ujcmbvc9X6iYCTUwodc2",
    //     authprovide: "emailpassword",
    //     status: "login"
    // }],
    //for testing
    alerts: [],
    friends: [], //for production    
    // //for testing
    // friends: [{authprovide: "google", email: "threads.ahsan@gmail.com", name: "Syed Ahsan", profile: "https://lh3.googleusercontent.com/a-/AOh14Gj89ZGl-klrigZXkWLW73aI_cg2rOCU35DS59Fs4A=s96-c", status: "logout", uid: "7H4aIJdaoVZO4wpltZv5Uay8cIi2"},
    // {authprovide: "facebook", email: "healthypartner23@gmail.com", name: "Healthypartner Petsnacks", profile: "https://graph.facebook.com/2767283250224463/picture", status: "logout", uid: "CGSuKWjOUNQDtYfCJvSRvqqVqno2"},
    // {authprovide: "emailpassword", email: "threads.bilal@gmail.com", name: "threads.bilal", status: "login", uid: "ho1d8gX5WrfEzfUifXLRaszPFRI3"},
    // {authprovide: "emailpassword", email: "threadswajahat@gmail.com", name: "threadswajahat", status: "login", uid: "skU3zTU3ujcmbvc9X6iYCTUwodc2"}]
    // //for testing
    chattingwith: [],
    searched_contact: [],
    sent_invitation: [],
    received_invitation: [],
    chat: []
}

export default (state, action) => {
    switch (action.type) {
        case "ADDUSER":
            return ({
                ...state, 
                users: [...state.users, action.data]
            });
        case "ALERTS":
                return ({
                    ...state, 
                    alerts: [action.data]
                });
        case "REMOVEALERTS":
            return ({
                ...state, 
                alerts: []
            });
        case "FRIENDS":
            return ({
                ...state, 
                //friends: state.friends//for testing
                //friends: [...state.friends, action.data] //old for production
                friends: action.data //newfor production
            });
        case "SEARCHFRIENDS":
            return ({
                ...state, 
                searched_contact: action.data //newfor production
            });
        case "FRIENDSCHAT":
            return ({
                ...state, 
                chattingwith: action.data.chattingwith,
                chat: action.data.chat
            });
        case "SENTINVITATION":
            return ({
                ...state, 
                sent_invitation: action.data
            });
        case "RECEIVEDINVITATION":
            return ({
                ...state, 
                received_invitation: action.data
            });
        case "LOGIN":
            return ({
                ...state, 
                login: [...state.login, action.data],
                friends: []
            });
        case "LOGOUT":
            return ({
                ...state, 
                login: [],
                friends: []
            });
        default:
            return state = INITIAL_STATE;
    }
}