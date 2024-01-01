import React from "react";

const Footer = () => {
  return (
    <div className="dark:bg-slate-800 pt-10 ">
      <footer className="footer p-10 bg-base-200 text-base-content xl:flex xl:justify-around ">
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <header className="footer-title">Newsletter</header>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button
                onClick={() =>
                  window.alert("You've been subscribed, Thank you.")
                }
                className="btn btn-primary join-item"
              >
                Subscribe
              </button>
            </div>
          </fieldset>
        </form>
      </footer>
    </div>
  );
};

export default Footer;
