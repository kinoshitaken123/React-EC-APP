export const SUGN_IN = "SIGN_IN";
export const signInAction = (useState) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            uid: userState.uid,
            username: userState.username
        }
    }
};

export const SUGN_OUT = "SIGN_OUT";
export const signInAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            uid: "",
            username: ""
        }
    }
};