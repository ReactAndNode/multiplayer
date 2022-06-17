import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";

const bounceAnimation = keyframes`${fadeInUp}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
  font-size: 50px;
`;

const Cursor = ({ x, y, isClicking, emoji }) => {
  const currX = useMotionValue(0);
  const currY = useMotionValue(0);

  const cursorStyle = {
    x: currX,
    y: currY,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#0C2D48",
    alignItems: "center",
  };

  useEffect(() => {
    currX.set(x);
  }, [x]);

  useEffect(() => {
    currY.set(y);
  }, [y]);

  return (
    <motion.div style={cursorStyle}>
      {isClicking && <BouncyDiv>{emoji}</BouncyDiv>}
    </motion.div>
  );
};

export default Cursor;
