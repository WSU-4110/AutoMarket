import React from "react";
import "./components/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer_section_padding">
        <div className="sb_footer_links">
          <div className="sb_footer-links_div">
            <h4>For More Inquries</h4>
            <a href="#">
              <p>Link1</p>
            </a>
            <a href="#">
              <p>Link2</p>
            </a>
            <a href="#">
              <p>Link3</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Resources</h4>
            <a href="#">
              <p>Link1</p>
            </a>
            <a href="#">
              <p>Link2</p>
            </a>
            <a href="#">
              <p>Link3</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Other Information</h4>
            <a href="#">
              <p>Link1</p>
            </a>
            <a href="#">
              <p>Link2</p>
            </a>
            <a href="#">
              <p>Link3</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Company</h4>
            <a href="#">
              <p>Link1</p>
            </a>
            <a href="#">
              <p>Link2</p>
            </a>
            <a href="#">
              <p>Link3</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Contact</h4>
            <a href="#">
              <p>Link1</p>
            </a>
            <a href="#">
              <p>Link2</p>
            </a>
            <a href="#">
              <p>Link3</p>
            </a>
          </div>
        </div>
        <hr></hr>
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@{new Date().getFullYear()} AutoMarket. All right reserved. </p>
          </div>

          <div className="sb_footer-below-links">
            <a href="#">
              <div>
                <p>Terms and Conditions</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Other stuff</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
