import React from "react";
import { StyledSection } from "./StyledSection";
import CardVideo from "./CardVideo";

export default function Section() {
  return (
    <StyledSection>
      <CardVideo img="https://picsum.photos/400/200?a=1" title="Video 1" />
      <CardVideo img="https://picsum.photos/400/200?a=2" title="Video 2" />
      <CardVideo img="https://picsum.photos/400/200?a=4" title="Video 3" />
      <CardVideo img="https://picsum.photos/400/200?a=5" title="Video 4" />
    </StyledSection>
  );
}
