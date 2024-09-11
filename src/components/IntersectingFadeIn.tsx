import React, { useRef, useState, useEffect, JSXElementConstructor } from 'react';
import FadeIn from 'react-fade-in';

interface Props {
    delay?: number;
    transitionDuration?: number;
    wrapperTag?: JSXElementConstructor<any>;
    childTag?: JSXElementConstructor<any>;
    className?: string;
    childClassName?: string;
    visible?: boolean;
    onComplete?: () => any;
    children: React.ReactNode;
}

const IntersectingFadeIn: React.FC<Props> = ({
    delay = 0,
    transitionDuration = 800,
    wrapperTag: WrapperTag = 'div',
    childTag: ChildTag = 'div',
    className = '',
    childClassName = '',
    visible,
    onComplete,
    children,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(visible || false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing this element once it's visible
                    if (onComplete) onComplete(); // Trigger onComplete if provided
                }
            },
            {
                rootMargin: '-150px 0px', // Trigger 100px before the element enters the viewport
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [onComplete]);

    return (
        <WrapperTag ref={ref} className={className}>
            <FadeIn delay={delay} transitionDuration={transitionDuration} visible={isVisible}>
                <ChildTag className={childClassName}>{children}</ChildTag>
            </FadeIn>
        </WrapperTag>
    );
};

export default IntersectingFadeIn;
