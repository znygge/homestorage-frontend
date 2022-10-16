import React, { FC } from "react";
import styles from "./FruitFall.module.css";

interface FruitFallProps {}

const FruitFall: FC<FruitFallProps> = () => {
  const assets: Array<string> = [
    "/assets/apple.svg",
    "/assets/banana.svg",
    "/assets/carrot.svg",
    "/assets/grapes.svg",
    "/assets/melon.svg",
    "/assets/orange.svg",
    "/assets/pear.svg",
    "/assets/strawberry.svg",
  ];
  return (
    <div className={styles.FruitFall}>
      {Array.from({ length: 100 }, (_, i) => {
        const img = assets[Math.floor(Math.random() * assets.length)];
        const size = `${30 + Math.random() * 10}px`
        const styling: React.CSSProperties = {
          animationDelay: `${Math.random() * 2000 - 500}ms`,
          left: `${Math.random() * 100}%`,
          width: size,
          height: size,
          animationDuration: `${2000 - 500 * Math.random()}ms`,
          animationName:"fallingFruit"
        };
        return (
          <img
            key={i}
            className={styles.fruit}
            style={styling}
            src={img}
            alt="någon frukt"
          />
        );
      })}
    </div>
  );
};

export default FruitFall;
