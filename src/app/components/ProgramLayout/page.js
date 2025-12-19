import ProgramCard from "@/src/app/components/ProgramCard/page";
import Image from "next/image";

export default function ProgramLayout({ title, description, programs }) {
    return (
        <div className="relative">
            <div className="relative h-[400px] w-full">
                <div className="absolute inset-0 bg-black/50">
                    <div className="h-full flex items-center justify-center">
                        <h1 className="text-orange-700 text-6xl font-bold">{title}</h1>
                    </div>
                </div>
                <Image
                    width={640}
                    height={480}
                    src="/images/program-banner.jpg"
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container mx-auto px-4 py-16">
                <p className="text-center text-lg mb-16">{description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programs?.map((program, index) => (
                        <ProgramCard
                            key={index}
                            title={program.title}
                            image={program.image}
                            href={program.href}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}