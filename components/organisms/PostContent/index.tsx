import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { IPostProps } from 'types';
import * as S from './style';

export function PostContent({ post }: { post: IPostProps }) {
  return (
    <S.Container>
      <ReactMarkdown
        children={post.content}
        components={{
          img: (image: any) => {
            console.log(image);
            return (
              <Image
                key={image.alt}
                src={`/images/posts/${post.slug}/${image.src}`}
                alt={image.alt}
                width={600}
                height={300}
              />
            );
          },
        }}
      />
    </S.Container>
  );
}

// <Image
//   src={`/images/posts/${post.slug}/${image.src}`}
//   alt={image.alt}
// width={600}
// height={300}
// />
