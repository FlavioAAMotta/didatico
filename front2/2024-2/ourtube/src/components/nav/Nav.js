import React from "react";
import { StyledNav } from "./StyledNav";
import MenuItem from "./MenuItem";

export default function Nav() {
  return (
    <StyledNav>
      <MenuItem texto="Home" href="#" />
      <MenuItem texto="Vídeos" href="#" />
      <MenuItem texto="Playlists" href="#" />
    </StyledNav>
  );
}
