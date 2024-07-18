import {
  Project,
  Visual,
  Video,
  Posts,
  Introduce,
  OutroVisual,
} from '@/components/section';
import { IPostsProps } from '@/components/section/Posts';
import { Symbol } from '@/components/ui/symbol';
import { time } from 'console';

const getPostList = async (
  name: string,
  limit: number
): Promise<IPostsProps> => {
  const param = { name: name, limit: limit };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_API_URL}/api/post/list`,
    {
      method: 'post',
      body: JSON.stringify(param),
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) {
    throw new Error('data fetch failed');
  }
  console.log('revalidate');
  return await res.json();
};

export default async function Home() {
  const postData = await getPostList('kimbangul', 3);
  console.log(postData);

  return (
    <main>
      <Video />
      <div className='contents-wrap'>
        <Visual />
        <Introduce />
        <Project />
        <Posts posts={postData.posts} />
        <OutroVisual />
        <Symbol />
      </div>
    </main>
  );
}
