import React from 'react';

const Blog = () => (
  <section>
    <header className="major">
      <h2>The Blog</h2>
    </header>
    <div className="row">
      {/* Repeat the following block for each blog post */}
      <div className="col-6 col-12-small">
        <section className="box">
          <a href="#" className="image featured"><img src="images/pic08.jpg" alt="" /></a>
          <header>
            <h3>Magna tempus consequat</h3>
            <p>Posted 45 minutes ago</p>
          </header>
          <p>Lorem ipsum dolor sit amet sit veroeros sed et blandit consequat sed veroeros lorem et blandit adipiscing feugiat phasellus tempus hendrerit, tortor vitae mattis tempor, sapien sem feugiat sapien, id suscipit magna felis nec elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos lorem ipsum dolor sit amet.</p>
          <footer>
            <ul className="actions">
              <li><a href="#" className="button icon solid fa-file-alt">Continue Reading</a></li>
              <li><a href="#" className="button alt icon solid fa-comment">33 comments</a></li>
            </ul>
          </footer>
        </section>
      </div>
      {/* Add more posts here */}
    </div>
  </section>
);

export default Blog;
