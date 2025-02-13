import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import ClockDisplay from '../components/ClockDisplay';

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

function TvNoticeDisplay() {
  return (
    <div>
      <section className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 items-center justify-between mt-6">
        {/* Job Opening Card */}
        <Carousel posts={posts} />

        {/* Clock Display */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <ClockDisplay />
        </div>
      </section>
    </div>
  );
}

export default TvNoticeDisplay;
