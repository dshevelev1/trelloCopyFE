import React, {useEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";

function Main(props) {
  return <H1>hello</H1>
}

let root = createRoot(document.getElementById('root'));
root.render(<Main></Main>);
