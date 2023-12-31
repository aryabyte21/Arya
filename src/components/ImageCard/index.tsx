import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Group,
  createStyles,
  getStylesRef,
  rem,
  Loader,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: rem(480),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover .${getStylesRef("image")}`]: {
      transform: "scale(1.03)",
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef("image"),
    backgroundSize: "cover",
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .65) 90%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));

interface ImageCardProps {
  link: string;
  image: string;
  title: string;
  author: string;
}

export function ImageCard({ image, title, author, link }: ImageCardProps) {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
    };
    img.src = image;
  }, [image]);

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href={link}
      target="_blank"
    >
      {isLoading ? (
        <div className={classes.content}>
          <Loader
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
            size={60}
          />
        </div>
      ) : (
        <>
          <div
            className={classes.image}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={classes.overlay} />

          <div className={classes.content}>
            <div>
              <Text size="lg" className={classes.title} weight={500}>
                {title}
              </Text>

              <Group position="apart" spacing="xs">
                <Text size="sm" className={classes.author}>
                  {author}
                </Text>

                <Group spacing="lg"></Group>
              </Group>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
