import * as firebaseService from "./firebase_service";

export const THROTTLE_LIMIT = 50;

let countGood = 0;

export function updateMouseMovementWithLimit(inThrottle, setInThrottle, e) {
  if (!inThrottle) {
    setInThrottle(true);
    // countGood++;
    // console.log("Good: ", countGood);
    firebaseService.updatesCursorPosition({ x: e.clientX, y: e.clientY });
    setTimeout(() => {
      setInThrottle(false);
    }, THROTTLE_LIMIT);
  }
}

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
