
// // import Badge from '@/components/Badge';
// // import Button from '@/components/Button';
// // import { useRouter } from 'next/router';
// // import React from 'react';

// // export default function Card({ data, variant }) {
// //   const router = useRouter();

// //   const handleView = () => {
// //     const bookId = data?.id || data?._id;
// //     if (bookId) {
// //       router.push(`/books/${bookId}`);
// //     } else {
// //       console.warn("❌ Book ID is missing.");
// //     }
// //   };

// //   return (
// //     <div className="w-full book-grid p-2 bg-white card-shadow rounded-2xl">
// //       <div>
// //         <img
// //           src={data?.coverImage?.url || "/images/default-book.png"}
// //           alt="book-cover"
// //           className="rounded-lg h-[144px] object-cover w-full"
// //         />
// //       </div>
// //       <div className="w-full flex flex-wrap flex-col justify-between">
// //         <div>
// //           <Badge variant={variant} />
// //           <h2
// //             aria-label="Book Title"
// //             className="mt-3 mb-1 font-semibold text-start capitalize text-base"
// //           >
// //             {data.title}
// //           </h2>
// //           <h4
// //             aria-label="Author"
// //             className="text-start capitalize text-xs font-normal"
// //           >
// //             {data.author?.name || "Unknown Author"}
// //           </h4>
// //         </div>
// //         <Button variant="primary" onClick={handleView}>
// //           View
// //         </Button>
// //       </div>
// //     </div>
// //   );
// // }
// import Badge from '@/components/Badge';
// import Button from '@/components/Button';
// import { useRouter } from 'next/router';
// import React from 'react';

// export default function Card({ data, variant }) {
//   const router = useRouter();

//   const handleView = () => {
//     const bookId = data?.id || data?._id;
//     if (bookId) {
//       router.push(`/books/${bookId}`);
//     } else {
//       console.warn("❌ Book ID is missing.");
//     }
//   };

//   // ✅ Fallback to "pending" if variant not passed
//   const status = variant || data?.status || "pending";

//   return (
//     <div className="w-full book-grid p-2 bg-white card-shadow rounded-2xl">
//       <div>
//         <img
//           src={data?.coverImage?.url || "/images/default-book.png"}
//           alt="book-cover"
//           className="rounded-lg h-[144px] object-cover w-full"
//         />
//       </div>
//       <div className="w-full flex flex-wrap flex-col justify-between">
//         <div>
//           <Badge variant={status} />
//           <h2
//             aria-label="Book Title"
//             className="mt-3 mb-1 font-semibold text-start capitalize text-base"
//           >
//             {data.title}
//           </h2>
//           <h4
//             aria-label="Author"
//             className="text-start capitalize text-xs font-normal"
//           >
//             {data.author?.name || "Unknown Author"}
//           </h4>
//         </div>
//         <Button variant="primary" onClick={handleView}>
//           View
//         </Button>
//       </div>
//     </div>
//   );
// }
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import React from 'react';

export default function Card({ data, variant }) {
  const router = useRouter();

  const handleView = () => {
    const bookId = data?.id || data?._id;
    if (bookId) {
      router.push(`/books/${bookId}`);
    } else {
      console.warn("❌ Book ID is missing.");
    }
  };

  return (
    <div className="w-full min-h-[300px] bg-white card-shadow rounded-2xl flex flex-col justify-between p-3">
      <div>
        <img
          src={data?.coverImage?.url || "/images/default-book.png"}
          alt="book-cover"
          className="rounded-lg h-[144px] object-cover w-full"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow mt-2">
        <Badge variant={variant || data?.status} />

        <h2
          className="mt-2 mb-1 font-semibold text-sm text-start capitalize line-clamp-2 break-words"
          title={data.title}
        >
          {data.title}
        </h2>
        <h4 className="text-xs text-gray-500 text-start truncate">
          {data.author?.name || "Unknown Author"}
        </h4>
      </div>

      <Button variant="primary" onClick={handleView} className="mt-3">
        View
      </Button>
    </div>
  );
}