import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import { MDXProvider } from '@mdx-js/react';
import MDX from '@mdx-js/runtime';
import { Heading, Text } from '@chakra-ui/react';

type PostProps = {
  mdx: string;
};

const baseComponents = {
  h1: (props) => (
    <Heading as="h1" size="lg">
      {props.children}
    </Heading>
  ),
  p: (props) => (
    <Text as="p" size="md">
      {props.children}
    </Text>
  ),
};

const Post: React.FC<PostProps> = (props) => {
  const adjustedComponents = {
    ...baseComponents,
    SomeComplicatedInteractiveGraph: () => {
      return <div>{JSON.stringify([{ x: 2, y: 3 }])}</div>;
    },
  };

  return (
    <MDXProvider components={adjustedComponents}>
      <MDX>{props.mdx}</MDX>
    </MDXProvider>
  );
};

export const getStaticProps: GetStaticProps = async (props) => {
  const folderPath = path.join(process.cwd(), 'content');
  const filePath = path.join(folderPath, `${props.params.post}.mdx`);
  const rawFileSource = fs.readFileSync(filePath);

  const { content, data } = matter(rawFileSource);

  return {
    props: {
      mdx: content,
      metaInformation: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { post: 'some-random-path' } },
      { params: { post: 'alternative-random-path' } },
    ],
    fallback: false,
  };
};

export default Post;
