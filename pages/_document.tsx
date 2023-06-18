import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en" className='mb-4 mx-8'>
      <Head>
        <link rel='shortcut icon' sizes="196x196" href='/IRU-CIRCLE.svg' />
        <meta name="p:domain_verify" content="dd21365f117c2771a52685cbcce242a1" />
        <title>Iru Studios | Embracing Simplicity: Minimalistic Web and Brand Design Innovations</title>
        <meta
          name="description"
          content="Transform your brand with Iru Studios, a leading design agency specializing in minimalistic web and brand design solutions. We create sleek and contemporary designs that resonate with modern businesses, conveying simplicity and sophistication. Our innovative approach combines clean aesthetics, intuitive user experiences, and strategic branding to elevate your online presence. Discover how our minimal design philosophy can captivate your audience and drive your business forward." />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w, d, t, h, s, n) {
                w.FlodeskObject = n;
                var fn = function() {
                  (w[n].q = w[n].q || []).push(arguments);
                };
                w[n] = w[n] || fn;
                var f = d.getElementsByTagName(t)[0];
                var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
                var sm = d.createElement(t);
                sm.async = true;
                sm.type = 'module';
                sm.src = h + s + '.mjs' + v;
                f.parentNode.insertBefore(sm, f);
                var sn = d.createElement(t);
                sn.async = true;
                sn.noModule = true;
                sn.src = h + s + '.js' + v;
                f.parentNode.insertBefore(sn, f);
              })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');

              window.fd('form', {
                formId: '64881524fbd770b7b2026429'
              });
            `
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `  (function(w, d, t, h, s, n) {
              w.FlodeskObject = n;
              var fn = function() {
                (w[n].q = w[n].q || []).push(arguments);
              };
              w[n] = w[n] || fn;
              var f = d.getElementsByTagName(t)[0];
              var v = '?v=' + Math.floor(new Date().getTime() / (120 * 1000)) * 60;
              var sm = d.createElement(t);
              sm.async = true;
              sm.type = 'module';
              sm.src = h + s + '.mjs' + v;
              f.parentNode.insertBefore(sm, f);
              var sn = d.createElement(t);
              sn.async = true;
              sn.noModule = true;
              sn.src = h + s + '.js' + v;
              f.parentNode.insertBefore(sn, f);
            })(window, document, 'script', 'https://assets.flodesk.com', '/universal', 'fd');`
          }}
        />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}