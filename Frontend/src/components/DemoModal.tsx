import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import DemoForm from "./DemoForm";
import { Button } from "./ui/button";

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle?: string;
}

export const DemoModal = ({ isOpen, onClose, courseTitle }: DemoModalProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl [&>button]:text-white [&>button]:opacity-100 [&>button]:right-6 [&>button]:top-6 [&>button_svg]:h-6 [&>button_svg]:w-6">
                {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center p-10 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                        <p className="text-gray-600 mb-8">
                            Your demo request has been received. Our team will contact you shortly to schedule your session.
                        </p>
                        <Button
                            onClick={onClose}
                            className=" bg-[#000080] hover:bg-[#000080]/90 text-white font-bold h-12 text-lg shadow-md transition-all rounded-md"
                        >
                            OK
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="bg-[#000080] p-2 text-white text-center">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-center text-white">Book a Free Demo Class</DialogTitle>
                                <DialogDescription className="text-blue-100 text-center">
                                    Experienced trainers will help you understand the course curriculum and career path.
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                        <div className="p-4">
                            <DemoForm
                                defaultCourse={courseTitle}
                                onSuccess={() => setIsSubmitted(true)}
                            />
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};
