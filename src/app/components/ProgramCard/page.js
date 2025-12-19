// import Image from 'next/image';
// import Link from 'next/link';

// export default function ProgramCard({ title, image, href }) {
//     return (
//         <Link href={href} className="flex flex-col">
//             <div className="relative overflow-hidden h-80">
//                 <Image
//                     src={image}
//                     alt={title}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//                 />
//                 {/* // <img
//                 //     src={image}
//                 //     alt={title} */}
//             </div>
//             <div className="bg-orange-400 py-4">
//                 <h3 className="text-center text-black font-semibold">{title}</h3>
//             </div>
//         </Link>
//     );
// }

import Image from 'next/image';
import Link from 'next/link';

export default function ProgramCard({ title = "", image = "", href = "" }) {
    return (
        <Link href={href} className="flex flex-col">
            <div className="relative overflow-hidden h-80">
                <Image
                    src={image}
                    alt={title}
                    width={640}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
            </div>
            <div className="bg-orange-400 py-4">
                <h3 className="text-center text-black font-semibold">{title}</h3>
            </div>
        </Link>
    );
}