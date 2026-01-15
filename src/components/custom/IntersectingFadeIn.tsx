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
        const node = ref.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                // Adjust the logic based on height or other conditions
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                    if (onComplete) onComplete();
                }
            },
        );

        if (node) {
            observer.observe(node);
        }

        return () => {
            if (node) observer.unobserve(node);
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
