import React from "react";
// import Rnd from 'react-rnd';
import { Rnd } from "react-rnd";

const Box = () => (
  <>
    <div
      className="box"
      style={{
        margin: 0,
        height: "200px",
        width: "400px",
        paddingBottom: "40px",
        border: "1px solid black",
      }}
    >
      <article className="media">
        {/* <div className="media-left">
        <figure className="image is-64x64">
          <img
            src="https://avatars1.githubusercontent.com/u/10220449?v=3&s=460"
            draggable="false"
            alt="github avatar"
          />
        </figure>
      </div> */}
        <div className="media-content">
          <div className="content">
            <p>
              <strong>bokuweb</strong> <small>@bokuweb17</small>{" "}
              <small>31m</small>
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              efficitur sit amet massa fringilla egestas. Nullam condimentum
              luctus turpis.
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-reply" />
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-retweet" />
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-heart" />
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  </>
);

export default () => (
  <div
    style={{
      width: "800px",
      height: "400px",
      border: "1px solid black",
    }}
  >
    {[
      { nombre: "mesa 1", id: 1 },
      { nombre: "mesa 2", id: 2 },
    ].map((mesa, i) => {
      return (
        <Rnd
          bounds="parent"
          style={{
            background: "#eee",
            padding: "20px",
            width: "100%",
            height: "100%",
          }}
          default={{
            width: 200,
            height: 200,
            x: 100 * i,
            y: 100 * i,
          }}
        >
          {mesa.nombre}
        </Rnd>
      );
    })}
  </div>
);

// export default AgregarCajaPage;
