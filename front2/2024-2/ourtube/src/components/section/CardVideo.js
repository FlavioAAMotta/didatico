import React from "react";

export default function CardVideo( props ) {
  return (
    <article>
      <img src={props.img} alt="video" />
      <h3>{props.title}</h3>
    </article>
  );
}