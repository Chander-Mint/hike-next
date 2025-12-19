const features = [
    {
        number: '01',
        title: 'EXPERT GUIDES',
        description:
            'Highly experienced and certified trekking guides with in-depth knowledge of trails, local culture, and safety protocols.',
    },
    {
        number: '02',
        title: 'SAFETY FIRST',
        description:
            'Robust safety measures, including first aid-trained staff, emergency evacuation plans, and top-notch trekking gear.',
    },
    {
        number: '03',
        title: 'TAILORED EXPERIENCES',
        description:
            'Personalized trekking itineraries crafted to match different skill levels, fitness capabilities, and individual preferences.',
    },
    {
        number: '04',
        title: 'LOCAL EXPERTISE',
        description:
            'Strong connections with local communities, offering authentic cultural experiences and eco-friendly practices.',
    },
    {
        number: '05',
        title: 'PREMIUM EQUIPMENT',
        description:
            'High-quality trekking equipment provided, ensuring comfort and safety during the journey.',
    },
    {
        number: '06',
        title: 'SUSTAINABLE TOURISM',
        description:
            'Committed to responsible trekking, supporting local economies, and minimizing environmental impact.',
    },
    {
        number: '07',
        title: 'AFFORDABLE PACKAGES',
        description:
            'Competitive pricing without compromising on quality, with options for budget, mid-range, and luxury experiences.',
    },
    {
        number: '08',
        title: 'SMALL GROUP SIZES',
        description:
            'Focus on small group adventures for a more personalized experience and better environmental impact management.',
    },
];

export default function WhyWithUs() {
    return (
        <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-orange-700">WHY WITH US</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 p-4 sm:p-6 rounded-md transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 sm:hover:scale-105 sm:hover:-translate-y-2"
                    >
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-orange-400 text-white font-bold w-7 h-7 sm:w-8 sm:h-8 text-base sm:text-lg flex items-center justify-center rounded-full">
                                {item.number}
                            </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold mb-2 text-black">{item.title}</h3>
                        <p className="text-sm sm:text-base text-gray-700">{item.description}</p>
                        <div className="mt-3 sm:mt-4 w-5 sm:w-6 h-1 bg-orange-400" />
                    </div>
                ))}
            </div>
        </section>
    );
}