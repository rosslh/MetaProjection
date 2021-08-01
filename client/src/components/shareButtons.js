import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} from "react-share";
import {
  FaRedditAlien,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaShareSquare,
} from "react-icons/fa";
import { useStaticQuery, graphql } from "gatsby";

const ShareButtons = ({ page, title, visible }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            url
          }
        }
      }
    `
  );

  const shareUrl = `${site.siteMetadata.url}${page}`;
  const fullTitle = `${title} | ${site.siteMetadata.title}`;

  const share = () =>
    navigator.share({
      url: shareUrl,
      text: site.siteMetadata.description,
      title: fullTitle,
    });

  if (typeof navigator !== "undefined" && navigator && navigator.share) {
    return (
      <button
        css={css`
          visibility: ${visible ? "visible" : "hidden"}
          margin-top: 1.5rem;
          font-size: 0.9rem;
          line-height: 2rem;
          padding: 0 1rem;
          border-radius: 4px;
          border: none;
          color: white;
          background-color: #950451;
          font-weight: bold;
          box-sizing: content-box;
          cursor: pointer;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          :hover {
            opacity: 0.9;
          }
          svg {
            margin-right: 0.4rem;
            font-size: 0.9rem;
          }
        `}
        onClick={share}
      >
        <FaShareSquare />
        Share
      </button>
    );
  } else {
    // TODO: why doesn't wrapper CSS load on production
    return (
          <div css={css`
            visibility: ${visible ? "visible" : "hidden"}
            display: flex !important;
            align-items: center !important;
            padding-top: 1.5rem !important;
          `}>
            <span
              css={css`
                padding-right: 0.4rem;
              `}
            >
              Share:
            </span>
            <FacebookShareButton
              css={css`
               background-color: #3B579D;
              `}
              url={shareUrl}
              quote={fullTitle}
            >
              <FaFacebookF />
            </FacebookShareButton>
            <TwitterShareButton
              css={css`
               background-color: #2CAAE1;
              `}
              url={shareUrl}
              title={`${site.siteMetadata.description}. Take a look!`}
            >
              <FaTwitter />
            </TwitterShareButton>
            <RedditShareButton
              css={css`
              background-color: #FF4500 !important;
            `}
              title={fullTitle}
              url={shareUrl}
            >
              <FaRedditAlien />
            </RedditShareButton>
            <LinkedinShareButton
              css={css`
              background-color: #007BB6;
              `}
              url={shareUrl}
            >
              <FaLinkedinIn />
            </LinkedinShareButton>
          </div>
        )
      }
  }

ShareButtons.propTypes = {
  page: PropTypes.string,
  title: PropTypes.string,
};

export default ShareButtons;
