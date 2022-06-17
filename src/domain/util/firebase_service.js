import firebase from "../../config/firebase/firebase";
import { randomEmoji } from "./random_emoji";
import { getCollectionPath } from "../../config/env_config";

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const listenToUserCursors = (users, setUsers) => {
  function updateUsers(snap) {
    setUsers((prevData) => {
      const newData = { ...prevData };
      newData[snap.key] = { ...snap.val() };
      return newData;
    });
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let userId = user.uid;

      firebase
        .database()
        .ref()
        .child(getCollectionPath())
        .once("value", (snap) => {
          snap.forEach((item) => {
            if (item.key === userId) {
              return;
            }
            updateUsers(item);
          });
        });

      // Add new user to DB using their user id
      firebase
        .database()
        .ref()
        .child(getCollectionPath())
        .on("child_added", (snap) => {
          if (snap.key === userId) {
            return;
          }
          updateUsers(snap);
        });

      // Listen to any currently active users' cursor
      firebase
        .database()
        .ref()
        .child(getCollectionPath())
        .on("child_changed", (snap) => {
          if (snap.key === userId) {
            return;
          }

          updateUsers(snap);
        });

      // Remove a user's record when they close/ exist out of the page
      firebase
        .database()
        .ref()
        .child(getCollectionPath())
        .on("child_removed", (snap) => {
          setUsers((prevCursors) => {
            const copiedCursors = { ...prevCursors };
            const { [userId]: cursorToDelete, ...restCursors } = copiedCursors;
            return restCursors;
          });
        });
    }
  });

  // Sign in any new user anonymously
  firebase.auth().signInAnonymously();
};

export const updatesCursorPosition = ({ x, y }) => {
  if (!getCurrentUser() || !getCurrentUser().uid) {
    return;
  }
  let currUserID = getCurrentUser().uid;

  firebase
    .database()
    .ref()
    .child(getCollectionPath())
    .child(currUserID)
    .update({ x, y });

  firebase
    .database()
    .ref()
    .child(getCollectionPath())
    .child(currUserID)
    .onDisconnect()
    .remove();
};

export const updatesCursorClicked = (setEmoji) => {
  if (!getCurrentUser() || !getCurrentUser().uid) {
    return;
  }

  let currUserID = getCurrentUser().uid;
  let emoji = randomEmoji();
  setEmoji(emoji);

  firebase
    .database()
    .ref()
    .child(getCollectionPath())
    .child(currUserID)
    .update({ clicked: true, emoji: emoji });

  setTimeout(() => {
    firebase
      .database()
      .ref()
      .child(getCollectionPath())
      .child(currUserID)
      .update({ clicked: false, emoji: "" });
    setEmoji("");
  }, 1000);
};

export const disconnect = () => {
  firebase.database().ref().child(getCollectionPath()).off();
};
