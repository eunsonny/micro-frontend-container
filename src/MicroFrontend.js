import React, { useEffect } from "react";

export default function MicroFrontend(props) {
  useEffect(() => {
    const { name, host } = props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      console.log('??')
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
    .then(res => res.json())
    .then(manifest => {
      const script = document.createElement('script');
      script.id = scriptId;
      script.crossOrigin = '';
      script.src = `${host}${manifest['main.js']}`;
      script.onload = this.renderMicroFrontend;
      document.head.appendChild(script);
    });

    return () => {
      window[`unmount${name}`](`${name}-container`);
    }
  })

  const renderMicroFrontend = () => {
    console.log('renderMicroFrontend')
    const { name, window, history } = props;
    window[`render${name}`](`${name}-container`, history);
  }

  return (
    <main id={`${props.name}-container`} />
  )
}
