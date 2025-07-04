// import React from 'react';
// import { AboutDataItem } from '../../../store/AboutData';

// interface AboutProps {
//   data: AboutDataItem;
// }

// const About: React.FC<AboutProps> = ({ data }) => {
//   return (
//     <section className="w-full bg-[#fffbf3] py-16 px-4 sm:px-6 md:px-8 font-sans h-[500px]">
//       <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
//         <div className="lg:w-1/3">
//           <h2 className="text-xl text-gray-600 font-semibold">(ABOUT US)</h2>
//         </div>

        
//         <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10">
//           {data.map((item, idx) => (
//             <div key={idx} className="text-left">
//               <h3 className="text-2xl sm:text-3xl text-black">{item.title}</h3>
//               <p className="text-5xl sm:text-6xl text-black mt-2">{item.value}</p>
//               <p className="mt-4 text-black text-base sm:text-lg leading-relaxed">
//                 {item.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;
// src/components/About.tsx
import React from 'react';
import{ AboutDataItem}  from '../../../store/AboutData';

interface AboutProps {
  data: AboutDataItem[];
}

const About: React.FC<AboutProps> = ({ data }) => (
  <section className="w-full bg-[#fffbf3] mt-12 px-4 sm:px-6 md:px-6 font-sans h-auto">
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
      <div className="lg:w-1/3">
        <h2 className="text-xl text-gray-600 font-semibold">(ABOUT US)</h2>
      </div>
      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10">
        {data.map((item, idx) => (
          <div key={idx} className="text-left">
            <h3 className="text-2xl sm:text-3xl text-black">{item.title}</h3>
            <p className="text-5xl sm:text-6xl text-black mt-2">
              {item.numericValue}
            </p>
            <p className="mt-4 text-black text-base sm:text-lg leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;

