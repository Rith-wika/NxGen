import { useState } from "react";
import DemoForm from "./DemoForm";
import { Button } from "./ui/button";

interface DemoSidebarCardProps {
    courseTitle?: string;
}

const DemoSidebarCard = ({ courseTitle }: DemoSidebarCardProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300">
            {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
                    <p className="text-gray-600 text-sm mb-6">
                        Your demo request has been received. Our team will contact you shortly.
                    </p>
                    <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-[#000080] hover:bg-[#000080]/90 text-white font-bold px-8 h-10 rounded-md transition-all font-sans"
                    >
                        OK
                    </Button>
                </div>
            ) : (
                <>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-sans">Book a Free Demo</h3>
                    <p className="text-sm text-gray-500 mb-6 font-sans">Experience our expert-led training firsthand.</p>
                    <DemoForm
                        defaultCourse={courseTitle}
                        onSuccess={() => setIsSubmitted(true)}
                    />
                </>
            )}
        </div>
    );
};

export default DemoSidebarCard;
