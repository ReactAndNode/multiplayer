import React, { useState, useEffect } from "react";
import Cursor from "./Cursor";
import * as firebaseService from "../util/firebase_service";
import { getCurrentUser } from "../util/firebase_service";

const MultiPlayerInteractiveView = () => {
  const [isUserActive, setIsUserActive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [otherActiveUsers, setOtherActiveUsers] = useState({});
  const [currCursorPosition, setCurrCursorPosition] = useState({
    x: 0,
    y: 0,
  });

  const onMouseMove = (e) => {
    if (!isUserActive) {
      setIsUserActive(true);
    }

    try {
      firebaseService.updatesCursorPosition({ x: e.clientX, y: e.clientY });

      setCurrCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onMouseClick = (e) => {
    if (!isClicking) {
      setIsClicking(true);
      firebaseService.updatesCursorClicked(setEmoji);
      setTimeout(() => setIsClicking(false), 1000);
    }
  };

  useEffect(() => {
    firebaseService.listenToUserCursors(otherActiveUsers, setOtherActiveUsers);

    return () => {
      firebaseService.disconnect();
    };
  }, []);

  return (
    <div
      onMouseEnter={() => setIsUserActive(true)}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseClick}
      onMouseLeave={() => setIsUserActive(false)}
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      {Object.values(otherActiveUsers).map((cursor) => (
        <Cursor
          key={cursor.id}
          x={cursor.x}
          y={cursor.y}
          isClicking={cursor.clicked}
          emoji={cursor.emoji}
        />
      ))}
      {isUserActive && getCurrentUser().uid && (
        <Cursor
          id={getCurrentUser().uid || ""}
          x={currCursorPosition.x}
          y={currCursorPosition.y}
          isClicking={isClicking}
          emoji={emoji}
        />
      )}
    </div>
  );
};

export default MultiPlayerInteractiveView;
