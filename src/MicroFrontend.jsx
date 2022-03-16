import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MicroFrontend(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const { name, host } = props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
    .then(res => res.json())
    .then(manifest => {
      const script = document.createElement('script');
      script.id = scriptId;
      script.crossOrigin = '';
      script.src = `${host}${manifest['files']['main.js']}`;
      script.onload = renderMicroFrontend;
      document.head.appendChild(script);
    });

    return () => {
      window[`unmount${name}`](`${name}-container`);
    }
  }, [])

  const renderMicroFrontend = () => {
    const { name } = props;
    window[`render${name}`](`${name}-container`, navigate);
  }

  return (
    <main id={`${props.name}-container`} />
  )
}
