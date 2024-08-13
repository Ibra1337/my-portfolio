import React from 'react';

const Intro = () => (
  <section id="intro" className="container">
    <div className="row">
      <div className="col-4 col-12-medium">
        <section className="first">
          <i className="icon solid featured fa-cog"></i>
          <header>
            <h2>Engenering</h2>
          </header>
          <p>I’m passionate about building, creating, and designing innovative solutions.</p>
        </section>
      </div>
      <div className="col-4 col-12-medium">
        <section className="middle">
          <i className="icon solid featured alt fa-code"></i>
          <header>
            <h2>Coding</h2>
          </header>
          <p>I'm driven by the challenge of coding, crafting efficient and creative solutions. Each challenge is an oportunity to learn.</p>
        </section>
      </div>
      <div className="col-4 col-12-medium">
        <section className="last">
          <i className="icon solid featured fa-crosshairs"></i>
          <header>
            <h2>Goal driven</h2>
          </header>
          <p>Ready to take up any challenge that sdands on my way to achieve my goal.</p>
        </section>
      </div>
    </div>
    <footer>

    </footer>
  </section>
);

export default Intro;
