import * as React from 'react'
import Header from '../components/Headers'
import Carousel from '../components/Carousel'
const posts = [
  {
    id: 1,
    title: 'News Update',
    description: 'Check out the latest news in our organization.',
    image: 'https://icladdis.com/images/icl4.jpg',
    pdf: 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
  },
  {
    id: 2,
    title: 'Job Opening',
    description: 'We are hiring! Apply now.',
    image: 'https://img.freepik.com/free-vector/flat-employment-agency-search-new-employees-hire_88138-802.jpg?semt=ais_hybrid',
    pdf: 'https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf',
  },
];
function Home() {
  return (
    <>
      <Header></Header>
      <div className='w-full max-w-7xl flex flex-col lg:flex-row gap-6 items-center justify-between mt-25

      '>
      <Carousel  posts={posts} ></Carousel>
      </div>
    {/* <MiniDrawer></MiniDrawer> */}
    </>

  )
}
export default Home
