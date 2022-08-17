import Head from 'next/head'
import { Categories, PostCard, PostWidget } from '../components';

const demoPosts = [
  { title: "Data Analysis with Python", excerpt: "Learn About Important Python Data Science Libraries" },
  { title: "React Testing", excerpt: "Learn React Testing" }
]

const Home = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>GraphQL CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
        {demoPosts.map((post, index) => <PostCard key={index} post={post}/>
        )}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;