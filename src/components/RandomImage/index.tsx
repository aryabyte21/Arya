import { useState, useEffect } from "react";
import { createStyles, Container, Paper, Button } from "@mantine/core";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconReload,
} from "@tabler/icons-react";
import { Helmet } from "react-helmet";
import { ImageCard } from "../ImageCard";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: theme.spacing.md,
  },
  content: {
    maxWidth: "800px",
    width: "100%",
    marginTop: theme.spacing.sm,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
    overflow: "hidden",
  },

  shareButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
}));

export const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { classes } = useStyles();

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = () => {
    const apiKey = "8eXHbKdvu5Xs6XLMJQRXyYe3srQg0CJYLxVa1WbnjNNCNkCF0CeQsKBf";
    const apiUrl = `https://api.pexels.com/v1/curated?page=${Math.floor(
      Math.random() * 100
    )}&per_page=1`;

    fetch(apiUrl, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.photos[0].src.original;
        setImageUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };

  const shareUrl = imageUrl;

  return (
    <div className={classes.root}>
      <Container
        className={classes.content}
        style={{ paddingLeft: "0px", paddingRight: "0px" }}
      >
        <Helmet>
          <meta property="og:title" content="Random Image" />
          <meta property="og:description" content="Generate random images" />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="600" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Random Image" />
          <meta name="twitter:description" content="Generate random images" />
          <meta name="twitter:image" content={imageUrl} />
        </Helmet>
        <Paper className={classes.imageWrapper}>
          {
            <ImageCard
              link={imageUrl}
              image={imageUrl}
              title={""}
              author={""}
            />
          }
        </Paper>
        <div className={classes.shareButtons}>
          <FacebookShareButton url={shareUrl}>
            <IconBrandFacebook />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <IconBrandTwitter />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl}>
            <IconBrandWhatsapp />
          </WhatsappShareButton>
          <Button
            variant="light"
            onClick={fetchRandomImage}
            leftIcon={<IconReload />}
            style={{ marginTop: "-0.5rem" }}
          >
            Refresh
          </Button>
        </div>
      </Container>
    </div>
  );
};
