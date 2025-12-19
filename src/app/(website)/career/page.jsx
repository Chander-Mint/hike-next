'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const CareerPage = () => {
    const [jobListings, setJobListings] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const jobs = [
                {
                    id: 1,
                    title: "Trekking & Expedition Guides",
                    location: "Various locations across mountainous and remote regions",
                    jobType: "Freelancing",
                    description: [
                        "Lead groups on trekking, hiking, and climbing expeditions, ensuring their safety and well-being.",
                        "Educate adventurers on proper trekking techniques, safety protocols, and environmental",
                        "Promote Leave No Trace (LNT) principles and eco-friendly trekking",
                        "Provide emergency assistance and first aid when",
                        "Assist with trip planning, including route selection and risk",
                        "Maintain and inspect trekking and climbing",
                        "Build rapport with local communities and coordinate logistics with porters and transport services"
                    ],
                    requirements: [
                        "Certified trekking/climbing guide with experience leading groups in diverse terrains.",
                        "Strong knowledge of first aid, survival skills, and risk",
                        "Passion for sustainable trekking and environmental",
                        "Excellent communication and leadership",
                        "Ability to work in challenging weather conditions and high"
                    ]
                },
                {
                    id: 2,
                    title: "Adventure Trainers & Survival Experts",
                    location: "Training centers & outdoor expeditions",
                    jobType: "Freelancing",
                    description: [
                        "Conduct adventure training workshops, covering survival skills, navigation, wilderness first aid, and self-reliance techniques.",
                        "Develop customized training programs for various skill levels, from beginners to advanced",
                        "Teach essential outdoor skills such as fire-making, shelter-building, and water purification with an emphasis on eco-friendly methods."
                    ],
                    requirements: [
                        "Experience in adventure tourism logistics, planning, and",
                        "Strong organizational skills and ability to manage multiple",
                        "Knowledge of permits, safety protocols, and eco-friendly equipment",
                        "Proficiency in travel planning software and office management",
                        "Ability to work under pressure and adapt to changing situations in the"
                    ]
                }
            ];
            setJobListings(jobs);
        };

        fetchJobs();
    }, []);

    const benefits = [
        { title: "Sustainability First", description: "Join a team dedicated to eco-friendly adventure tourism, minimizing environmental impact, and promoting responsible lifestyle." },
        { title: "Adventure with Purpose", description: "Be a part of an organization that integrates adventure tourism with nature conservation and environmental education." },
        { title: "Safety & Expertise", description: "Work with a highly experienced team that prioritizes safety and excellence in every expedition." },
        { title: "Continuous Learning & Growth", description: "Gain hands-on training in survival skills, navigation, and personal development. Opportunities for career growth and certifications are available." },
        { title: "Make a Difference", description: "Engage in community initiatives, school educational programs, and eco-friendly campaigns focused on protecting natural habitats." },
        { title: "Humility & Supportiveness", description: "Be part of a team that values mutual respect, teamwork, and a humble approach to adventure. We believe in lifting each other up and creating a supportive environment for everyone to thrive." },
        { title: "Open for Innovation & Ideas", description: "We value creativity and encourage team members to bring new ideas to the table, helping us improve and grow together." },
        { title: "Competitive Compensation & Perks", description: "We offer industry-standard salaries, performance bonuses, and exclusive access to adventure gear and training programs." }
    ];

    return (
        <div className="relative">
            <div
                className="relative w-full h-[40vh] sm:h-[50vh] md:h-[63vh] bg-cover bg-center flex items-end justify-center pb-6 sm:pb-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/common-banner.webp')`,
                }}
            >
                <h1 className="text-4xl sm:text-5xl md:text-[69px] font-bold text-orange-700 uppercase tracking-wider text-center px-4">
                    Career in Hike
                </h1>
            </div>
            <div className="container mx-auto px-11 py-16">

                <div className="mb-12 text-center mt-12">
                    <h2 className="text-3xl font-bold mb-4">Join the Hike Adventure Team!</h2>
                    <p className="text-lg text-start">
                        Are you passionate about the great outdoors? Do you thrive in challenging environments and love sharing your knowledge with others? Hike Adventure is an open platform for dedicated, skilled, and enthusiastic individuals to join our growing team! We specialize in guided trekking, hiking, and climbing expeditions, corporate tours, along with training in physical and mental fitness, survival, navigation, and essential outdoor skills. As part of our commitment to sustainable adventure tourism, we also engage in community initiatives and environmental conservation.                </p>
                </div>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-orange-700 mb-6">Why Work with Us?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="border-l-4 border-orange-400 pl-4">
                                <h3 className="font-bold mb-2">{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-orange-700 mb-6">Current Job Openings</h2>
                    <div className="space-y-8">
                        {jobListings.map((job) => (
                            <div key={job.id} className="border rounded-lg p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                                <div className="mb-4">
                                    <p><strong>Location:</strong> {job.location}</p>
                                    <p><strong>Job Type:</strong> {job.jobType}</p>
                                </div>
                                <div className="mb-4">
                                    <h4 className="font-bold mb-2">Job Description:</h4>
                                    <ul className="list-disc pl-5">
                                        {job.description.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-2">Requirements:</h4>
                                    <ul className="list-disc pl-5">
                                        {job.requirements.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-orange-700 mb-6">Hiring Process</h2>
                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <span className="font-bold mr-2">1. Application Submission –</span>
                                <p>We will review your application and respond within one week if shortlisted.</p>
                            </div>
                            <div className="flex items-start">
                                <span className="font-bold mr-2">2. Online Interview –</span>
                                <p>Shortlisted candidates will be invited for an online interview.</p>
                            </div>
                            <div className="flex items-start">
                                <span className="font-bold mr-2">3. Final Selection & Offer –</span>
                                <p>Successful candidates will receive a job offer based on company policies.</p>
                            </div>
                            <div className="flex items-start">
                                <span className="font-bold mr-2">4. Probation & Training Period –</span>
                                <p>For permanent job profiles, a 3-month probation and training period will apply. Experienced candidates will be given priority.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-orange-700 mb-6">How to Apply</h2>
                    <p className="mb-4">
                        If you're ready to embark on an exciting journey with Hike Adventure, send your resume and cover letter to{' '}
                        <a href="mailto:info@hike.com" className="text-blue-600">info@hike.com</a>.
                    </p>
                    <p className="mb-4">Use the subject line: <strong>Work with Hike – [Applying Post]</strong>. Be sure to upload your updated CV and detailed information about yourself.</p>
                </section>

                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold mb-4">Follow us on social media and stay updated on new opportunities!</h2>
                    <p className="text-lg">We look forward to welcoming passionate adventurers to our team!</p>
                </div>
            </div>
        </div>
    );
};

export default CareerPage;