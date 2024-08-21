import React from "react";
import styled from "styled-components";

const StyledMenuItem = styled.a`
    color: #fff;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    &:hover {
        color: #f00;
    }
`;

export default function MenuItem( props ) {
  return <StyledMenuItem href={props.href}>{props.texto}</StyledMenuItem>;
}
