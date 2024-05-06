// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");;
const firebaseConfig = {
    apiKey: "AIzaSyCq9K0cFvgrYnKQWpFvfn0UD32TediDW_s",
    authDomain: "politicians-of-india-cddc0.firebaseapp.com",
    projectId: "politicians-of-india-cddc0",
    storageBucket: "politicians-of-india-cddc0.appspot.com",
    messagingSenderId: "202603457478",
    appId: "1:202603457478:web:8e0928b430cb8ee4fde0c7",
    measurementId: "G-G9JW6ENMNZ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    try {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            data: payload?.data
        };
        self.registration.showNotification(notificationTitle, notificationOptions);
    } catch (error) {
        console.error(error)
    }
});


const ProtectedRoutes = {
    user: "/user",
    followers: "/user/profile/followers",
    following: "/user/profile/following",
    userProfile: "/user/profile",
    ticket: "/user/ticket",
    feed: "/user/profile/feed",
};



self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const notification = event.notification;
    const data = notification.data;
    const type = data?.type;
    const dev = false;
    const url = dev ? "http://localhost:3000" : "https://leader.politicianofindia.com:4007"
    let urlToOpen = ''
    let endurl = ""
    let urlparams = ''
    let notitype = ''
    try {
        if (type) {
            notitype = "?type=" + type
            if (type == "new_post" || type == "development" || type == "agenda" || type == "poll" || type == "post_timeline") {
                if (type == "post_timeline") {
                    urlparams = "&referenceid=" + data?.referenceid + "&leaderid=" + data?.leaderid
                    urlToOpen = ProtectedRoutes.user
                } else {
                    urlToOpen = ProtectedRoutes.user
                }
            }
            if (type == "like_post" || type == "comment_post") {
                urlToOpen = ProtectedRoutes.feed
                urlparams = "&referenceid=" + data?.referenceid
            }
            if (type == "follow_leader" || type == "unfollow_leader") {
                urlToOpen = ProtectedRoutes.followers
            }
            if (type == "new_letter" || type == "thumbs_down" || type == "thumbs_up" || type == "letter_reminder" || type == "unopen_letter") {
                urlToOpen = ProtectedRoutes.ticket
                urlparams = "&referenceid=" + data?.referenceid
            }
            if (urlparams) {
                endurl = data?.notificationid ? urlToOpen + notitype + urlparams + "&notificationid=" + data?.notificationid : urlToOpen + notitype + urlparams
            } else {
                endurl = data?.notificationid ? urlToOpen + notitype + "&notificationid=" + data?.notificationid : urlToOpen + notitype
            }
            event.waitUntil(clients.openWindow(url + endurl + "&isnotification=" + "unread"))
        } else {
            if (data?.notificationid) {
                endurl = urlToOpen + "?notificationid=" + data?.notificationid + "&isnotification=" + "unread"
            } else {
                endurl = urlToOpen + "?isnotification=" + "unread"
            }
            event.waitUntil(clients.openWindow(url + endurl));
        }
    } catch (error) {
        event.waitUntil(clients.openWindow(url + urlToOpen + "?isnotification=" + "unread"));
    }
    event.notification.close();
});
